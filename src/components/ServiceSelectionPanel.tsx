import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { useServiceSelection } from '@/contexts/ServiceSelectionContext';
import { cn } from '@/lib/utils';

interface ServiceOption {
  label: string;
  isOther?: boolean;
}

interface ServiceData {
  name: string;
  blurb: string;
  bullets: string[];
  icon: React.ElementType;
}

interface ServiceSelectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData | null;
}

const ServiceSelectionPanel: React.FC<ServiceSelectionPanelProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const navigate = useNavigate();
  const { setSelection } = useServiceSelection();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!service) return null;

  const options: ServiceOption[] = [
    ...service.bullets.map((bullet) => ({ label: bullet })),
    { label: 'Other — I need something different', isOther: true },
  ];

  const handleOptionSelect = (option: ServiceOption) => {
    setSelectedOption(option.label);
  };

  const handleContinue = async () => {
    if (!selectedOption || !service) return;

    const isOther = options.find((o) => o.label === selectedOption)?.isOther ?? false;

    setSelection({
      serviceName: service.name,
      selectedOption: isOther ? 'Other' : selectedOption,
      isOther,
    });

    setIsTransitioning(true);

    // Animate out then navigate
    await new Promise((resolve) => setTimeout(resolve, 400));
    onClose();
    
    await new Promise((resolve) => setTimeout(resolve, 200));
    navigate('/contact');
  };

  const handleClose = () => {
    setSelectedOption(null);
    setIsTransitioning(false);
    onClose();
  };

  const isOtherSelected = options.find((o) => o.label === selectedOption)?.isOther ?? false;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel - Side on desktop, Bottom sheet on mobile */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ 
              x: isTransitioning ? '5%' : 0, 
              opacity: isTransitioning ? 0.5 : 1 
            }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className={cn(
              "fixed z-50 bg-background border-l border-border shadow-2xl",
              "right-0 top-0 h-full w-full sm:w-[480px] lg:w-[520px]",
              "flex flex-col",
              // Mobile: bottom sheet
              "max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-[85vh] max-sm:w-full max-sm:rounded-t-2xl max-sm:border-t max-sm:border-l-0"
            )}
            style={{
              // Mobile bottom sheet animation override
            }}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg hover:bg-accent transition-colors duration-200 z-10"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 pt-6 sm:pt-12 pb-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent">
                    <service.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                <h2 className="text-h3 mb-3 font-display">{service.name}</h2>
                <p className="text-body-m text-muted-foreground">{service.blurb}</p>
              </motion.div>

              {/* Selection prompt */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="text-caption text-muted-foreground mb-4 uppercase tracking-wide"
              >
                Select your focus area
              </motion.p>

              {/* Options */}
              <div className="space-y-2">
                {options.map((option, index) => (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.05, 
                      duration: 0.4, 
                      ease: [0.2, 0.8, 0.2, 1] 
                    }}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-300",
                      "flex items-center justify-between gap-3",
                      selectedOption === option.label
                        ? "border-foreground bg-accent shadow-sm"
                        : "border-border hover:border-foreground/30 hover:bg-accent/50",
                      selectedOption && selectedOption !== option.label && "opacity-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {option.isOther && (
                        <Sparkles className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-body-m",
                        option.isOther && "italic"
                      )}>
                        {option.label}
                      </span>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                      selectedOption === option.label
                        ? "border-foreground bg-foreground"
                        : "border-muted-foreground/40"
                    )}>
                      {selectedOption === option.label && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-background"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer with Continue button */}
            <AnimatePresence>
              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="px-6 sm:px-8 py-6 border-t border-border bg-background"
                >
                  <button
                    onClick={handleContinue}
                    disabled={isTransitioning}
                    className={cn(
                      "w-full h-14 rounded-xl font-medium text-base",
                      "bg-foreground text-background",
                      "hover:opacity-90 transition-all duration-200",
                      "flex items-center justify-center gap-2",
                      "disabled:opacity-70"
                    )}
                  >
                    {isTransitioning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      />
                    ) : (
                      <>
                        {isOtherSelected ? 'Tell us more' : 'Continue'}
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceSelectionPanel;

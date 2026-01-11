import { useEffect, useRef, useState } from "react";

interface ServiceOption {
  id: string;
  label: string;
}

interface ServiceOptionsPanelProps {
  serviceName: string;
  options: ServiceOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ServiceOptionsPanel = ({
  serviceName,
  options,
  selectedOptions,
  onToggleOption,
  onClose,
  isOpen,
}: ServiceOptionsPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      // Delay adding listener to prevent immediate close
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allOptions: ServiceOption[] = [
    ...options,
    { id: "other", label: "Other (custom requirement)" },
  ];

  return (
    <div
      ref={panelRef}
      className={`services-panel mt-4 ${isAnimating ? "is-visible" : ""}`}
    >
      <div className="text-caption text-muted-foreground mb-3">
        Select options for {serviceName}:
      </div>
      <div className="grid gap-2">
        {allOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggleOption(option.id)}
              className={`service-option text-left px-4 py-3 rounded-lg border border-[hsl(var(--line-hair))] transition-colors duration-300 ${
                isSelected ? "selected" : ""
              }`}
            >
              <span className="text-body-m">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceOptionsPanel;

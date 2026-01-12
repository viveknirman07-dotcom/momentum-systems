import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedService {
  serviceName: string;
  optionName: string;
}

interface SelectedServiceContextType {
  selectedServices: SelectedService[];
  addSelection: (service: SelectedService) => void;
  removeSelection: (serviceName: string, optionName: string) => void;
  toggleSelection: (service: SelectedService) => void;
  clearSelectedServices: () => void;
  hasSelection: (serviceName: string, optionName: string) => boolean;
}

const SelectedServiceContext = createContext<SelectedServiceContextType | undefined>(undefined);

export const SelectedServiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const addSelection = (service: SelectedService) => {
    setSelectedServices((prev) => {
      const exists = prev.some(
        (s) => s.serviceName === service.serviceName && s.optionName === service.optionName
      );
      if (exists) return prev;
      return [...prev, service];
    });
  };

  const removeSelection = (serviceName: string, optionName: string) => {
    setSelectedServices((prev) =>
      prev.filter((s) => !(s.serviceName === serviceName && s.optionName === optionName))
    );
  };

  const toggleSelection = (service: SelectedService) => {
    const exists = selectedServices.some(
      (s) => s.serviceName === service.serviceName && s.optionName === service.optionName
    );
    if (exists) {
      removeSelection(service.serviceName, service.optionName);
    } else {
      addSelection(service);
    }
  };

  const hasSelection = (serviceName: string, optionName: string) => {
    return selectedServices.some(
      (s) => s.serviceName === serviceName && s.optionName === optionName
    );
  };

  const clearSelectedServices = () => setSelectedServices([]);

  return (
    <SelectedServiceContext.Provider
      value={{
        selectedServices,
        addSelection,
        removeSelection,
        toggleSelection,
        clearSelectedServices,
        hasSelection,
      }}
    >
      {children}
    </SelectedServiceContext.Provider>
  );
};

export const useSelectedService = () => {
  const context = useContext(SelectedServiceContext);
  if (context === undefined) {
    throw new Error("useSelectedService must be used within a SelectedServiceProvider");
  }
  return context;
};

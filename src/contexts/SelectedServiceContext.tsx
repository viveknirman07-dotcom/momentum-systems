import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedService {
  serviceName: string;
  optionName: string;
}

interface SelectedServiceContextType {
  selectedService: SelectedService | null;
  setSelectedService: (service: SelectedService | null) => void;
  clearSelectedService: () => void;
}

const SelectedServiceContext = createContext<SelectedServiceContextType | undefined>(undefined);

export const SelectedServiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null);

  const clearSelectedService = () => setSelectedService(null);

  return (
    <SelectedServiceContext.Provider value={{ selectedService, setSelectedService, clearSelectedService }}>
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

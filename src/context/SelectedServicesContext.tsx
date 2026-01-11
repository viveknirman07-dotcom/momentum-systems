import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedService {
  serviceName: string;
  options: string[];
}

interface SelectedServicesContextType {
  selectedServices: SelectedService[];
  setSelectedServices: (services: SelectedService[]) => void;
  clearSelectedServices: () => void;
}

const SelectedServicesContext = createContext<SelectedServicesContextType | undefined>(undefined);

export const SelectedServicesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const clearSelectedServices = () => {
    setSelectedServices([]);
  };

  return (
    <SelectedServicesContext.Provider value={{ selectedServices, setSelectedServices, clearSelectedServices }}>
      {children}
    </SelectedServicesContext.Provider>
  );
};

export const useSelectedServices = () => {
  const context = useContext(SelectedServicesContext);
  if (context === undefined) {
    throw new Error("useSelectedServices must be used within a SelectedServicesProvider");
  }
  return context;
};

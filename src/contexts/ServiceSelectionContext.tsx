import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ServiceSelection {
  serviceName: string;
  selectedOption: string;
  isOther: boolean;
}

interface ServiceSelectionContextType {
  selection: ServiceSelection | null;
  setSelection: (selection: ServiceSelection | null) => void;
  clearSelection: () => void;
}

const ServiceSelectionContext = createContext<ServiceSelectionContextType | undefined>(undefined);

export const ServiceSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selection, setSelectionState] = useState<ServiceSelection | null>(null);

  const setSelection = useCallback((selection: ServiceSelection | null) => {
    setSelectionState(selection);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectionState(null);
  }, []);

  return (
    <ServiceSelectionContext.Provider value={{ selection, setSelection, clearSelection }}>
      {children}
    </ServiceSelectionContext.Provider>
  );
};

export const useServiceSelection = () => {
  const context = useContext(ServiceSelectionContext);
  if (context === undefined) {
    throw new Error('useServiceSelection must be used within a ServiceSelectionProvider');
  }
  return context;
};

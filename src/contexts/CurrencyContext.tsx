import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'CAD' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate (USD to CAD) - in a real app, this would come from an API
const USD_TO_CAD_RATE = 1.35;

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('CAD');

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency') as Currency;
    if (savedCurrency && (savedCurrency === 'CAD' || savedCurrency === 'USD')) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  // Save currency preference to localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  // Convert USD base prices to selected currency
  const convertPrice = (usdPrice: number): number => {
    if (currency === 'USD') {
      return usdPrice;
    }
    return Math.round(usdPrice * USD_TO_CAD_RATE * 100) / 100; // Round to 2 decimal places
  };

  // Format price with currency symbol
  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    const symbol = currency === 'USD' ? '$' : 'C$';
    
    // Format with proper decimals
    if (convertedPrice % 1 === 0) {
      return `${symbol}${convertedPrice}`;
    }
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatPrice,
    convertPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

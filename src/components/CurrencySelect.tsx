import React from 'react';
import { Globe } from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
] as const;

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (currency: Currency) => void;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      {currencies.map((currency) => (
        <button
          key={currency.code}
          onClick={() => onChange(currency)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            value === currency.code
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="font-medium">{currency.symbol}</span>
          <span>{currency.code}</span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">- {currency.name}</span>
        </button>
      ))}
    </div>
  );
};
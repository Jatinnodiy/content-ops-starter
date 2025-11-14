import React from 'react';

interface CalculatorInputProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: 'text' | 'number';
    placeholder?: string;
    helpText?: string;
    prefix?: string;
    required?: boolean;
}

export default function CalculatorInput({
    label,
    value,
    onChange,
    type = 'number',
    placeholder,
    helpText,
    prefix,
    required = false
}: CalculatorInputProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {prefix}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        prefix ? 'pl-8' : ''
                    }`}
                    step={type === 'number' ? '0.01' : undefined}
                />
            </div>
            {helpText && (
                <p className="mt-1 text-xs text-gray-500">{helpText}</p>
            )}
        </div>
    );
}

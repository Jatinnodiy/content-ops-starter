import React from 'react';

interface ResultItem {
    label: string;
    value: string | number;
    highlight?: boolean;
    success?: boolean;
    warning?: boolean;
    error?: boolean;
}

interface CalculatorResultProps {
    title: string;
    results: ResultItem[];
    notes?: string[];
}

export default function CalculatorResult({ title, results, notes }: CalculatorResultProps) {
    return (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            
            <div className="space-y-3">
                {results.map((result, index) => {
                    let bgColor = 'bg-white';
                    let textColor = 'text-gray-800';
                    let borderColor = 'border-gray-200';

                    if (result.success) {
                        bgColor = 'bg-green-50';
                        textColor = 'text-green-800';
                        borderColor = 'border-green-300';
                    } else if (result.warning) {
                        bgColor = 'bg-yellow-50';
                        textColor = 'text-yellow-800';
                        borderColor = 'border-yellow-300';
                    } else if (result.error) {
                        bgColor = 'bg-red-50';
                        textColor = 'text-red-800';
                        borderColor = 'border-red-300';
                    } else if (result.highlight) {
                        bgColor = 'bg-blue-100';
                        textColor = 'text-blue-900';
                        borderColor = 'border-blue-400';
                    }

                    return (
                        <div
                            key={index}
                            className={`${bgColor} ${borderColor} border rounded-lg p-4 flex justify-between items-center`}
                        >
                            <span className="text-sm font-medium text-gray-700">
                                {result.label}
                            </span>
                            <span className={`text-base font-bold ${textColor}`}>
                                {result.value}
                            </span>
                        </div>
                    );
                })}
            </div>

            {notes && notes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Important Notes:</p>
                    <ul className="list-disc list-inside space-y-1">
                        {notes.map((note, index) => (
                            <li key={index} className="text-xs text-gray-600">
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

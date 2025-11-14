import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { calculateManagerialRemuneration, formatCurrency } from '../../utils/companiesActCalculations';

export default function ManagerialRemunerationCalculator() {
    const [netProfit, setNetProfit] = useState('');
    const [hasAdequateProfit, setHasAdequateProfit] = useState(true);
    const [numberOfDirectors, setNumberOfDirectors] = useState('1');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!netProfit) return;
        setShowResult(true);
    };

    const result = showResult && netProfit
        ? calculateManagerialRemuneration({
              netProfit: parseFloat(netProfit),
              hasAdequateProfit,
              numberOfDirectors: parseInt(numberOfDirectors) || 1
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Managerial Remuneration Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Calculate maximum remuneration limits as per Section 197 of Companies Act 2013
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                    label="Net Profit (₹)"
                    value={netProfit}
                    onChange={setNetProfit}
                    placeholder="Enter net profit"
                    helpText="Net profit as per Section 198"
                    prefix="₹"
                    required
                />

                <CalculatorInput
                    label="Number of Directors"
                    value={numberOfDirectors}
                    onChange={setNumberOfDirectors}
                    placeholder="Enter number"
                    helpText="Total number of directors to be remunerated"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={hasAdequateProfit}
                        onChange={(e) => setHasAdequateProfit(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                        Company has adequate profits
                    </span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                    {hasAdequateProfit
                        ? 'Percentage limits apply (5% for one director, 11% for all)'
                        : 'Schedule V limits apply (without adequate profits)'}
                </p>
            </div>

            <button
                onClick={handleCalculate}
                disabled={!netProfit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Calculate Limits
            </button>

            {result && (
                <CalculatorResult
                    title="Remuneration Limits"
                    results={[
                        {
                            label: 'Maximum for One MD/WTD/Manager',
                            value: formatCurrency(result.maxRemunerationOneDirector),
                            highlight: true
                        },
                        {
                            label: 'Maximum for All Directors Combined',
                            value: formatCurrency(result.maxRemunerationAllDirectors),
                            highlight: true
                        },
                        {
                            label: 'Net Profit Considered',
                            value: formatCurrency(result.effectiveNetProfit)
                        },
                        {
                            label: 'Profit Status',
                            value: result.isAdequateProfit ? 'Adequate Profits' : 'No/Inadequate Profits',
                            success: result.isAdequateProfit,
                            warning: !result.isAdequateProfit
                        }
                    ]}
                    notes={[
                        'MD = Managing Director, WTD = Whole-time Director',
                        'Remuneration includes salary, perquisites, and other allowances',
                        'If limits are exceeded, special resolution and Central Government approval required',
                        hasAdequateProfit
                            ? 'With adequate profits: 5% for one director, 11% for all directors'
                            : 'Without adequate profits: Schedule V limits apply (max ₹60 lakhs or 5% of effective capital)'
                    ]}
                />
            )}
        </div>
    );
}

import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { calculateBorrowingLimits, formatCurrency } from '../../utils/companiesActCalculations';

export default function BorrowingLimitsCalculator() {
    const [paidUpShareCapital, setPaidUpShareCapital] = useState('');
    const [freeReserves, setFreeReserves] = useState('');
    const [securitiesPremium, setSecuritiesPremium] = useState('');
    const [currentBorrowings, setCurrentBorrowings] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!paidUpShareCapital || !currentBorrowings) return;
        setShowResult(true);
    };

    const result = showResult && paidUpShareCapital && currentBorrowings
        ? calculateBorrowingLimits({
              paidUpShareCapital: parseFloat(paidUpShareCapital),
              freeReserves: parseFloat(freeReserves) || 0,
              securitiesPremium: parseFloat(securitiesPremium) || 0,
              currentBorrowings: parseFloat(currentBorrowings)
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Borrowing Limits Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Calculate borrowing capacity as per Section 180(1)(c) of Companies Act 2013
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                    label="Paid-up Share Capital (₹)"
                    value={paidUpShareCapital}
                    onChange={setPaidUpShareCapital}
                    placeholder="Enter paid-up capital"
                    prefix="₹"
                    required
                />

                <CalculatorInput
                    label="Free Reserves (₹)"
                    value={freeReserves}
                    onChange={setFreeReserves}
                    placeholder="Enter free reserves"
                    prefix="₹"
                />

                <CalculatorInput
                    label="Securities Premium (₹)"
                    value={securitiesPremium}
                    onChange={setSecuritiesPremium}
                    placeholder="Enter securities premium"
                    prefix="₹"
                />

                <CalculatorInput
                    label="Current Borrowings (₹)"
                    value={currentBorrowings}
                    onChange={setCurrentBorrowings}
                    placeholder="Enter current borrowings"
                    prefix="₹"
                    required
                />
            </div>

            <button
                onClick={handleCalculate}
                disabled={!paidUpShareCapital || !currentBorrowings}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Calculate Borrowing Capacity
            </button>

            {result && (
                <CalculatorResult
                    title="Borrowing Capacity Analysis"
                    results={[
                        {
                            label: 'Maximum Borrowing Limit',
                            value: formatCurrency(result.maxBorrowingLimit),
                            highlight: true
                        },
                        {
                            label: 'Current Borrowings',
                            value: formatCurrency(parseFloat(currentBorrowings))
                        },
                        {
                            label: 'Available Borrowing Capacity',
                            value: formatCurrency(result.availableBorrowingCapacity),
                            success: result.isWithinLimit
                        },
                        {
                            label: 'Status',
                            value: result.isWithinLimit ? 'Within Limit' : 'Exceeds Limit',
                            success: result.isWithinLimit,
                            error: !result.isWithinLimit
                        },
                        ...(result.excessAmount > 0
                            ? [
                                  {
                                      label: 'Excess Borrowing',
                                      value: formatCurrency(result.excessAmount),
                                      error: true
                                  }
                              ]
                            : [])
                    ]}
                    notes={[
                        'Section 180(1)(c) requires special resolution for borrowing beyond limits',
                        'Limit: Aggregate of paid-up share capital + free reserves + securities premium',
                        'Excludes temporary loans from banks in ordinary course of business',
                        'Special resolution required if borrowing exceeds the limit',
                        'Board resolution required for all borrowings'
                    ]}
                />
            )}
        </div>
    );
}

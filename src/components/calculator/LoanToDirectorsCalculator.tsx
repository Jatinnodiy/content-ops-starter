import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { calculateLoanToDirectors, formatCurrency } from '../../utils/companiesActCalculations';

export default function LoanToDirectorsCalculator() {
    const [paidUpShareCapital, setPaidUpShareCapital] = useState('');
    const [freeReserves, setFreeReserves] = useState('');
    const [securitiesPremium, setSecuritiesPremium] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!paidUpShareCapital || !loanAmount) return;
        setShowResult(true);
    };

    const result = showResult && paidUpShareCapital && loanAmount
        ? calculateLoanToDirectors({
              paidUpShareCapital: parseFloat(paidUpShareCapital),
              freeReserves: parseFloat(freeReserves) || 0,
              securitiesPremium: parseFloat(securitiesPremium) || 0,
              loanAmount: parseFloat(loanAmount)
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Loan to Directors Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Calculate permissible loan limits as per Section 185 of Companies Act 2013
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
                    label="Proposed Loan Amount (₹)"
                    value={loanAmount}
                    onChange={setLoanAmount}
                    placeholder="Enter loan amount"
                    prefix="₹"
                    required
                />
            </div>

            <button
                onClick={handleCalculate}
                disabled={!paidUpShareCapital || !loanAmount}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Calculate Loan Limit
            </button>

            {result && (
                <CalculatorResult
                    title="Loan Limit Analysis"
                    results={[
                        {
                            label: 'Maximum Loan Limit (60%)',
                            value: formatCurrency(result.maxLoanLimit),
                            highlight: true
                        },
                        {
                            label: 'Proposed Loan Amount',
                            value: formatCurrency(parseFloat(loanAmount))
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
                                      label: 'Excess Amount',
                                      value: formatCurrency(result.excessAmount),
                                      error: true
                                  }
                              ]
                            : [])
                    ]}
                    notes={[
                        'Section 185 prohibits loans to directors except in certain cases',
                        'Maximum limit: 60% of paid-up capital + free reserves + securities premium',
                        'Special resolution and compliance with prescribed conditions required',
                        'Loans to directors of holding company also covered',
                        'Exemptions available for banking companies and certain other cases'
                    ]}
                />
            )}
        </div>
    );
}

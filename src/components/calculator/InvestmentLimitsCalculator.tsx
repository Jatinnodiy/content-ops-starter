import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { calculateInvestmentLimits, formatCurrency } from '../../utils/companiesActCalculations';

export default function InvestmentLimitsCalculator() {
    const [paidUpShareCapital, setPaidUpShareCapital] = useState('');
    const [freeReserves, setFreeReserves] = useState('');
    const [securitiesPremium, setSecuritiesPremium] = useState('');
    const [proposedInvestment, setProposedInvestment] = useState('');
    const [proposedLoans, setProposedLoans] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!paidUpShareCapital) return;
        setShowResult(true);
    };

    const result = showResult && paidUpShareCapital
        ? calculateInvestmentLimits({
              paidUpShareCapital: parseFloat(paidUpShareCapital),
              freeReserves: parseFloat(freeReserves) || 0,
              securitiesPremium: parseFloat(securitiesPremium) || 0,
              proposedInvestment: parseFloat(proposedInvestment) || 0,
              proposedLoans: parseFloat(proposedLoans) || 0
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Investment Limits Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Calculate investment and loan limits as per Section 186 of Companies Act 2013
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
                    label="Proposed Investment (₹)"
                    value={proposedInvestment}
                    onChange={setProposedInvestment}
                    placeholder="Enter investment amount"
                    prefix="₹"
                />

                <CalculatorInput
                    label="Proposed Loans/Guarantees (₹)"
                    value={proposedLoans}
                    onChange={setProposedLoans}
                    placeholder="Enter loan amount"
                    prefix="₹"
                />
            </div>

            <button
                onClick={handleCalculate}
                disabled={!paidUpShareCapital}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Calculate Investment Limits
            </button>

            {result && (
                <CalculatorResult
                    title="Investment Limit Analysis"
                    results={[
                        {
                            label: 'Maximum Investment Limit',
                            value: formatCurrency(result.maxInvestmentLimit),
                            highlight: true
                        },
                        {
                            label: 'Total Proposed (Investment + Loans)',
                            value: formatCurrency(result.totalProposed)
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
                        'Section 186 regulates inter-corporate loans and investments',
                        'Limit: Higher of (a) 60% of paid-up capital + free reserves + securities premium, OR (b) 100% of free reserves + securities premium',
                        'Special resolution required if limits are exceeded',
                        'Board resolution required for all investments/loans',
                        'Disclosure in financial statements mandatory'
                    ]}
                />
            )}
        </div>
    );
}

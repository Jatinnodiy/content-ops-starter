import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { calculateRelatedPartyTransaction, formatCurrency } from '../../utils/companiesActCalculations';

export default function RelatedPartyTransactionCalculator() {
    const [annualTurnover, setAnnualTurnover] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!annualTurnover || !transactionAmount) return;
        setShowResult(true);
    };

    const result = showResult && annualTurnover && transactionAmount
        ? calculateRelatedPartyTransaction({
              annualTurnover: parseFloat(annualTurnover),
              transactionAmount: parseFloat(transactionAmount)
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Related Party Transaction Calculator
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Determine approval requirements as per Section 188 of Companies Act 2013
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalculatorInput
                    label="Annual Turnover (₹)"
                    value={annualTurnover}
                    onChange={setAnnualTurnover}
                    placeholder="Enter annual turnover"
                    helpText="Company's annual turnover"
                    prefix="₹"
                    required
                />

                <CalculatorInput
                    label="Transaction Amount (₹)"
                    value={transactionAmount}
                    onChange={setTransactionAmount}
                    placeholder="Enter transaction amount"
                    helpText="Proposed RPT amount"
                    prefix="₹"
                    required
                />
            </div>

            <button
                onClick={handleCalculate}
                disabled={!annualTurnover || !transactionAmount}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Check Approval Requirements
            </button>

            {result && (
                <CalculatorResult
                    title="Approval Requirements"
                    results={[
                        {
                            label: '10% Threshold',
                            value: formatCurrency(result.threshold10Percent),
                            highlight: true
                        },
                        {
                            label: 'Transaction Amount',
                            value: formatCurrency(parseFloat(transactionAmount))
                        },
                        {
                            label: 'Approval Required',
                            value: result.approvalRequired,
                            success: !result.requiresSpecialResolution,
                            warning: result.requiresSpecialResolution
                        },
                        {
                            label: 'Special Resolution Required',
                            value: result.requiresSpecialResolution ? 'Yes' : 'No',
                            error: result.requiresSpecialResolution,
                            success: !result.requiresSpecialResolution
                        }
                    ]}
                    notes={[
                        'RPT = Related Party Transaction',
                        'All RPTs require prior approval of Audit Committee',
                        'Transactions exceeding 10% of annual turnover require Special Resolution',
                        'Interested directors cannot vote on the resolution',
                        'Disclosure in Board Report and Financial Statements is mandatory'
                    ]}
                />
            )}
        </div>
    );
}

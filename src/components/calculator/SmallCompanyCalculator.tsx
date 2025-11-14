import React, { useState } from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorResult from './CalculatorResult';
import { checkSmallCompany, formatCurrency } from '../../utils/companiesActCalculations';

export default function SmallCompanyCalculator() {
    const [paidUpShareCapital, setPaidUpShareCapital] = useState('');
    const [turnover, setTurnover] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (!paidUpShareCapital || !turnover) return;
        setShowResult(true);
    };

    const result = showResult && paidUpShareCapital && turnover
        ? checkSmallCompany({
              paidUpShareCapital: parseFloat(paidUpShareCapital),
              turnover: parseFloat(turnover)
          })
        : null;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Small Company Criteria Checker
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Check if company qualifies as Small Company as per Section 2(85) of Companies Act 2013
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
                    label="Annual Turnover (₹)"
                    value={turnover}
                    onChange={setTurnover}
                    placeholder="Enter annual turnover"
                    prefix="₹"
                    required
                />
            </div>

            <button
                onClick={handleCalculate}
                disabled={!paidUpShareCapital || !turnover}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Check Small Company Status
            </button>

            {result && (
                <CalculatorResult
                    title="Small Company Status"
                    results={[
                        {
                            label: 'Small Company Status',
                            value: result.isSmallCompany ? 'Qualifies as Small Company' : 'Does NOT Qualify',
                            success: result.isSmallCompany,
                            error: !result.isSmallCompany,
                            highlight: true
                        },
                        {
                            label: 'Paid-up Capital Limit',
                            value: formatCurrency(result.paidUpCapitalLimit)
                        },
                        {
                            label: 'Your Paid-up Capital',
                            value: formatCurrency(parseFloat(paidUpShareCapital))
                        },
                        {
                            label: 'Capital Criteria',
                            value: result.meetsCapitalCriteria ? 'Met ✓' : 'Not Met ✗',
                            success: result.meetsCapitalCriteria,
                            error: !result.meetsCapitalCriteria
                        },
                        {
                            label: 'Turnover Limit',
                            value: formatCurrency(result.turnoverLimit)
                        },
                        {
                            label: 'Your Turnover',
                            value: formatCurrency(parseFloat(turnover))
                        },
                        {
                            label: 'Turnover Criteria',
                            value: result.meetsTurnoverCriteria ? 'Met ✓' : 'Not Met ✗',
                            success: result.meetsTurnoverCriteria,
                            error: !result.meetsTurnoverCriteria
                        }
                    ]}
                    notes={[
                        'Both criteria must be met to qualify as Small Company',
                        'Paid-up capital should not exceed ₹5 Crores',
                        'Turnover should not exceed ₹20 Crores',
                        'Benefits: Simplified compliance, reduced audit requirements',
                        'Exemptions: Holding/subsidiary companies, Section 8 companies, and companies with paid-up capital > ₹50 lakhs and turnover > ₹2 Crores cannot be small companies',
                        'Turnover as per profit & loss account of immediately preceding financial year'
                    ]}
                />
            )}
        </div>
    );
}

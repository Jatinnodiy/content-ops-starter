import React, { useState } from 'react';
import Head from 'next/head';
import ManagerialRemunerationCalculator from '../components/calculator/ManagerialRemunerationCalculator';
import RelatedPartyTransactionCalculator from '../components/calculator/RelatedPartyTransactionCalculator';
import LoanToDirectorsCalculator from '../components/calculator/LoanToDirectorsCalculator';
import InvestmentLimitsCalculator from '../components/calculator/InvestmentLimitsCalculator';
import BorrowingLimitsCalculator from '../components/calculator/BorrowingLimitsCalculator';
import SmallCompanyCalculator from '../components/calculator/SmallCompanyCalculator';

type CalculatorType = 
    | 'managerial-remuneration'
    | 'related-party-transaction'
    | 'loan-to-directors'
    | 'investment-limits'
    | 'borrowing-limits'
    | 'small-company';

interface CalculatorTab {
    id: CalculatorType;
    label: string;
    description: string;
}

const calculatorTabs: CalculatorTab[] = [
    {
        id: 'managerial-remuneration',
        label: 'Managerial Remuneration',
        description: 'Section 197'
    },
    {
        id: 'related-party-transaction',
        label: 'Related Party Transactions',
        description: 'Section 188'
    },
    {
        id: 'loan-to-directors',
        label: 'Loans to Directors',
        description: 'Section 185'
    },
    {
        id: 'investment-limits',
        label: 'Investment Limits',
        description: 'Section 186'
    },
    {
        id: 'borrowing-limits',
        label: 'Borrowing Limits',
        description: 'Section 180(1)(c)'
    },
    {
        id: 'small-company',
        label: 'Small Company',
        description: 'Section 2(85)'
    }
];

export default function CompaniesActCalculator() {
    const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('managerial-remuneration');

    const renderCalculator = () => {
        switch (activeCalculator) {
            case 'managerial-remuneration':
                return <ManagerialRemunerationCalculator />;
            case 'related-party-transaction':
                return <RelatedPartyTransactionCalculator />;
            case 'loan-to-directors':
                return <LoanToDirectorsCalculator />;
            case 'investment-limits':
                return <InvestmentLimitsCalculator />;
            case 'borrowing-limits':
                return <BorrowingLimitsCalculator />;
            case 'small-company':
                return <SmallCompanyCalculator />;
            default:
                return <ManagerialRemunerationCalculator />;
        }
    };

    return (
        <>
            <Head>
                <title>Companies Act 2013 Limits Calculator</title>
                <meta name="description" content="Calculate various limits as per Companies Act 2013" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Companies Act 2013 Limits Calculator
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Calculate multiple limits and compliance requirements as per Companies Act 2013
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Select Calculator
                                </h2>
                                <nav className="space-y-2">
                                    {calculatorTabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveCalculator(tab.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                                activeCalculator === tab.id
                                                    ? 'bg-blue-600 text-white shadow-md'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="font-medium text-sm">
                                                {tab.label}
                                            </div>
                                            <div
                                                className={`text-xs mt-1 ${
                                                    activeCalculator === tab.id
                                                        ? 'text-blue-100'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {tab.description}
                                            </div>
                                        </button>
                                    ))}
                                </nav>

                                {/* Disclaimer */}
                                <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-xs text-yellow-800">
                                        <strong>Disclaimer:</strong> This calculator is for informational purposes only. 
                                        Please consult with a qualified professional for specific legal advice.
                                    </p>
                                </div>
                            </div>
                        </aside>

                        {/* Calculator Content */}
                        <div className="lg:col-span-3">
                            {renderCalculator()}
                        </div>
                    </div>

                    {/* Footer Information */}
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            About Companies Act 2013
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Comprehensive corporate governance framework</li>
                                    <li>Enhanced disclosure and transparency requirements</li>
                                    <li>Stricter compliance and penalty provisions</li>
                                    <li>Protection of minority shareholders</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Important Sections:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Section 185: Loans to Directors</li>
                                    <li>Section 186: Investments and Loans</li>
                                    <li>Section 188: Related Party Transactions</li>
                                    <li>Section 197: Managerial Remuneration</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <p className="text-center text-sm text-gray-500">
                            © 2025 Companies Act 2013 Calculator. For educational and informational purposes only.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

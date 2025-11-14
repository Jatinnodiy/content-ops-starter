/**
 * Utility functions for Companies Act 2013 calculations
 */

export interface ManagerialRemunerationInput {
    netProfit: number;
    hasAdequateProfit: boolean;
    numberOfDirectors: number;
}

export interface ManagerialRemunerationResult {
    maxRemunerationOneDirector: number;
    maxRemunerationAllDirectors: number;
    effectiveNetProfit: number;
    isAdequateProfit: boolean;
}

export interface RelatedPartyTransactionInput {
    annualTurnover: number;
    transactionAmount: number;
}

export interface RelatedPartyTransactionResult {
    requiresOrdinaryResolution: boolean;
    requiresSpecialResolution: boolean;
    threshold10Percent: number;
    approvalRequired: string;
}

export interface LoanToDirectorsInput {
    paidUpShareCapital: number;
    freeReserves: number;
    securitiesPremium: number;
    loanAmount: number;
}

export interface LoanToDirectorsResult {
    maxLoanLimit: number;
    isWithinLimit: boolean;
    excessAmount: number;
}

export interface InvestmentLimitsInput {
    paidUpShareCapital: number;
    freeReserves: number;
    securitiesPremium: number;
    proposedInvestment: number;
    proposedLoans: number;
}

export interface InvestmentLimitsResult {
    maxInvestmentLimit: number;
    totalProposed: number;
    isWithinLimit: boolean;
    excessAmount: number;
}

export interface BorrowingLimitsInput {
    paidUpShareCapital: number;
    freeReserves: number;
    securitiesPremium: number;
    currentBorrowings: number;
}

export interface BorrowingLimitsResult {
    maxBorrowingLimit: number;
    isWithinLimit: boolean;
    excessAmount: number;
    availableBorrowingCapacity: number;
}

export interface SmallCompanyInput {
    paidUpShareCapital: number;
    turnover: number;
}

export interface SmallCompanyResult {
    isSmallCompany: boolean;
    paidUpCapitalLimit: number;
    turnoverLimit: number;
    meetsCapitalCriteria: boolean;
    meetsTurnoverCriteria: boolean;
}

/**
 * Calculate Managerial Remuneration limits as per Section 197
 */
export function calculateManagerialRemuneration(
    input: ManagerialRemunerationInput
): ManagerialRemunerationResult {
    const { netProfit, hasAdequateProfit, numberOfDirectors } = input;

    if (hasAdequateProfit) {
        // With adequate profits
        // One MD/WTD/Manager: 5% of net profit
        // All directors together: 11% of net profit
        return {
            maxRemunerationOneDirector: netProfit * 0.05,
            maxRemunerationAllDirectors: netProfit * 0.11,
            effectiveNetProfit: netProfit,
            isAdequateProfit: true
        };
    } else {
        // Without adequate profits or no profits
        // Schedule V limits apply (simplified calculation)
        // Effective capital calculation for Schedule V
        const effectiveCapital = netProfit; // Simplified
        
        return {
            maxRemunerationOneDirector: Math.min(6000000, effectiveCapital * 0.05), // Rs. 60 lakhs or 5% of effective capital
            maxRemunerationAllDirectors: Math.min(6000000 * numberOfDirectors, effectiveCapital * 0.11),
            effectiveNetProfit: netProfit,
            isAdequateProfit: false
        };
    }
}

/**
 * Calculate Related Party Transaction limits as per Section 188
 */
export function calculateRelatedPartyTransaction(
    input: RelatedPartyTransactionInput
): RelatedPartyTransactionResult {
    const { annualTurnover, transactionAmount } = input;
    
    const threshold10Percent = annualTurnover * 0.10;
    
    let approvalRequired = 'Board Resolution';
    let requiresOrdinaryResolution = false;
    let requiresSpecialResolution = false;

    if (transactionAmount > threshold10Percent) {
        approvalRequired = 'Special Resolution (Exceeds 10% of annual turnover)';
        requiresSpecialResolution = true;
    } else {
        approvalRequired = 'Board Resolution with prior approval of Audit Committee';
    }

    return {
        requiresOrdinaryResolution,
        requiresSpecialResolution,
        threshold10Percent,
        approvalRequired
    };
}

/**
 * Calculate Loan to Directors limits as per Section 185
 */
export function calculateLoanToDirectors(
    input: LoanToDirectorsInput
): LoanToDirectorsResult {
    const { paidUpShareCapital, freeReserves, securitiesPremium, loanAmount } = input;
    
    // Maximum limit: 60% of paid-up share capital + free reserves + securities premium
    const totalCapital = paidUpShareCapital + freeReserves + securitiesPremium;
    const maxLoanLimit = totalCapital * 0.60;
    
    const isWithinLimit = loanAmount <= maxLoanLimit;
    const excessAmount = isWithinLimit ? 0 : loanAmount - maxLoanLimit;

    return {
        maxLoanLimit,
        isWithinLimit,
        excessAmount
    };
}

/**
 * Calculate Investment limits as per Section 186
 */
export function calculateInvestmentLimits(
    input: InvestmentLimitsInput
): InvestmentLimitsResult {
    const { paidUpShareCapital, freeReserves, securitiesPremium, proposedInvestment, proposedLoans } = input;
    
    // Maximum limit: 60% of paid-up share capital + free reserves + securities premium
    // OR 100% of free reserves and securities premium, whichever is more
    const totalCapital = paidUpShareCapital + freeReserves + securitiesPremium;
    const limit1 = totalCapital * 0.60;
    const limit2 = freeReserves + securitiesPremium;
    
    const maxInvestmentLimit = Math.max(limit1, limit2);
    const totalProposed = proposedInvestment + proposedLoans;
    
    const isWithinLimit = totalProposed <= maxInvestmentLimit;
    const excessAmount = isWithinLimit ? 0 : totalProposed - maxInvestmentLimit;

    return {
        maxInvestmentLimit,
        totalProposed,
        isWithinLimit,
        excessAmount
    };
}

/**
 * Calculate Borrowing limits as per Section 180(1)(c)
 */
export function calculateBorrowingLimits(
    input: BorrowingLimitsInput
): BorrowingLimitsResult {
    const { paidUpShareCapital, freeReserves, securitiesPremium, currentBorrowings } = input;
    
    // Maximum limit: Aggregate of paid-up share capital + free reserves + securities premium
    const maxBorrowingLimit = paidUpShareCapital + freeReserves + securitiesPremium;
    
    const isWithinLimit = currentBorrowings <= maxBorrowingLimit;
    const excessAmount = isWithinLimit ? 0 : currentBorrowings - maxBorrowingLimit;
    const availableBorrowingCapacity = isWithinLimit ? maxBorrowingLimit - currentBorrowings : 0;

    return {
        maxBorrowingLimit,
        isWithinLimit,
        excessAmount,
        availableBorrowingCapacity
    };
}

/**
 * Check Small Company criteria as per Section 2(85)
 */
export function checkSmallCompany(
    input: SmallCompanyInput
): SmallCompanyResult {
    const { paidUpShareCapital, turnover } = input;
    
    // Limits as per Companies Act 2013
    const paidUpCapitalLimit = 50000000; // Rs. 5 Crores
    const turnoverLimit = 200000000; // Rs. 20 Crores
    
    const meetsCapitalCriteria = paidUpShareCapital <= paidUpCapitalLimit;
    const meetsTurnoverCriteria = turnover <= turnoverLimit;
    
    // Both criteria must be met
    const isSmallCompany = meetsCapitalCriteria && meetsTurnoverCriteria;

    return {
        isSmallCompany,
        paidUpCapitalLimit,
        turnoverLimit,
        meetsCapitalCriteria,
        meetsTurnoverCriteria
    };
}

/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format number with Indian numbering system
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-IN').format(num);
}

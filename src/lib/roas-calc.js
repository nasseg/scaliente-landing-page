/**
 * Pure calculation functions for the ROAS calculator.
 * Extracted from RoasCalculator.jsx for testability.
 */

export function computeRoas({
    price = 0,
    cost = 0,
    shipping = 0,
    feeRate = 0,
    fixedFee = 0,
    supplierShip = 0,
    vat = 0,
    vatIncluded = false,
    socialRate = 0,
    socialBase = 'revenue',
    returns = 0,
    adBudget = 0,
    fixedCosts = 0,
}) {
    // 1. VAT deduction
    const netRevenue = vatIncluded && vat > 0 ? price / (1 + vat / 100) : price;
    const vatAmount = vatIncluded && vat > 0 ? price - netRevenue : 0;

    // 2. Returns impact
    const effectiveRevenue = returns > 0 ? netRevenue * (1 - returns / 100) : netRevenue;
    const returnsAmount = netRevenue - effectiveRevenue;

    // 3. Variable costs (payment fee on original price since that's what gateway charges)
    const paymentFee = (price * feeRate / 100) + fixedFee;
    const totalVariableCosts = cost + shipping + paymentFee + supplierShip;

    // 4. Gross profit
    const grossProfit = effectiveRevenue - totalVariableCosts;

    // 5. Social charges
    const socialChargesAmount = socialRate > 0
        ? socialBase === 'revenue'
            ? effectiveRevenue * socialRate / 100
            : Math.max(0, grossProfit) * socialRate / 100
        : 0;

    // 6. Profit per order
    const profitPerOrder = grossProfit - socialChargesAmount;
    const marginPercent = price > 0 ? (profitPerOrder / price) * 100 : 0;

    // 7. ROAS Breakeven
    const roasBreakeven = profitPerOrder > 0 ? price / profitPerOrder : 0;

    // 8. Orders needed (including fixed costs)
    const ordersNeeded = profitPerOrder > 0 ? Math.ceil((adBudget + fixedCosts) / profitPerOrder) : 0;

    // Monthly simulation
    const monthlyRevenue = ordersNeeded * price;
    const monthlyProfit = (ordersNeeded * profitPerOrder) - adBudget - fixedCosts;

    return {
        netRevenue,
        vatAmount,
        effectiveRevenue,
        returnsAmount,
        paymentFee,
        totalVariableCosts,
        grossProfit,
        socialChargesAmount,
        profitPerOrder,
        marginPercent,
        roasBreakeven,
        ordersNeeded,
        monthlyRevenue,
        monthlyProfit,
    };
}

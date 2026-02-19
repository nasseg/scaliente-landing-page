import { computeRoas } from '../roas-calc';

describe('computeRoas', () => {
    // ─── Basic calculation ───────────────────────────────────────
    describe('basic profit calculation', () => {
        it('computes profit per order with minimal inputs', () => {
            const r = computeRoas({ price: 29.90, cost: 8.50, shipping: 4.90 });
            // profit = 29.90 - 8.50 - 4.90 - paymentFee(0) = 16.50
            expect(r.profitPerOrder).toBeCloseTo(16.50, 2);
        });

        it('computes profit with all basic fields', () => {
            const r = computeRoas({
                price: 29.90,
                cost: 8.50,
                shipping: 4.90,
                feeRate: 2.9,
                fixedFee: 0.25,
            });
            // paymentFee = (29.90 * 2.9/100) + 0.25 = 0.8671 + 0.25 = 1.1171
            // profit = 29.90 - 8.50 - 4.90 - 1.1171 = 15.3829
            expect(r.paymentFee).toBeCloseTo(1.1171, 3);
            expect(r.profitPerOrder).toBeCloseTo(15.3829, 2);
        });

        it('includes supplier shipping in costs', () => {
            const r = computeRoas({
                price: 29.90,
                cost: 8.50,
                shipping: 4.90,
                supplierShip: 2.00,
            });
            expect(r.totalVariableCosts).toBeCloseTo(8.50 + 4.90 + 2.00, 2);
            expect(r.profitPerOrder).toBeCloseTo(29.90 - 8.50 - 4.90 - 2.00, 2);
        });
    });

    // ─── VAT ─────────────────────────────────────────────────────
    describe('VAT handling', () => {
        it('does not deduct VAT when vatIncluded is false', () => {
            const r = computeRoas({ price: 29.90, cost: 8, vat: 20, vatIncluded: false });
            expect(r.netRevenue).toBeCloseTo(29.90, 2);
            expect(r.vatAmount).toBe(0);
        });

        it('deducts VAT when included in price', () => {
            const r = computeRoas({ price: 30, cost: 5, vat: 20, vatIncluded: true });
            // netRevenue = 30 / 1.20 = 25
            expect(r.netRevenue).toBeCloseTo(25, 2);
            expect(r.vatAmount).toBeCloseTo(5, 2);
        });

        it('handles 0% VAT with vatIncluded true (no deduction)', () => {
            const r = computeRoas({ price: 30, cost: 5, vat: 0, vatIncluded: true });
            expect(r.netRevenue).toBeCloseTo(30, 2);
            expect(r.vatAmount).toBe(0);
        });

        it('handles high VAT rate (27% Hungary)', () => {
            const r = computeRoas({ price: 100, cost: 30, vat: 27, vatIncluded: true });
            // netRevenue = 100 / 1.27 = 78.74
            expect(r.netRevenue).toBeCloseTo(78.74, 1);
            expect(r.vatAmount).toBeCloseTo(21.26, 1);
        });
    });

    // ─── Returns ─────────────────────────────────────────────────
    describe('returns impact', () => {
        it('does not apply returns when rate is 0', () => {
            const r = computeRoas({ price: 100, cost: 30, returns: 0 });
            expect(r.returnsAmount).toBe(0);
            expect(r.effectiveRevenue).toBeCloseTo(100, 2);
        });

        it('reduces effective revenue by return rate', () => {
            const r = computeRoas({ price: 100, cost: 30, returns: 10 });
            // effectiveRevenue = 100 * 0.9 = 90
            expect(r.effectiveRevenue).toBeCloseTo(90, 2);
            expect(r.returnsAmount).toBeCloseTo(10, 2);
        });

        it('applies returns after VAT deduction', () => {
            const r = computeRoas({ price: 120, cost: 30, vat: 20, vatIncluded: true, returns: 10 });
            // netRevenue = 120 / 1.20 = 100
            // effectiveRevenue = 100 * 0.9 = 90
            expect(r.netRevenue).toBeCloseTo(100, 2);
            expect(r.effectiveRevenue).toBeCloseTo(90, 2);
            expect(r.returnsAmount).toBeCloseTo(10, 2);
        });
    });

    // ─── Social charges ──────────────────────────────────────────
    describe('social charges', () => {
        it('computes social charges on revenue (micro-entreprise)', () => {
            const r = computeRoas({
                price: 100,
                cost: 30,
                socialRate: 13.8,
                socialBase: 'revenue',
            });
            // socialCharges = 100 * 13.8% = 13.80
            expect(r.socialChargesAmount).toBeCloseTo(13.80, 2);
        });

        it('computes social charges on profit (SAS/SARL)', () => {
            const r = computeRoas({
                price: 100,
                cost: 30,
                socialRate: 45,
                socialBase: 'profit',
            });
            // grossProfit = 100 - 30 = 70
            // socialCharges = 70 * 45% = 31.50
            expect(r.socialChargesAmount).toBeCloseTo(31.50, 2);
        });

        it('does not charge social on negative gross profit', () => {
            const r = computeRoas({
                price: 10,
                cost: 50,
                socialRate: 45,
                socialBase: 'profit',
            });
            // grossProfit = 10 - 50 = -40 → clamped to 0
            expect(r.socialChargesAmount).toBe(0);
        });

        it('applies no social charges when rate is 0', () => {
            const r = computeRoas({
                price: 100,
                cost: 30,
                socialRate: 0,
                socialBase: 'revenue',
            });
            expect(r.socialChargesAmount).toBe(0);
        });
    });

    // ─── Discount ────────────────────────────────────────────────
    describe('discount / coupon rate', () => {
        it('does not apply discount when rate is 0', () => {
            const r = computeRoas({ price: 100, cost: 30, discount: 0 });
            expect(r.discountAmount).toBe(0);
            expect(r.revenueAfterDiscount).toBeCloseTo(100, 2);
        });

        it('reduces effective revenue by discount rate', () => {
            const r = computeRoas({ price: 100, cost: 30, discount: 15 });
            // revenueAfterDiscount = 100 * 0.85 = 85
            expect(r.revenueAfterDiscount).toBeCloseTo(85, 2);
            expect(r.discountAmount).toBeCloseTo(15, 2);
        });

        it('applies discount after returns', () => {
            const r = computeRoas({ price: 100, cost: 30, returns: 10, discount: 20 });
            // effectiveRevenue = 100 * 0.9 = 90
            // revenueAfterDiscount = 90 * 0.8 = 72
            expect(r.effectiveRevenue).toBeCloseTo(90, 2);
            expect(r.revenueAfterDiscount).toBeCloseTo(72, 2);
            expect(r.discountAmount).toBeCloseTo(18, 2);
        });

        it('applies discount after VAT + returns', () => {
            const r = computeRoas({ price: 120, cost: 30, vat: 20, vatIncluded: true, returns: 10, discount: 10 });
            // netRevenue = 120 / 1.20 = 100
            // effectiveRevenue = 100 * 0.9 = 90
            // revenueAfterDiscount = 90 * 0.9 = 81
            expect(r.revenueAfterDiscount).toBeCloseTo(81, 2);
            expect(r.discountAmount).toBeCloseTo(9, 2);
        });

        it('reduces profit and increases ROAS breakeven', () => {
            const noDiscount = computeRoas({ price: 100, cost: 30 });
            const withDiscount = computeRoas({ price: 100, cost: 30, discount: 20 });
            expect(withDiscount.profitPerOrder).toBeLessThan(noDiscount.profitPerOrder);
            expect(withDiscount.roasBreakeven).toBeGreaterThan(noDiscount.roasBreakeven);
        });

        it('social charges on revenue use revenueAfterDiscount', () => {
            const r = computeRoas({ price: 100, cost: 30, discount: 10, socialRate: 13.8, socialBase: 'revenue' });
            // revenueAfterDiscount = 90
            // socialCharges = 90 * 13.8% = 12.42
            expect(r.socialChargesAmount).toBeCloseTo(12.42, 2);
        });
    });

    // ─── Packaging cost ─────────────────────────────────────────
    describe('packaging cost', () => {
        it('does not add packaging when 0', () => {
            const r = computeRoas({ price: 100, cost: 30, packaging: 0 });
            expect(r.totalVariableCosts).toBeCloseTo(30, 2);
        });

        it('adds packaging to variable costs', () => {
            const r = computeRoas({ price: 100, cost: 30, shipping: 5, packaging: 3 });
            // totalVariableCosts = 30 + 5 + 0 (fee) + 0 (supplier) + 3 = 38
            expect(r.totalVariableCosts).toBeCloseTo(38, 2);
        });

        it('reduces profit per order', () => {
            const without = computeRoas({ price: 100, cost: 30 });
            const with_ = computeRoas({ price: 100, cost: 30, packaging: 4 });
            expect(with_.profitPerOrder).toBeCloseTo(without.profitPerOrder - 4, 2);
        });
    });

    // ─── Customs / import duty ──────────────────────────────────
    describe('customs / import duty', () => {
        it('does not add customs when 0', () => {
            const r = computeRoas({ price: 100, cost: 30, customs: 0 });
            expect(r.totalVariableCosts).toBeCloseTo(30, 2);
        });

        it('adds customs to variable costs', () => {
            const r = computeRoas({ price: 100, cost: 30, customs: 2.50 });
            // totalVariableCosts = 30 + 0 + 0 + 0 + 0 + 2.50 = 32.50
            expect(r.totalVariableCosts).toBeCloseTo(32.50, 2);
        });

        it('reduces profit per order', () => {
            const without = computeRoas({ price: 100, cost: 30 });
            const with_ = computeRoas({ price: 100, cost: 30, customs: 5 });
            expect(with_.profitPerOrder).toBeCloseTo(without.profitPerOrder - 5, 2);
        });
    });

    // ─── Combined new fields ────────────────────────────────────
    describe('packaging + customs + discount combined', () => {
        it('all three reduce profit correctly', () => {
            const r = computeRoas({ price: 100, cost: 30, packaging: 3, customs: 2, discount: 10 });
            // revenueAfterDiscount = 100 * 0.9 = 90
            // totalVariableCosts = 30 + 0 + 0 + 0 + 3 + 2 = 35
            // grossProfit = 90 - 35 = 55
            expect(r.revenueAfterDiscount).toBeCloseTo(90, 2);
            expect(r.totalVariableCosts).toBeCloseTo(35, 2);
            expect(r.grossProfit).toBeCloseTo(55, 2);
            expect(r.profitPerOrder).toBeCloseTo(55, 2);
        });

        it('full scenario with all fields', () => {
            const r = computeRoas({
                price: 49.90, cost: 12, shipping: 4.90,
                feeRate: 2.9, fixedFee: 0.25, supplierShip: 1.50,
                vat: 20, vatIncluded: true,
                socialRate: 13.8, socialBase: 'revenue',
                returns: 5, discount: 8,
                packaging: 2, customs: 1.50,
                adBudget: 500, fixedCosts: 50,
            });
            // netRevenue = 49.90 / 1.20 = 41.5833
            expect(r.netRevenue).toBeCloseTo(41.583, 1);
            // effectiveRevenue = 41.583 * 0.95 = 39.504
            expect(r.effectiveRevenue).toBeCloseTo(39.504, 1);
            // revenueAfterDiscount = 39.504 * 0.92 = 36.344
            expect(r.revenueAfterDiscount).toBeCloseTo(36.344, 0);
            // paymentFee = (49.90 * 2.9%) + 0.25 = 1.6971
            expect(r.paymentFee).toBeCloseTo(1.697, 2);
            // totalVarCosts = 12 + 4.90 + 1.697 + 1.50 + 2 + 1.50 = 23.597
            expect(r.totalVariableCosts).toBeCloseTo(23.597, 1);
            // grossProfit = 36.344 - 23.597 = 12.747
            expect(r.grossProfit).toBeCloseTo(12.747, 0);
            // socialCharges = 36.344 * 13.8% = 5.015
            expect(r.socialChargesAmount).toBeCloseTo(5.015, 0);
            // profitPerOrder > 0
            expect(r.profitPerOrder).toBeGreaterThan(0);
            expect(r.roasBreakeven).toBeGreaterThan(1);
            expect(r.ordersNeeded).toBeGreaterThan(0);
        });

        it('100% discount zeroes revenue and kills profit', () => {
            const r = computeRoas({ price: 100, cost: 30, discount: 100 });
            expect(r.revenueAfterDiscount).toBe(0);
            expect(r.profitPerOrder).toBeLessThan(0);
            expect(r.roasBreakeven).toBe(0);
        });
    });

    // ─── ROAS Breakeven ──────────────────────────────────────────
    describe('ROAS breakeven', () => {
        it('computes ROAS breakeven correctly', () => {
            const r = computeRoas({ price: 30, cost: 10 });
            // profit = 30 - 10 = 20
            // roasBreakeven = 30 / 20 = 1.5x
            expect(r.roasBreakeven).toBeCloseTo(1.5, 2);
        });

        it('returns 0 when profit is 0 (avoids division by zero)', () => {
            const r = computeRoas({ price: 10, cost: 10 });
            expect(r.roasBreakeven).toBe(0);
        });

        it('returns 0 when profit is negative', () => {
            const r = computeRoas({ price: 10, cost: 20 });
            expect(r.roasBreakeven).toBe(0);
        });
    });

    // ─── Margin ──────────────────────────────────────────────────
    describe('margin', () => {
        it('computes margin as percentage of selling price', () => {
            const r = computeRoas({ price: 100, cost: 30 });
            // profit = 70, margin = 70%
            expect(r.marginPercent).toBeCloseTo(70, 1);
        });

        it('handles negative margin', () => {
            const r = computeRoas({ price: 10, cost: 50 });
            expect(r.marginPercent).toBeLessThan(0);
        });

        it('returns 0 margin when price is 0', () => {
            const r = computeRoas({ price: 0, cost: 10 });
            expect(r.marginPercent).toBe(0);
        });
    });

    // ─── Orders needed ───────────────────────────────────────────
    describe('orders needed & monthly simulation', () => {
        it('computes orders needed to cover ad budget', () => {
            const r = computeRoas({ price: 30, cost: 10, adBudget: 500 });
            // profit/order = 20, orders = ceil(500/20) = 25
            expect(r.ordersNeeded).toBe(25);
        });

        it('includes fixed costs in orders needed', () => {
            const r = computeRoas({ price: 30, cost: 10, adBudget: 500, fixedCosts: 100 });
            // orders = ceil(600/20) = 30
            expect(r.ordersNeeded).toBe(30);
        });

        it('returns 0 orders when no ad budget and no fixed costs', () => {
            const r = computeRoas({ price: 30, cost: 10 });
            expect(r.ordersNeeded).toBe(0);
        });

        it('returns 0 orders when profit per order is 0 or negative', () => {
            const r = computeRoas({ price: 10, cost: 10, adBudget: 500 });
            expect(r.ordersNeeded).toBe(0);
        });

        it('computes monthly profit correctly', () => {
            const r = computeRoas({ price: 30, cost: 10, adBudget: 500 });
            // ordersNeeded = 25, monthlyRevenue = 750
            // monthlyProfit = (25 * 20) - 500 = 0
            expect(r.monthlyRevenue).toBeCloseTo(750, 0);
            expect(r.monthlyProfit).toBeCloseTo(0, 0);
        });

        it('rounds up orders needed (ceil)', () => {
            const r = computeRoas({ price: 30, cost: 10, adBudget: 501 });
            // orders = ceil(501/20) = 26 (not 25.05)
            expect(r.ordersNeeded).toBe(26);
        });
    });

    // ─── Edge cases ──────────────────────────────────────────────
    describe('edge cases', () => {
        it('handles all zeros gracefully', () => {
            const r = computeRoas({});
            expect(r.profitPerOrder).toBe(0);
            expect(r.roasBreakeven).toBe(0);
            expect(r.marginPercent).toBe(0);
            expect(r.ordersNeeded).toBe(0);
            expect(Number.isNaN(r.profitPerOrder)).toBe(false);
            expect(Number.isNaN(r.roasBreakeven)).toBe(false);
        });

        it('handles very large values without overflow', () => {
            const r = computeRoas({ price: 999999, cost: 100000, adBudget: 1000000 });
            expect(Number.isFinite(r.profitPerOrder)).toBe(true);
            expect(Number.isFinite(r.roasBreakeven)).toBe(true);
            expect(Number.isFinite(r.ordersNeeded)).toBe(true);
        });

        it('handles 100% return rate', () => {
            const r = computeRoas({ price: 100, cost: 30, returns: 100 });
            expect(r.effectiveRevenue).toBe(0);
            expect(r.profitPerOrder).toBeLessThan(0);
        });

        it('handles 100% VAT rate', () => {
            const r = computeRoas({ price: 100, cost: 30, vat: 100, vatIncluded: true });
            // netRevenue = 100 / 2 = 50
            expect(r.netRevenue).toBeCloseTo(50, 2);
        });
    });

    // ─── Real-world scenarios ────────────────────────────────────
    describe('real-world country presets', () => {
        it('France micro-entreprise with VAT', () => {
            const r = computeRoas({
                price: 29.90,
                cost: 8.50,
                shipping: 4.90,
                feeRate: 2.9,
                fixedFee: 0.25,
                vat: 20,
                vatIncluded: true,
                socialRate: 13.8,
                socialBase: 'revenue',
                adBudget: 500,
            });
            // netRevenue = 29.90 / 1.20 = 24.9167
            expect(r.netRevenue).toBeCloseTo(24.917, 1);
            // paymentFee = (29.90 * 2.9%) + 0.25 = 1.1171
            expect(r.paymentFee).toBeCloseTo(1.117, 2);
            // grossProfit = 24.917 - 8.50 - 4.90 - 1.117 = 10.40
            expect(r.grossProfit).toBeCloseTo(10.40, 0);
            // socialCharges on revenue = 24.917 * 13.8% = 3.439
            expect(r.socialChargesAmount).toBeCloseTo(3.439, 1);
            // profitPerOrder = 10.40 - 3.439 = ~6.96
            expect(r.profitPerOrder).toBeGreaterThan(0);
            expect(r.roasBreakeven).toBeGreaterThan(1);
            expect(r.ordersNeeded).toBeGreaterThan(0);
        });

        it('France SAS (social charges on profit)', () => {
            const r = computeRoas({
                price: 49.90,
                cost: 12,
                shipping: 0,
                feeRate: 2.9,
                fixedFee: 0.25,
                vat: 20,
                vatIncluded: true,
                socialRate: 45,
                socialBase: 'profit',
                adBudget: 1000,
            });
            expect(r.profitPerOrder).toBeGreaterThan(0);
            expect(r.roasBreakeven).toBeGreaterThan(1);
        });

        it('USA LLC (no VAT, social on profit)', () => {
            const r = computeRoas({
                price: 39.99,
                cost: 10,
                shipping: 5.99,
                feeRate: 2.9,
                fixedFee: 0.30,
                vat: 0,
                vatIncluded: false,
                socialRate: 14.13,
                socialBase: 'profit',
                adBudget: 800,
            });
            // No VAT deduction
            expect(r.netRevenue).toBeCloseTo(39.99, 2);
            expect(r.vatAmount).toBe(0);
            expect(r.profitPerOrder).toBeGreaterThan(0);
        });

        it('UAE freezone (5% VAT, no social charges)', () => {
            const r = computeRoas({
                price: 100,
                cost: 25,
                shipping: 10,
                feeRate: 2.5,
                fixedFee: 0,
                vat: 5,
                vatIncluded: false,
                socialRate: 0,
                socialBase: 'revenue',
                adBudget: 2000,
            });
            // UAE VAT not included in price, so no deduction
            expect(r.netRevenue).toBeCloseTo(100, 2);
            expect(r.socialChargesAmount).toBe(0);
        });

        it('Germany Kleinunternehmer (no VAT, no social)', () => {
            const r = computeRoas({
                price: 24.99,
                cost: 7,
                shipping: 3.99,
                feeRate: 2.9,
                fixedFee: 0.25,
                vat: 0,
                vatIncluded: false,
                socialRate: 0,
                socialBase: 'revenue',
            });
            expect(r.vatAmount).toBe(0);
            expect(r.socialChargesAmount).toBe(0);
            expect(r.profitPerOrder).toBeGreaterThan(0);
        });
    });
});

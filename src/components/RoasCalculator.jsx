'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronDown, ChevronUp, TrendingUp, Target, BarChart3, ShoppingCart, Globe } from 'lucide-react';

const CURRENCIES = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
    { code: 'GBP', symbol: '£' },
    { code: 'AED', symbol: 'د.إ' },
    { code: 'CHF', symbol: 'CHF' },
    { code: 'SEK', symbol: 'kr' },
    { code: 'NOK', symbol: 'kr' },
    { code: 'DKK', symbol: 'kr' },
    { code: 'CZK', symbol: 'Kč' },
    { code: 'PLN', symbol: 'zł' },
    { code: 'CAD', symbol: 'CA$' },
    { code: 'AUD', symbol: 'A$' },
];

const COUNTRY_GROUPS = [
    {
        key: 'france', flag: '🇫🇷',
        presets: [
            { key: 'france_micro', currency: 'EUR', vatRate: 0, vatIncluded: false, socialRate: 13.8, socialBase: 'revenue' },
            { key: 'france_micro_vat', currency: 'EUR', vatRate: 20, vatIncluded: true, socialRate: 13.8, socialBase: 'revenue' },
            { key: 'france_sas', currency: 'EUR', vatRate: 20, vatIncluded: true, socialRate: 45, socialBase: 'profit' },
            { key: 'france_sarl', currency: 'EUR', vatRate: 20, vatIncluded: true, socialRate: 40, socialBase: 'profit' },
        ]
    },
    {
        key: 'germany', flag: '🇩🇪',
        presets: [
            { key: 'germany_klein', currency: 'EUR', vatRate: 0, vatIncluded: false, socialRate: 0, socialBase: 'revenue' },
            { key: 'germany_einzelunternehmen', currency: 'EUR', vatRate: 19, vatIncluded: true, socialRate: 0, socialBase: 'revenue' },
            { key: 'germany_gmbh', currency: 'EUR', vatRate: 19, vatIncluded: true, socialRate: 21, socialBase: 'profit' },
        ]
    },
    {
        key: 'uk', flag: '🇬🇧',
        presets: [
            { key: 'uk_sole', currency: 'GBP', vatRate: 20, vatIncluded: true, socialRate: 9, socialBase: 'profit' },
            { key: 'uk_ltd', currency: 'GBP', vatRate: 20, vatIncluded: true, socialRate: 13.8, socialBase: 'profit' },
            { key: 'uk_llp', currency: 'GBP', vatRate: 20, vatIncluded: true, socialRate: 9, socialBase: 'profit' },
        ]
    },
    {
        key: 'usa', flag: '🇺🇸',
        presets: [
            { key: 'usa_sole', currency: 'USD', vatRate: 0, vatIncluded: false, socialRate: 14.13, socialBase: 'profit' },
            { key: 'usa_llc', currency: 'USD', vatRate: 0, vatIncluded: false, socialRate: 14.13, socialBase: 'profit' },
            { key: 'usa_corp', currency: 'USD', vatRate: 0, vatIncluded: false, socialRate: 7.65, socialBase: 'profit' },
        ]
    },
    {
        key: 'uae', flag: '🇦🇪',
        presets: [
            { key: 'uae_freezone', currency: 'AED', vatRate: 5, vatIncluded: false, socialRate: 0, socialBase: 'revenue' },
            { key: 'uae_mainland', currency: 'AED', vatRate: 5, vatIncluded: false, socialRate: 0, socialBase: 'revenue' },
        ]
    },
];

const RoasCalculator = ({ content, common, lang }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showTaxSection, setShowTaxSection] = useState(false);
    const [currency, setCurrency] = useState('EUR');
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');

    // Basic fields
    const [sellingPrice, setSellingPrice] = useState('');
    const [productCost, setProductCost] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [paymentFeeRate, setPaymentFeeRate] = useState('2.9');
    const [monthlyAdBudget, setMonthlyAdBudget] = useState('');

    // Advanced fields
    const [supplierShipping, setSupplierShipping] = useState('');
    const [fixedPaymentFee, setFixedPaymentFee] = useState('0.25');

    // Tax fields
    const [vatRate, setVatRate] = useState('');
    const [vatIncluded, setVatIncluded] = useState(false);
    const [socialChargesRate, setSocialChargesRate] = useState('');
    const [socialBase, setSocialBase] = useState('revenue');
    const [monthlyFixedCosts, setMonthlyFixedCosts] = useState('');
    const [returnRate, setReturnRate] = useState('');

    const handleCountrySelect = (countryKey) => {
        setSelectedCountry(countryKey);
        setSelectedPreset(null);
        if (countryKey === 'custom') {
            setVatRate('');
            setVatIncluded(false);
            setSocialChargesRate('');
            setSocialBase('revenue');
            setShowTaxSection(true);
        } else {
            const group = COUNTRY_GROUPS.find(g => g.key === countryKey);
            if (group) {
                setCurrency(group.presets[0].currency);
            }
        }
    };

    const handlePresetSelect = (preset) => {
        setSelectedPreset(preset.key);
        if (preset.currency) setCurrency(preset.currency);
        setVatRate(preset.vatRate > 0 ? String(preset.vatRate) : '');
        setVatIncluded(preset.vatIncluded);
        setSocialChargesRate(preset.socialRate > 0 ? String(preset.socialRate) : '');
        setSocialBase(preset.socialBase);
        setShowTaxSection(true);
    };

    const activeGroup = COUNTRY_GROUPS.find(g => g.key === selectedCountry);

    const currencyObj = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
    const sym = currencyObj.symbol;

    // Parse values
    const price = parseFloat(sellingPrice) || 0;
    const cost = parseFloat(productCost) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const feeRate = parseFloat(paymentFeeRate) || 0;
    const fixedFee = parseFloat(fixedPaymentFee) || 0;
    const adBudget = parseFloat(monthlyAdBudget) || 0;
    const supplierShip = parseFloat(supplierShipping) || 0;
    const vat = parseFloat(vatRate) || 0;
    const socialRate = parseFloat(socialChargesRate) || 0;
    const fixedCosts = parseFloat(monthlyFixedCosts) || 0;
    const returns = parseFloat(returnRate) || 0;

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

    // POAS Breakeven = 1
    const poasBreakeven = 1;

    // 8. Orders needed (including fixed costs)
    const ordersNeeded = profitPerOrder > 0 ? Math.ceil((adBudget + fixedCosts) / profitPerOrder) : 0;

    // Monthly simulation
    const monthlyRevenue = ordersNeeded * price;
    const monthlyProfit = (ordersNeeded * profitPerOrder) - adBudget - fixedCosts;

    const hasResults = price > 0 && cost > 0;

    const fmt = (v) => `${v.toFixed(2)} ${sym}`;
    const fmtInt = (v) => `${v.toFixed(0)} ${sym}`;

    const inputClass = "w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm";
    const labelClass = "block text-sm font-medium text-zinc-700 mb-1.5";

    return (
        <section className="py-16">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calculator Form */}
                    <div>
                        {/* Country / Region Select */}
                        <div className="mb-4">
                            <label className={labelClass}>
                                <Globe className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                                {content?.presets?.countryLabel || 'Country / Region'}
                            </label>
                            <p className="text-xs text-zinc-400 mb-2">{content?.fields?.countryHint || 'Pre-fills VAT and charges'}</p>
                            <select
                                value={selectedCountry}
                                onChange={(e) => handleCountrySelect(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm cursor-pointer"
                            >
                                <option value="">{content?.presets?.selectCountry || 'Select a country'}</option>
                                {COUNTRY_GROUPS.map((group) => (
                                    <option key={group.key} value={group.key}>
                                        {group.flag} {content?.presets?.[group.key] || group.key}
                                    </option>
                                ))}
                                <option value="custom">{content?.presets?.custom || 'Custom'}</option>
                            </select>
                        </div>

                        {/* Legal Status Chips */}
                        {activeGroup && (
                            <div className="mb-6">
                                <label className={labelClass}>
                                    {content?.presets?.statusLabel || 'Legal status'}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {activeGroup.presets.map((preset) => (
                                        <button
                                            key={preset.key}
                                            onClick={() => handlePresetSelect(preset)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                selectedPreset === preset.key
                                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                    : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                                            }`}
                                        >
                                            {content?.presets?.[preset.key] || preset.key}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom selected — no chips, just open tax section */}
                        {selectedCountry === 'custom' && (
                            <div className="mb-6">
                                <p className="text-xs text-zinc-400">
                                    {content?.presets?.customHint || 'Configure VAT and charges manually below.'}
                                </p>
                            </div>
                        )}

                        {/* Currency Selector */}
                        <div className="mb-8">
                            <label className={labelClass}>
                                {content?.fields?.currency || 'Currency'}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {CURRENCIES.slice(0, 6).map((c) => (
                                    <button
                                        key={c.code}
                                        onClick={() => setCurrency(c.code)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                            currency === c.code
                                                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                                        }`}
                                    >
                                        {c.symbol} {c.code}
                                    </button>
                                ))}
                                <select
                                    value={CURRENCIES.slice(0, 6).some(c => c.code === currency) ? '' : currency}
                                    onChange={(e) => { if (e.target.value) setCurrency(e.target.value); }}
                                    className="px-3 py-2 rounded-lg text-sm font-medium bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200 transition-all cursor-pointer"
                                >
                                    <option value="">{content?.fields?.otherCurrency || 'Other...'}</option>
                                    {CURRENCIES.slice(6).map((c) => (
                                        <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Basic Fields */}
                        <div className="space-y-5">
                            <div>
                                <label className={labelClass}>
                                    {content?.fields?.sellingPrice || 'Product selling price'} ({sym})
                                </label>
                                <input
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                    placeholder="29.90"
                                    className={inputClass}
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    {content?.fields?.productCost || 'Product cost'} ({sym})
                                </label>
                                <input
                                    type="number"
                                    value={productCost}
                                    onChange={(e) => setProductCost(e.target.value)}
                                    placeholder="8.50"
                                    className={inputClass}
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    {content?.fields?.shippingCost || 'Customer shipping cost'} ({sym})
                                </label>
                                <input
                                    type="number"
                                    value={shippingCost}
                                    onChange={(e) => setShippingCost(e.target.value)}
                                    placeholder="4.90"
                                    className={inputClass}
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    {content?.fields?.paymentFee || 'Payment fee rate (%)'}
                                </label>
                                <div className="flex gap-2">
                                    {[
                                        { label: 'Stripe', value: '2.9' },
                                        { label: 'PayPal', value: '3.4' },
                                        { label: 'Shopify Pay', value: '2.4' },
                                    ].map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => setPaymentFeeRate(preset.value)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                paymentFeeRate === preset.value
                                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                    : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                                            }`}
                                        >
                                            {preset.label} ({preset.value}%)
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="number"
                                    value={paymentFeeRate}
                                    onChange={(e) => setPaymentFeeRate(e.target.value)}
                                    className={`${inputClass} mt-2`}
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    {content?.fields?.adBudget || 'Monthly ad budget'} ({sym})
                                </label>
                                <input
                                    type="number"
                                    value={monthlyAdBudget}
                                    onChange={(e) => setMonthlyAdBudget(e.target.value)}
                                    placeholder="500"
                                    className={inputClass}
                                    min="0"
                                    step="1"
                                />
                            </div>
                        </div>

                        {/* Advanced Toggle */}
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center gap-2 mt-6 text-sm text-orange-600 font-medium hover:text-orange-700 transition-colors"
                        >
                            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {content?.advanced?.toggle || "More options"}
                        </button>

                        {showAdvanced && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 space-y-5 pt-4 border-t border-zinc-200"
                            >
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.supplierShipping || 'Supplier shipping'} ({sym})
                                    </label>
                                    <input
                                        type="number"
                                        value={supplierShipping}
                                        onChange={(e) => setSupplierShipping(e.target.value)}
                                        placeholder="2.00"
                                        className={inputClass}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.fixedFee || 'Fixed fee per transaction'} ({sym})
                                    </label>
                                    <input
                                        type="number"
                                        value={fixedPaymentFee}
                                        onChange={(e) => setFixedPaymentFee(e.target.value)}
                                        placeholder="0.25"
                                        className={inputClass}
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Tax Section Toggle */}
                        <button
                            onClick={() => setShowTaxSection(!showTaxSection)}
                            className="flex items-center gap-2 mt-4 text-sm text-orange-600 font-medium hover:text-orange-700 transition-colors"
                        >
                            {showTaxSection ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {content?.taxSection?.toggle || 'VAT, Charges & Returns'}
                        </button>

                        {showTaxSection && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 space-y-5 pt-4 border-t border-zinc-200"
                            >
                                {/* VAT Rate */}
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.vatRate || 'VAT Rate (%)'}
                                    </label>
                                    <input
                                        type="number"
                                        value={vatRate}
                                        onChange={(e) => { setVatRate(e.target.value); setSelectedPreset('custom'); setSelectedCountry('custom'); }}
                                        placeholder="20"
                                        className={inputClass}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                    />
                                </div>

                                {/* VAT Included Toggle */}
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-700">
                                        {content?.fields?.vatIncluded || 'VAT included in price'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => { setVatIncluded(!vatIncluded); setSelectedPreset('custom'); setSelectedCountry('custom'); }}
                                        className={`relative w-11 h-6 rounded-full transition-colors ${vatIncluded ? 'bg-orange-500' : 'bg-zinc-300'}`}
                                    >
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${vatIncluded ? 'translate-x-5' : ''}`} />
                                    </button>
                                </div>

                                {/* Social Charges */}
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.socialCharges || 'Social Charges (%)'}
                                        {socialRate > 0 && (
                                            <span className="ml-2 text-xs text-zinc-400 font-normal">
                                                ({socialBase === 'revenue'
                                                    ? (content?.fields?.onRevenue || 'on net revenue')
                                                    : (content?.fields?.onProfit || 'on net profit')
                                                })
                                            </span>
                                        )}
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <button
                                            onClick={() => { setSocialBase('revenue'); setSelectedPreset('custom'); setSelectedCountry('custom'); }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                socialBase === 'revenue'
                                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                    : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                                            }`}
                                        >
                                            {content?.fields?.onRevenue || 'on net revenue'}
                                        </button>
                                        <button
                                            onClick={() => { setSocialBase('profit'); setSelectedPreset('custom'); setSelectedCountry('custom'); }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                                socialBase === 'profit'
                                                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                                                    : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
                                            }`}
                                        >
                                            {content?.fields?.onProfit || 'on net profit'}
                                        </button>
                                    </div>
                                    <input
                                        type="number"
                                        value={socialChargesRate}
                                        onChange={(e) => { setSocialChargesRate(e.target.value); setSelectedPreset('custom'); setSelectedCountry('custom'); }}
                                        placeholder="13.8"
                                        className={inputClass}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                    />
                                </div>

                                {/* Monthly Fixed Costs */}
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.monthlyFixedCosts || 'Monthly Fixed Costs'} ({sym})
                                    </label>
                                    <p className="text-xs text-zinc-400 mb-1.5">{content?.fields?.fixedCostsHint || 'Shopify, apps, domain...'}</p>
                                    <input
                                        type="number"
                                        value={monthlyFixedCosts}
                                        onChange={(e) => setMonthlyFixedCosts(e.target.value)}
                                        placeholder="200"
                                        className={inputClass}
                                        min="0"
                                        step="1"
                                    />
                                </div>

                                {/* Return Rate */}
                                <div>
                                    <label className={labelClass}>
                                        {content?.fields?.returnRate || 'Return Rate (%)'}
                                    </label>
                                    <input
                                        type="number"
                                        value={returnRate}
                                        onChange={(e) => setReturnRate(e.target.value)}
                                        placeholder="5"
                                        className={inputClass}
                                        min="0"
                                        max="100"
                                        step="0.1"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Results */}
                    <div>
                        {hasResults ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 sticky top-24"
                            >
                                <h3 className="font-brand text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-orange-500" />
                                    {content?.results?.title || 'Results'}
                                </h3>

                                {/* Waterfall visualization */}
                                <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-zinc-600">{content?.results?.revenue || 'Selling price'}</span>
                                        <span className="font-semibold text-zinc-900">{fmt(price)}</span>
                                    </div>

                                    {/* VAT line (conditional) */}
                                    {vatAmount > 0 && (
                                        <div className="flex justify-between items-center text-amber-600">
                                            <span className="text-sm">- {content?.results?.vatDeducted || 'VAT Deducted'}</span>
                                            <span className="font-semibold">{fmt(vatAmount)}</span>
                                        </div>
                                    )}

                                    {/* Returns line (conditional) */}
                                    {returnsAmount > 0 && (
                                        <div className="flex justify-between items-center text-amber-600">
                                            <span className="text-sm">- {content?.results?.returnsImpact || 'Returns Impact'} ({returns}%)</span>
                                            <span className="font-semibold">{fmt(returnsAmount)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-red-600">
                                        <span className="text-sm">- {content?.results?.productCost || 'Product cost'}</span>
                                        <span className="font-semibold">{fmt(cost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-red-600">
                                        <span className="text-sm">- {content?.results?.shipping || 'Shipping'}</span>
                                        <span className="font-semibold">{fmt(shipping + supplierShip)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-red-600">
                                        <span className="text-sm">- {content?.results?.fees || 'Payment fees'}</span>
                                        <span className="font-semibold">{fmt(paymentFee)}</span>
                                    </div>

                                    {/* Social charges line (conditional) */}
                                    {socialChargesAmount > 0 && (
                                        <div className="flex justify-between items-center text-amber-600">
                                            <span className="text-sm">- {content?.results?.socialCharges || 'Social Charges'}</span>
                                            <span className="font-semibold">{fmt(socialChargesAmount)}</span>
                                        </div>
                                    )}

                                    <div className="h-px bg-zinc-200 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-zinc-900">{content?.results?.profitPerOrder || 'Net profit / order'}</span>
                                        <span className={`text-xl font-bold ${profitPerOrder >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {fmt(profitPerOrder)}
                                        </span>
                                    </div>
                                </div>

                                {/* Key metrics */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white rounded-xl border border-zinc-200 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BarChart3 className="w-4 h-4 text-blue-500" />
                                            <span className="text-xs text-zinc-500 uppercase font-medium">{content?.results?.margin || 'Net margin'}</span>
                                        </div>
                                        <p className={`text-2xl font-bold ${marginPercent >= 0 ? 'text-zinc-900' : 'text-red-600'}`}>
                                            {marginPercent.toFixed(1)}%
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl border border-zinc-200 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="w-4 h-4 text-orange-500" />
                                            <span className="text-xs text-zinc-500 uppercase font-medium">ROAS Breakeven</span>
                                        </div>
                                        <p className="text-2xl font-bold text-zinc-900">
                                            {roasBreakeven > 0 ? `${roasBreakeven.toFixed(2)}x` : '\u2014'}
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-xl border border-zinc-200 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs text-zinc-500 uppercase font-medium">POAS Breakeven</span>
                                        </div>
                                        <p className="text-2xl font-bold text-zinc-900">{poasBreakeven.toFixed(2)}x</p>
                                    </div>

                                    {(adBudget > 0 || fixedCosts > 0) && (
                                        <div className="bg-white rounded-xl border border-zinc-200 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <ShoppingCart className="w-4 h-4 text-purple-500" />
                                                <span className="text-xs text-zinc-500 uppercase font-medium">{content?.results?.salesNeeded || 'Sales needed'}</span>
                                            </div>
                                            <p className="text-2xl font-bold text-zinc-900">
                                                {profitPerOrder > 0 ? ordersNeeded : '\u221e'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Monthly Simulation */}
                                {(adBudget > 0 || fixedCosts > 0) && profitPerOrder > 0 && (
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6">
                                        <h4 className="font-brand font-semibold text-zinc-900 mb-3">
                                            {content?.results?.monthlyTitle || 'Monthly simulation'}
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-zinc-600">{content?.results?.monthlyRevenue || 'Revenue needed'}</span>
                                                <span className="font-semibold">{fmtInt(monthlyRevenue)}</span>
                                            </div>
                                            {adBudget > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-600">{content?.results?.monthlyAds || 'Ad budget'}</span>
                                                    <span className="font-semibold text-red-600">-{fmtInt(adBudget)}</span>
                                                </div>
                                            )}
                                            {fixedCosts > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-600">{content?.results?.monthlyFixedCosts || 'Fixed Costs'}</span>
                                                    <span className="font-semibold text-red-600">-{fmtInt(fixedCosts)}</span>
                                                </div>
                                            )}
                                            <div className="h-px bg-emerald-200" />
                                            <div className="flex justify-between">
                                                <span className="font-semibold">{content?.results?.monthlyProfit || 'Profit after ads'}</span>
                                                <span className={`font-bold text-lg ${monthlyProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {monthlyProfit >= 0 ? '+' : ''}{fmtInt(monthlyProfit)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-zinc-200 border-dashed">
                                <div className="text-center">
                                    <Calculator className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                                    <p className="text-zinc-400 text-sm">{content?.results?.empty || 'Fill in the fields to see your results'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoasCalculator;

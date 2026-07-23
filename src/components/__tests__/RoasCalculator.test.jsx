import { fireEvent, render, screen } from '@testing-library/react';
import RoasCalculator from '@/components/RoasCalculator';

beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserverMock {
        observe = jest.fn();
        disconnect = jest.fn();
    };
    Object.assign(navigator, { clipboard: { writeText: jest.fn(async () => undefined) } });
});

const content = {
    fields: {
        sellingPrice: 'Price', productCost: 'Cost', shippingCost: 'Shipping', adBudget: 'Ad budget',
        paymentFee: 'Payment fee', currency: 'Currency', otherCurrency: 'Other currency',
    },
    presets: { countryLabel: 'Country', selectCountry: 'Select country', custom: 'Custom' },
    advanced: { toggle: 'Advanced' },
    taxSection: { toggle: 'Taxes' },
    results: {
        title: 'Results', empty: 'Fill the fields', revenue: 'Revenue', productCost: 'Product cost',
        shipping: 'Shipping', fees: 'Fees', profitPerOrder: 'Profit per order', margin: 'Margin',
        roasBreakeven: 'Breakeven ROAS', maxCPA: 'Max CPA', copy: 'Copy', copied: 'Copied',
    },
};

test('renders the tested calculation engine result from user inputs', () => {
    render(<RoasCalculator content={content} lang="en" />);

    fireEvent.change(screen.getByRole('spinbutton', { name: 'Price €' }), { target: { value: '100' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Cost €' }), { target: { value: '30' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Shipping €' }), { target: { value: '10' } });

    expect(screen.getAllByText('56.85 €')).toHaveLength(2);
    expect(screen.getByText('1.76x')).toBeInTheDocument();
});

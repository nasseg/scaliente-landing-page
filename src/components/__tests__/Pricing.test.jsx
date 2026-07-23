import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pricing from '@/components/Pricing';

const plan = (name) => ({
    name,
    desc: `${name} plan`,
    cta: `Choose ${name}`,
    features: {
        orders: 'Orders', shop: 'Shop', shops: 'Shops', history: 'History',
        adPlatform: '1 ad platform', adPlatforms: '5 ad platforms', export: 'Export',
        comparison: 'Comparison', multiShop: 'Multi-shop', priority: 'Priority',
        collaborators: 'Collaborators',
    },
});

const content = {
    header: { title: { main: 'A plan for', highlight: 'your volume' }, quote: 'No hidden tier.' },
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: '-20%' },
    volume: {
        label: 'Monthly orders',
        options: { discovery: '50', lite: '100', starter: '300', growth: '1,500', scale: 'Unlimited' },
        recommendation: 'Recommended for your volume',
    },
    plans: {
        discovery: plan('Discovery'), lite: plan('Lite'), starter: plan('Starter'),
        growth: plan('Growth'), scale: plan('Scale'),
    },
    trial: '7-day trial',
};

const common = { free: 'Free', month: 'month', billed: 'Billed', year: 'year', noCard: 'No card' };

test('recommends the plan matching the selected order volume', async () => {
    const user = userEvent.setup();
    render(<Pricing content={content} common={common} />);

    expect(screen.getAllByText('Starter').find((node) => node.dataset.recommended)).toHaveAttribute('data-recommended', 'true');
    await user.click(screen.getByRole('button', { name: /1,500/ }));
    expect(screen.getAllByText('Growth').find((node) => node.dataset.recommended)).toHaveAttribute('data-recommended', 'true');
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AffiliateForm from '@/components/affiliate/AffiliateForm';

const content = {
    form: {
        title: 'Apply', disclaimer: 'Reviewed by our team', submit: 'Submit',
        successTitle: 'Received', successMessage: 'Thank you',
        fields: { firstName: 'First name', lastName: 'Last name', email: 'Email', website: 'Website', promotion: 'Promotion' },
        placeholders: { firstName: 'Nora', lastName: 'Seller', email: 'nora@example.com', website: 'https://example.com', promotion: 'Newsletter' },
    },
};

test('prevents a duplicate submission while the first request is pending', async () => {
    const user = userEvent.setup();
    let resolveRequest;
    global.fetch = jest.fn(() => new Promise((resolve) => { resolveRequest = resolve; }));
    render(<AffiliateForm content={content} lang="en" />);

    await user.type(screen.getByLabelText('First name'), 'Nora');
    await user.type(screen.getByLabelText('Last name'), 'Seller');
    await user.type(screen.getByLabelText('Email'), 'nora@example.com');
    const submit = screen.getByRole('button', { name: 'Submit' });
    await user.click(submit);
    await user.click(submit);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    resolveRequest({ ok: true, json: async () => ({ success: true }) });
    expect(await screen.findByText('Received')).toBeInTheDocument();
});

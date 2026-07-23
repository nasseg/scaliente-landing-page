import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/Navbar';

jest.mock('@/components/LanguageSelector', () => function LanguageSelectorMock() {
    return <button type="button">FR</button>;
});

beforeEach(() => {
    window.requestAnimationFrame = (callback) => {
        queueMicrotask(callback);
        return 1;
    };
    window.cancelAnimationFrame = jest.fn();
    const observers = [];
    global.IntersectionObserver = class IntersectionObserverMock {
        constructor(callback) {
            this.callback = callback;
            this.elements = [];
            observers.push(this);
        }
        observe = (element) => this.elements.push(element);
        disconnect = jest.fn();
    };
    global.__headerObservers = observers;
});

const content = {
    features: 'Features', comparison: 'Compare', pricing: 'Pricing', faq: 'FAQ',
    login: 'Login', freeTrial: 'Free trial', openMenu: 'Open menu', closeMenu: 'Close menu',
    dropdown: {},
};

test('focuses and traps the mobile menu, then restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar content={content} lang="fr" />);
    const toggle = screen.getByRole('button', { name: 'Open menu' });

    await user.click(toggle);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toContainElement(document.activeElement);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
});

test('updates its theme when the top observer crosses a light section', async () => {
    render(
        <>
            <Navbar content={content} lang="fr" />
            <div data-header-theme="light" data-testid="light-section" />
        </>
    );

    const section = screen.getByTestId('light-section');
    const observer = global.__headerObservers.find(({ elements }) => elements.includes(section));
    act(() => observer.callback([{ isIntersecting: true, target: section, boundingClientRect: { top: 0 } }]));

    await waitFor(() => {
        expect(screen.getByRole('link', { name: 'Scaliente' })).toHaveClass('bg-[#fafafa]');
    });
});

test('opens the desktop product menu on hover and closes it after the pointer leaves', () => {
    jest.useFakeTimers();
    render(<Navbar content={content} lang="fr" />);
    const menuRegion = screen.getByTestId('desktop-product-menu');
    const trigger = screen.getByRole('button', { name: 'Features' });

    fireEvent.pointerEnter(menuRegion);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.pointerLeave(menuRegion);
    act(() => jest.advanceTimersByTime(139));
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    act(() => jest.advanceTimersByTime(1));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    jest.useRealTimers();
});

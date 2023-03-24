import { act, render, screen, waitFor } from '@testing-library/react';
import { useMicrophoneStreamAnalyser } from './useMicrophoneStreamAnalyser';


test('has a needsAccess boolean "true" when the device does not have permissions', async () => {
    function TestComponent() {
        const [ , needsAccess] = useMicrophoneStreamAnalyser();

        return (
            <div>needsAccess = {"" + needsAccess}</div>
        );
    }


    render(<TestComponent />);

    await waitFor(() => {
        const linkElement = screen.getByText(/needsAccess = true/i);
        expect(linkElement).toBeInTheDocument();
    })
});

xtest('has a needsAccess boolean "false" when the device does have permissions', async () => {
    function TestComponent() {
        const [ , needsAccess] = useMicrophoneStreamAnalyser();

        return (
            <div>needsAccess = {"" + needsAccess}</div>
        );
    }

    window.navigator = global.navigator || {};
    window.navigator.mediaDevices = global.navigator.mediaDevices || {};
    window.navigator.mediaDevices.getUserMedia = jest.fn();

    render(<TestComponent />);

    await waitFor(() => {
        const linkElement = screen.getByText(/needsAccess = false/i);
        expect(linkElement).toBeInTheDocument();
    })
});

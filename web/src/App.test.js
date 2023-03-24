import { render, screen } from '@testing-library/react';
import App from './App';

describe("renders basic components of the app", () => {
  
  test('Daily Guided Practice', () => {
    render(<App />);
    const linkElement = screen.getByText(/Daily Guided Practice/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Drill Playlist', () => {
    render(<App />);
    const linkElement = screen.getByText(/Drill Playlist/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Midi Player', () => {
    render(<App />);
    const linkElement = screen.getByTitle(/midi-player/i);
    expect(linkElement).toBeInTheDocument();
  });
})



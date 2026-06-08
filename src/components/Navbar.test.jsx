import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

// Mock the Keycloak service so the test runs without external network calls
vi.mock('../services/keycloak', () => ({
  default: {
    authenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  }
}));

describe('Navbar Component Integration', () => {
  it('renders the navigation structure correctly for unauthenticated users', () => {
    // Wrap the component in BrowserRouter because Navbar uses <Link> tags
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Look specifically for the "Sign In" text, ignoring case sensitivity
    const signInElement = screen.getByText(/sign in/i);
    expect(signInElement).toBeInTheDocument();
  });
});
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

describe('Login Page', () => {
  test('renders login fields and button', () => {
    // render(<Login />);
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  test('shows error for invalid email', async () => {
    // render(<Login />);
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    
    // Simulate typing an invalid email
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
  });

  test('submits form with correct credentials', async () => {
    const mockLogin = jest.fn();
    // render(<Login onSubmit={mockLogin} />);
    render(<LoginForm onSubmit={mockLogin} />);

    // Fill out form using userEvent for realistic simulation
    await userEvent.type(screen.getByPlaceholderText(/Email address/i), 'kishor@example.com');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), 'password123');
    
    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith('kishor@example.com', 'password123');
  });
});

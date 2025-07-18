import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Feedback from './Feedback';

describe('Feedback', () => {
  test('renders feedback form', () => {
    render(<Feedback />);
    const inputElement = screen.getByLabelText(/Your Feedback/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('submits feedback', () => {
    render(<Feedback />);
    const inputElement = screen.getByLabelText(/Your Feedback/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(inputElement, { target: { value: 'Great job!' } });
    fireEvent.click(submitButton);

    const feedbackItem = screen.getByText(/Great job!/i);
    expect(feedbackItem).toBeInTheDocument();
  });
}); 
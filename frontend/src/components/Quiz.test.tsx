import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';

describe('Quiz', () => {
  test('renders quiz questions', () => {
    render(<Quiz />);
    const question1 = screen.getByText(/What did you learn from the video?/i);
    const question2 = screen.getByText(/How will you apply this knowledge?/i);
    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();
  });

  test('submits quiz answers', () => {
    render(<Quiz />);
    const input1 = screen.getByLabelText(/What did you learn from the video?/i);
    const input2 = screen.getByLabelText(/How will you apply this knowledge?/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(input1, { target: { value: 'Learned a lot!' } });
    fireEvent.change(input2, { target: { value: 'Apply in projects' } });
    fireEvent.click(submitButton);

    const thankYouMessage = screen.getByText(/Thank you for your responses!/i);
    expect(thankYouMessage).toBeInTheDocument();
  });
}); 
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Williams-Sonoma Coding Challenge header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Williams-Sonoma Coding Challenge/i);
  expect(linkElement).toBeInTheDocument();
});

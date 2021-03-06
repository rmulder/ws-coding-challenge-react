import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders Williams-Sonoma Coding Challenge header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Williams-Sonoma Coding Challenge/i);
  expect(linkElement).toBeInTheDocument();
});

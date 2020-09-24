import React from 'react';
import { render } from '@testing-library/react';
import Products from './products';
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

test('renders Products element', () => {
  const { getByTestId } = render(<Products />);
  const linkElement = getByTestId(/Products/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders app component', () => {
  const App = () => <div data-testid="app">App</div>;
  
  render(<App />);
  
  expect(screen.getByTestId('app')).toBeInTheDocument();
});

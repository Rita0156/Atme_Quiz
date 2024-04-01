import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/form/i);
  expect(linkElement).toBeInTheDocument();
});

test('signup with google',() => {
  render(<App/>)
  const googleName = screen.getByText(/signup with google/);
  expect(googleName).toBeInTheDocument();
});

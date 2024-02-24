import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('renders Star Wars Planets title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Star Wars Planets/i);
  expect(titleElement).toBeInTheDocument();
});

test('filters planets by name', () => {
  render(<App />);
  const input = screen.getByTestId('name-filter');
  fireEvent.change(input, { target: { value: 'Tatooine' } });
  expect(input.value).toBe('Tatooine');
});

test('clicking filter buttons', () => {
  render(<App />);
  
  // Simulando a seleção de um filtro
  fireEvent.change(screen.getByTestId('column-filter'), { target: { value: 'population' } });
  fireEvent.change(screen.getByTestId('comparison-filter'), { target: { value: 'maior que' } });
  fireEvent.change(screen.getByTestId('value-filter'), { target: { value: '1000000000' } });
  fireEvent.click(screen.getByTestId('button-filter'));

  // Verificando se o filtro foi adicionado corretamente
  const filterElement = screen.getByTestId('filter');
  expect(filterElement).toBeInTheDocument();

  // Simulando a remoção do filtro
  fireEvent.click(screen.getByTestId('button-remove-filters'));

  // Verificando se o filtro foi removido corretamente
  const removedFilterElement = screen.queryByTestId('filter');
  expect(removedFilterElement).not.toBeInTheDocument();
});

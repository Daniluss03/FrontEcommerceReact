import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardsTienda from './CardsTienda';

describe('<CardsTienda />', () => {
  test('it should mount', () => {
    render(<CardsTienda />);
    
    const cardsTienda = screen.getByTestId('CardsTienda');

    expect(cardsTienda).toBeInTheDocument();
  });
});
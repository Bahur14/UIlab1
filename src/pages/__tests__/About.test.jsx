import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true }); 

describe('Компонент About', () => {
  it('повинен рендерити логотип з правильним alt-текстом', () => {
    render(<About />);
    const logoImage = screen.getByAltText('Логотип додатка');
    expect(logoImage).toBeInTheDocument();
  });

  it('повинен відображати заголовок "Про додаток"', () => {
    render(<About />);
    const heading = screen.getByText('Про додаток');
    expect(heading).toBeInTheDocument();
  });

  it('повинен мати посилання "Повернутися", яке веде на /profile', () => {
    render(<About />);
    const linkElement = screen.getByRole('link', { name: /повернутися/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/profile');
  });
});
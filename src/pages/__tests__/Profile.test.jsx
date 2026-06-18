import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

describe('Компонент Profile', () => {
  
  it('повинен рендерити головний заголовок сторінки', () => {
    render(<Profile />);
    const heading = screen.getByText('Мій Профіль');
    expect(heading).toBeInTheDocument();
  });

  it('повинен відображати всі дані користувача у таблиці', () => {
    render(<Profile />);

    expect(screen.getByText('Користувач123')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('********')).toBeInTheDocument();
    expect(screen.getByText('Чоловіча')).toBeInTheDocument();
    expect(screen.getByText('2000-01-01')).toBeInTheDocument();

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Стать')).toBeInTheDocument();
    expect(screen.getByText('Дата народження')).toBeInTheDocument();
  });

  it('повинен мати правильні посилання для навігації', () => {
    render(<Profile />);

    const todoLink = screen.getByRole('link', { name: /список справ/i });
    const aboutLink = screen.getByRole('link', { name: /про додаток/i });

    expect(todoLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    expect(todoLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

});
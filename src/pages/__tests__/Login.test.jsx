import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

describe('Компонент Login', () => {
  
  it('повинен коректно рендерити всі елементи форми', () => {
    render(<Login />);

    expect(screen.getByText('Вхід')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /зареєструватися/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Логін (Email)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /увійти/i })).toBeInTheDocument();
  });

  it('повинен оновлювати значення полів при введенні тексту', () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Логін (Email)');
    const passwordInput = screen.getByPlaceholderText('Пароль');

    fireEvent.change(emailInput, { target: { name: 'login', value: 'test@student.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'secret123' } });

    expect(emailInput.value).toBe('test@student.com');
    expect(passwordInput.value).toBe('secret123');
  });

  it('повинен викликати alert при відправці форми', () => {

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Логін (Email)');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByRole('button', { name: /увійти/i });

    fireEvent.change(emailInput, { target: { name: 'login', value: 'test@student.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'secret123' } });

    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Спроба входу! (Дані в консолі)');

    alertMock.mockRestore();
    consoleMock.mockRestore();
  });

});
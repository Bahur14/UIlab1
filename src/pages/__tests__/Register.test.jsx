import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';

describe('Компонент Register', () => {
  
  it('повинен коректно рендерити форму та всі поля вводу', () => {
    render(<Register />);

    expect(screen.getByText('Реєстрація')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Логін (Email)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Нікнейм')).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Стать')).toBeInTheDocument(); 

    expect(screen.getByRole('button', { name: /зареєструватися/i })).toBeInTheDocument();
  });

  it('повинен оновлювати значення всіх полів при введенні даних', () => {
    render(<Register />);

    const emailInput = screen.getByPlaceholderText('Логін (Email)');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const nicknameInput = screen.getByPlaceholderText('Нікнейм');
    const sexSelect = screen.getByRole('combobox');
    
    const dateInput = document.querySelector('input[type="date"]');

    fireEvent.change(emailInput, { target: { name: 'login', value: 'newuser@student.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'securepass' } });
    fireEvent.change(nicknameInput, { target: { name: 'nickname', value: 'CoolDev' } });
    fireEvent.change(sexSelect, { target: { name: 'sex', value: 'male' } });
    fireEvent.change(dateInput, { target: { name: 'birthDate', value: '2005-10-15' } });

    expect(emailInput.value).toBe('newuser@student.com');
    expect(passwordInput.value).toBe('securepass');
    expect(nicknameInput.value).toBe('CoolDev');
    expect(sexSelect.value).toBe('male');
    expect(dateInput.value).toBe('2005-10-15');
  });

  it('повинен викликати alert при відправці заповненої форми', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Register />);

    const emailInput = screen.getByPlaceholderText('Логін (Email)');
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const nicknameInput = screen.getByPlaceholderText('Нікнейм');
    const sexSelect = screen.getByRole('combobox');
    const dateInput = document.querySelector('input[type="date"]');
    const submitButton = screen.getByRole('button', { name: /зареєструватися/i });

    fireEvent.change(emailInput, { target: { name: 'login', value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '123' } });
    fireEvent.change(nicknameInput, { target: { name: 'nickname', value: 'TestUser' } });
    fireEvent.change(sexSelect, { target: { name: 'sex', value: 'other' } });
    fireEvent.change(dateInput, { target: { name: 'birthDate', value: '2000-01-01' } });

    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Реєстрація успішна! (Дані в консолі)');

    alertMock.mockRestore();
    consoleMock.mockRestore();
  });

});
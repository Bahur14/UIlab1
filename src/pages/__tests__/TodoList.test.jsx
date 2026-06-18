import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('Компонент TodoList', () => {
  
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('повинен рендерити дефолтне завдання, якщо localStorage порожній', () => {
    render(<TodoList />);

    const defaultTasks = screen.getAllByText('Зробити лабораторну');
    expect(defaultTasks[0]).toBeInTheDocument();
  });

  it('повинен додавати нове завдання до списку', () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText('Що потрібно зробити?');
    const descInput = screen.getByPlaceholderText('Деталі...');
    const submitButton = screen.getByRole('button', { name: /додати/i });

    fireEvent.change(titleInput, { target: { name: 'title', value: 'Нове тестове завдання' } });
    fireEvent.change(descInput, { target: { name: 'description', value: 'Опис для тесту' } });

    fireEvent.click(submitButton);

    const newTasks = screen.getAllByText('Нове тестове завдання');
    expect(newTasks.length).toBeGreaterThan(0);
    
    expect(titleInput.value).toBe('');
  });

  it('повинен змінювати статус завдання на "виконано" при кліку на чекбокс', () => {
    render(<TodoList />);

    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeChecked();

    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
  });

  it('повинен видаляти завдання зі списку', () => {
    render(<TodoList />);

    const deleteButtons = screen.getAllByRole('button', { name: /видалити/i });

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('Зробити лабораторну')).not.toBeInTheDocument();

    expect(screen.getByText(/Список справ порожній/i)).toBeInTheDocument();
  });

  it('повинен зберігати дані в localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    render(<TodoList />);
    
    const titleInput = screen.getByPlaceholderText('Що потрібно зробити?');
    const submitButton = screen.getByRole('button', { name: /додати/i });

    fireEvent.change(titleInput, { target: { name: 'title', value: 'Тест LocalStorage' } });
    fireEvent.click(submitButton);

    expect(setItemSpy).toHaveBeenCalledWith('todoTasks', expect.any(String));
    
    setItemSpy.mockRestore();
  });

});
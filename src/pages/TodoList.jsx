import React, { useState, useEffect } from 'react';

export default function TodoList() {
  // Отримуємо дані з localStorage під час першого завантаження
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: 1,
        title: 'Зробити лабораторну',
        description: 'Доробити сторінку To-Do List на React',
        isCompleted: false,
        createdAt: new Date().toISOString().split('T')[0],
        dueDate: '2026-03-01'
      }
    ];
  });

  // Стан для форми додавання нового завдання
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  // Зберігаємо дані в localStorage щоразу, коли масив tasks змінюється
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Обробник змін у формі
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Додавання нового завдання
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return; 

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      isCompleted: false,
      createdAt: new Date().toISOString().split('T')[0], 
      dueDate: newTask.dueDate || 'Не вказано'
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  // Зміна статусу (виконано/не виконано)
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  // Видалення завдання
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex flex-col items-center mt-12 mb-12 relative min-h-[70vh] w-full">


      <div className="w-full max-w-5xl border-2 border-gray-800 bg-white p-2 sm:p-6 shadow-sm mt-8">
        

        <form onSubmit={addTask} className="mb-8 border-b-2 border-gray-200 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-x-4">
            <div className="w-full sm:flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Назва завдання *</label>
              <input 
                type="text" name="title" value={newTask.title} onChange={handleInputChange} required
                className="w-full border border-gray-500 p-2 focus:outline-none focus:border-blue-500 text-lg sm:text-base" placeholder="Що потрібно зробити?"
              />
            </div>
            <div className="w-full sm:flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Опис</label>
              <input 
                type="text" name="description" value={newTask.description} onChange={handleInputChange}
                className="w-full border border-gray-500 p-2 focus:outline-none focus:border-blue-500 text-lg sm:text-base" placeholder="Деталі..."
              />
            </div>
            <div className="w-full sm:w-[150px]">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">До коли виконати</label>
              <input 
                type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange}
                className="w-full border border-gray-500 p-2 focus:outline-none focus:border-blue-500 text-gray-600 text-lg sm:text-base"
              />
            </div>
            <button type="submit" className="w-full sm:w-auto border-2 border-gray-800 px-6 py-3 sm:py-2 font-semibold hover:bg-gray-100 h-[50px] sm:h-[42px] mt-2 sm:mt-0 text-lg sm:text-base">
              Додати
            </button>
          </div>
        </form>
        
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500 italic border-2 border-dashed border-gray-300">
            Список справ порожній. Додайте нове завдання!
          </div>
        ) : (
          <>
            <div className="block sm:hidden space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className={`border border-gray-800 p-4 bg-white ${task.isCompleted ? 'bg-green-50' : ''}`}>
                  <div className="flex items-start gap-3 mb-3 pb-3 border-b-2 border-dashed border-gray-100">
                    <input 
                      type="checkbox" checked={task.isCompleted} onChange={() => toggleComplete(task.id)}
                      className="w-6 h-6 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-1 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                      <p className={`text-gray-700 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-bold">Створено:</span> {task.createdAt}<br/>
                      <span className="font-bold">Дедлайн:</span> {task.dueDate}
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="text-red-600 font-bold hover:underline py-1">
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-800 text-left text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-800">
                  <tr>
                    <th className="border border-gray-800 p-3 font-bold uppercase w-12 text-center">Статус</th>
                    <th className="border border-gray-800 p-3 font-bold uppercase">Назва</th>
                    <th className="border border-gray-800 p-3 font-bold uppercase">Опис</th>
                    <th className="border border-gray-800 p-3 font-bold uppercase w-32 text-center">Створено</th>
                    <th className="border border-gray-800 p-3 font-bold uppercase w-32 text-center">Дедлайн</th>
                    <th className="border border-gray-800 p-3 font-bold uppercase w-24 text-center">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className={task.isCompleted ? 'bg-green-50' : ''}>
                      <td className="border border-gray-800 p-3 text-center">
                        <input 
                          type="checkbox" checked={task.isCompleted} onChange={() => toggleComplete(task.id)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </td>
                      <td className={`border border-gray-800 p-3 font-semibold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </td>
                      <td className={`border border-gray-800 p-3 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {task.description}
                      </td>
                      <td className="border border-gray-800 p-3 text-center text-gray-600">
                        {task.createdAt}
                      </td>
                      <td className="border border-gray-800 p-3 text-center text-gray-600">
                        {task.dueDate}
                      </td>
                      <td className="border border-gray-800 p-3 text-center">
                        <button onClick={() => deleteTask(task.id)} className="text-red-600 font-bold hover:underline">
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
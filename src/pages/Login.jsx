import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  // Стан для збереження даних форми
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  // Обробник змін у полях
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Обробник відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Дані для входу:', formData);
    alert('Спроба входу! (Дані в консолі)');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12 mb-12">
      {/* Контейнер форми */}
      <div className="w-full max-w-sm border-2 border-gray-800 bg-white shadow-lg mb-6">
        
        {/* Заголовок форми */}
        <div className="border-b-2 border-gray-800 p-3 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">Вхід</h2>
        </div>

        {/* Сама форма */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4 text-center">
          
          <input
            type="email"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Логін (Email)"
            required
            className="w-full border border-gray-500 p-2 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="w-full border border-gray-500 p-2 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Кнопка відправки форми */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="border-2 border-gray-800 px-8 py-2 font-semibold hover:bg-gray-100 transition-colors"
            >
              Увійти
            </button>
          </div>
          
        </form>
      </div>

      {/* Кнопка переходу на реєстрацію (під формою, як на макеті) */}
      <Link
        to="/register"
        className="border-2 border-gray-800 px-8 py-2 font-semibold bg-white hover:bg-gray-100 transition-colors text-center block w-max"
      >
        Зареєструватися
      </Link>
    </div>
  );
}
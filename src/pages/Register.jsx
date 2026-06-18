import React, { useState } from 'react';

export default function Register() {
  // Стан для збереження даних форми
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    nickname: '',
    sex: '',
    birthDate: ''
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
    console.log('Дані реєстрації:', formData);
    alert('Реєстрація успішна! (Дані в консолі)');
  };

  return (
    <div className="flex justify-center items-center mt-12 mb-12">
      {/* Контейнер форми */}
      <div className="w-full max-w-sm border-2 border-gray-800 bg-white shadow-lg">
        
        {/* Заголовок форми */}
        <div className="border-b-2 border-gray-800 p-3 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">Реєстрація</h2>
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

          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Нікнейм"
            required
            className="w-full border border-gray-500 p-2 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Випадаючий список для статі */}
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 p-2 text-center text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled>Стать</option>
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
            <option value="other">Інша</option>
          </select>

          {/* Поле для дати народження */}
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 p-2 text-center text-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Кнопка відправки */}
          <div className="pt-4">
            <button
              type="submit"
              className="border-2 border-gray-800 px-8 py-2 font-semibold hover:bg-gray-100 transition-colors"
            >
              Зареєструватися
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
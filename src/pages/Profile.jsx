import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  // Тимчасові дані користувача (пізніше ми підключимо їх з localStorage або Redux)
  const user = {
    nickname: "Користувач123",
    email: "test@example.com",
    password: "********",
    sex: "Чоловіча",
    birthDate: "2000-01-01"
  };

  return (
    <div className="flex flex-col items-center mt-12 mb-12">
      
      {/* Заголовок сторінки */}
      <h2 className="text-2xl font-bold uppercase mb-6 tracking-wide border-b-2 border-gray-800 pb-2">
        Мій Профіль
      </h2>

      {/* Контейнер таблиці профілю */}
      <div className="w-full max-w-md bg-white mb-8">
        <table className="w-full border-collapse border-2 border-gray-800 text-center">
          <tbody>
            {/* Нікнейм (об'єднує дві колонки) */}
            <tr>
              <td colSpan="2" className="border-2 border-gray-800 p-4 font-bold text-lg uppercase bg-gray-50">
                {user.nickname}
              </td>
            </tr>
            {/* Email та Пароль */}
            <tr>
              <td className="border-2 border-gray-800 p-4 w-1/2">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</span>
                {user.email}
              </td>
              <td className="border-2 border-gray-800 p-4 w-1/2">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Пароль</span>
                {user.password}
              </td>
            </tr>
            {/* Стать та Дата народження */}
            <tr>
              <td className="border-2 border-gray-800 p-4">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Стать</span>
                {user.sex}
              </td>
              <td className="border-2 border-gray-800 p-4">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Дата народження</span>
                {user.birthDate}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Кнопки-посилання під таблицею */}
      <div className="flex space-x-6">
        <Link
          to="/"
          className="border-2 border-gray-800 px-6 py-2 font-semibold bg-white hover:bg-gray-100 transition-colors text-center"
        >
          Список справ
        </Link>
        <Link
          to="/about"
          className="border-2 border-gray-800 px-6 py-2 font-semibold bg-white hover:bg-gray-100 transition-colors text-center"
        >
          Про додаток
        </Link>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg'; 

export default function About() {
  return (
    <div className="flex flex-col items-center mt-12 mb-12 relative">
      

      {/* Емблема додатку (Зображення Логотипу у круглому блоці) */}
      <div className="w-32 h-32 rounded-full border-2 border-gray-800 flex items-center justify-center mb-8 bg-white shadow-sm mt-8 overflow-hidden p-4">
        <img 
          src={logo} 
          alt="Логотип додатка" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Блок з коротким описом додатка */}
      <div className="w-full max-w-md border-2 border-gray-800 bg-white p-6 text-center mb-8 shadow-sm flex flex-col items-center justify-center min-h-[150px]">
        <h3 className="font-bold text-lg mb-2 uppercase border-b-2 border-gray-200 pb-2 w-full">Про додаток</h3>
        <p className="text-gray-700 mt-2">
          Це веб-додаток «Список справ» (To-Do List), розроблений в рамках лабораторної роботи з курсу "Програмування інтерфейсів користувача". Додаток дозволяє створювати, редагувати, видаляти та зручно переглядати ваші щоденні завдання.
        </p>
      </div>

      {/* Кнопка "Повернутися" */}
      <Link
        to="/profile"
        className="border-2 border-gray-800 px-8 py-2 font-semibold bg-white hover:bg-gray-100 transition-colors text-center"
      >
        Повернутися
      </Link>
      
    </div>
  );
}
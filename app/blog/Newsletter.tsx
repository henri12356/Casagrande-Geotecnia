'use client';

import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';

const SimpleNewsletter: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 max-w-lg mx-auto">
      <div className="flex items-center justify-center mb-4">
        <MdOutlineEmail className="w-8 h-8 text-blue-600 mr-2" />
        <h3 className="text-xl font-bold text-gray-800">
          Suscríbete
        </h3>
      </div>
      <p className="text-sm text-gray-500 text-center mb-4">
        Recibe las últimas noticias y guías en tu correo.
      </p>
      <form className="flex flex-col  gap-3">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform active:scale-95"
        >
          Suscribirme
        </button>
      </form>
    </div>
  );
};

export default SimpleNewsletter;
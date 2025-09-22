// src/components/SatisfactionForm.tsx

'use client';

import { useState, FormEvent } from 'react';


export default function SatisfactionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [comment, setComment] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const satisfactionLevels = [
    { value: '1', label: 'Muy Insatisfecho' },
    { value: '2', label: 'Insatisfecho' },
    { value: '3', label: 'Neutral' },
    { value: '4', label: 'Satisfecho' },
    { value: '5', label: 'Muy Satisfecho' },
    { value: '6', label: 'Excelente' },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, satisfaction, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo salió mal');
      }

      // Éxito
      setMessage('¡Gracias! Tu respuesta ha sido enviada.');
      setName('');
      setEmail('');
      setSatisfaction('');
      setComment('');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
      setMessage(`Error al enviar: ${errorMessage}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
   

  
    <div className="max-w-2xl mx-auto p-8 bg-slate-900 rounded-lg shadow-xl text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Formulario de Satisfacción</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre y Correo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Nivel de Satisfacción */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Nivel de Satisfacción con el Servicio
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {satisfactionLevels.map((level) => (
              <label key={level.value} className={`cursor-pointer p-3 rounded-md border-2 transition-all ${satisfaction === level.value ? 'bg-cyan-600 border-cyan-400' : 'bg-slate-800 border-slate-700 hover:border-cyan-500'}`}>
                <input
                  type="radio"
                  name="satisfaction"
                  value={level.value}
                  checked={satisfaction === level.value}
                  onChange={(e) => setSatisfaction(e.target.value)}
                  className="sr-only" // Ocultamos el radio button real
                  required
                />
                <span className="block text-xl font-bold">{level.value}</span>
                <span className="block text-xs">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comentario */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-2">
            Comentarios (Opcional)
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>
        </div>

        {/* Botón de Enviar y Mensajes */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-all disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Enviando...' : 'Enviar Respuesta'}
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-center text-sm ${isError ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
    </>
  );
}
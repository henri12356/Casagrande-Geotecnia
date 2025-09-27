// src/hooks/useIsDesktop.ts

import { useState, useEffect } from 'react';

// El breakpoint 'lg' de Tailwind es 1024px.
const DESKTOP_BREAKPOINT = 1024;

/**
 * Hook para determinar si el viewport actual es de escritorio (>= 1024px).
 * Devuelve 'false' en el servidor para evitar errores de SSR.
 */
export const useIsDesktop = () => {
  // Inicializamos en 'false' en el servidor (SSR)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Esta función solo se ejecuta en el cliente (navegador)
    const checkIsDesktop = () => {
      // Es seguro acceder a window.innerWidth aquí
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    // 1. Ejecutar al montar (para establecer el valor inicial)
    checkIsDesktop();

    // 2. Escuchar el evento de redimensionamiento
    window.addEventListener('resize', checkIsDesktop);

    // 3. Limpieza: eliminar el listener
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
};
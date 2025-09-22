'use client';

import { motion, useInView, animate, Variants } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

// Componente para animar el conteo de un número
const CountingNumber: React.FC<{ value: number; duration?: number; suffix?: string; start?: boolean }> = ({ 
  value, 
  duration = 2, 
  suffix = '', 
  start = false
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node && start) {
      const controller = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          node.textContent = Math.round(latest).toLocaleString() + suffix;
        },
      });
      return () => controller.stop();
    }
  }, [value, duration, suffix, start]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const Numeros = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.3 });

  const stats = [
    { id: 1, label: 'AÑOS DE EXPERIENCIA', value: 15, suffix: '+' },
    { id: 2, label: 'TRABAJOS REALIZADOS', value: 600, suffix: '+' },
    { id: 3, label: 'CLIENTES SATISFECHOS', value: 500, suffix: '+' },
    { id: 4, label: 'PROYECTOS EN CURSO', value: 25, suffix: '+' },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const statCardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 18,
      },
    },
  };

  return (
    <section className=" py-20 sm:py-28 px-6 relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        animate={isInViewContainer ? "visible" : "hidden"}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            className="flex flex-col items-center justify-center p-6 bg-[#1b4772] rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            variants={statCardVariants}
          >
            <div
              className="text-6xl sm:text-7xl font-extrabold mb-4 bg-gradient-to-r text-white bg-clip-text "
            >
              <CountingNumber 
                value={stat.value} 
                suffix={stat.suffix} 
                duration={2} 
                start={isInViewContainer} 
              />
            </div>
            <p className="text-sm sm:text-base text-white uppercase tracking-wide font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Numeros;

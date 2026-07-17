"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import React, { useEffect, useRef } from "react";

interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  {
    id: 1,
    label: "AÑOS DE EXPERIENCIA",
    value: 6,
    suffix: "+",
  },
  {
    id: 2,
    label: "TRABAJOS REALIZADOS",
    value: 600,
    suffix: "+",
  },
  {
    id: 3,
    label: "CLIENTES SATISFECHOS",
    value: 500,
    suffix: "+",
  },
  {
    id: 4,
    label: "PROYECTOS EN CURSO",
    value: 5,
    suffix: "+",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const statCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const CountingNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  start?: boolean;
}> = ({
  value,
  duration = 2.5,
  suffix = "",
  start = false,
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;

    if (!node || !start) return;

    const controller = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent =
          Math.round(latest).toLocaleString("es-PE") + suffix;
      },
    });

    return () => controller.stop();
  }, [value, duration, suffix, start]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const Numeros = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const isInViewContainer = useInView(containerRef, {
    once: true,
    amount: 0.25,
  });

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        ref={containerRef}
        variants={sectionVariants}
        initial={reduceMotion ? false : "hidden"}
        animate={
          reduceMotion
            ? undefined
            : isInViewContainer
              ? "visible"
              : "hidden"
        }
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={statCardVariants}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -6,
                  }
            }
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="
              group relative flex min-h-[190px]
              flex-col items-center justify-center
              overflow-hidden rounded-2xl
              bg-[#182C45] p-6
              shadow-[0_14px_34px_rgba(24,44,69,0.15)]
              transition-shadow duration-300
              hover:shadow-[0_22px_48px_rgba(24,44,69,0.24)]
            "
          >
            <motion.span
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={
                isInViewContainer
                  ? {
                      scaleX: 1,
                    }
                  : {
                      scaleX: 0,
                    }
              }
              transition={{
                duration: 0.7,
                delay: 0.2 + stat.id * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute inset-x-0 top-0 h-1
                origin-left bg-[#C9A66B]
              "
            />

            <div
              className="
                text-5xl font-black leading-none
                tracking-[-0.04em] text-[#C9A66B]
                sm:text-6xl lg:text-7xl
              "
            >
              <CountingNumber
                value={stat.value}
                suffix={stat.suffix}
                duration={3}
                start={isInViewContainer}
              />
            </div>

            <div className="my-5 h-px w-10 bg-white/20 transition-all duration-300 group-hover:w-16 group-hover:bg-[#C9A66B]/70" />

            <p
              className="
                text-xs font-bold uppercase
                leading-5 tracking-[0.1em]
                text-white/90 sm:text-sm
              "
            >
              {stat.label}
            </p>

            <span
              aria-hidden="true"
              className="
                absolute -bottom-14 -right-14
                h-32 w-32 rounded-full
                bg-[#C9A66B]/5
                transition-transform duration-500
                group-hover:scale-125
              "
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Numeros;
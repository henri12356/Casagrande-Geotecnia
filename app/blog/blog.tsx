"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/app/data/blogs.json";
import categoriesData from "@/app/data/categories.json";
import { Blog, Category } from "@/app/types/blog";

const allBlogs: Blog[] = blogsData;
const categories: Category[] = categoriesData;

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(categories[0]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-slate-50 pt-28">Cargando...</div>;

  // Blogs de la categoría activa (para el hero)
  const heroBlogs = activeCategory
    ? allBlogs.filter((b) => b.categoria.toLowerCase() === activeCategory.nombre.toLowerCase())
    : [];

  const mainHero = heroBlogs[0];
  const sideHero = heroBlogs.slice(1, 3);

  // 🔑 Función segura para mostrar contenido
  const renderContenido = (contenido: Blog["contenido"]) => {
    if (typeof contenido === "string") {
      return contenido;
    }
    // si es array, muestro el primer texto
    return contenido[0]?.texto ?? "";
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* ================= HERO DESTACADO ================= */}
        {activeCategory && mainHero && (
          <section>
            {/* Botones de categorías */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    activeCategory.id === cat.id
                      ? `${cat.color} text-white shadow`
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>

            {/* Hero layout */}
            <div className="grid lg:grid-cols-3 gap-8 mb-6">
              {/* Blog principal */}
              <Link
                href={`/blog/${mainHero.slug}`}
                className="relative lg:col-span-2 h-96 rounded-2xl overflow-hidden group shadow-lg"
              >
                <Image
                  src={mainHero.imagen}
                  alt={mainHero.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-sm uppercase tracking-wide">{activeCategory.nombre}</span>
                  <h2 className="text-3xl font-bold mb-2">{mainHero.titulo}</h2>
                  <p className="line-clamp-2 text-gray-200">{renderContenido(mainHero.contenido)}</p>
                </div>
              </Link>

              {/* Blogs secundarios */}
              <div className="space-y-6">
                {sideHero.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blog/${blog.slug}`}
                    className="flex items-center gap-4 rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition"
                  >
                    <div className="relative w-32 h-28 flex-shrink-0">
                      <Image src={blog.imagen} alt={blog.titulo} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{blog.titulo}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {renderContenido(blog.contenido)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Botón ver más de la categoría activa */}
            <div className="flex justify-end">
              <Link
                href={`/blog/categoria/${activeCategory.id}`}
                className="inline-block px-6 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Ver más →
              </Link>
            </div>
          </section>
        )}

        {/* ================= LISTA DE CATEGORÍAS ================= */}
        {categories.map((category) => {
          const blogsByCategory = allBlogs
            .filter((blog) => blog.categoria.toLowerCase() === category.nombre.toLowerCase())
            .slice(0, 4); // máximo 4 artículos

          if (blogsByCategory.length === 0) return null;

          return (
            <section key={category.id} className="border-t pt-12">
              {/* Encabezado de categoría */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <span className={`${category.color} w-3 h-3 rounded-full`} />
                  {category.nombre}
                </h2>
                <Link
                  href={`/blog/categoria/${category.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Ver más →
                </Link>
              </div>

              {/* Grid vertical */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {blogsByCategory.map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blog/${blog.slug}`}
                    className="bg-white border border-slate-200 rounded-xl shadow hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative h-48 w-full">
                      <Image src={blog.imagen} alt={blog.titulo} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(blog.fecha).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {blog.titulo}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {renderContenido(blog.contenido)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

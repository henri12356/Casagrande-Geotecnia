// src/app/blog/page.tsx
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
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    categories[0]
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen bg-slate-50 pt-28 flex items-center justify-center"
        aria-live="polite"
        aria-label="Cargando contenido del blog"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b4772] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando artículos técnicos...</p>
        </div>
      </div>
    );
  }

  const getBlogsByCategory = (category: Category) => {
    return allBlogs.filter(
      (blog) => blog.categoria.toLowerCase() === category.nombre.toLowerCase()
    );
  };

  const heroBlogs = activeCategory ? getBlogsByCategory(activeCategory) : [];
  const mainHero = heroBlogs[0];
  const relatedBlogs = heroBlogs.slice(1, 4);

  const renderContenido = (contenido: Blog["contenido"]): string => {
    if (typeof contenido === "string") return contenido;

    const firstText = contenido.find((section) => section.texto)?.texto;
    return firstText || "";
  };

  const getCategoryDescription = (category: Category): string => {
    const descriptions: Record<string, string> = {
      Tendencias:
        "Últimas tendencias y novedades en ingeniería civil y geotecnia",
      Formación:
        "Guías formativas y tutoriales para profesionales de la construcción",
      Eventos: "Eventos, conferencias y capacitaciones del sector ingeniería",
      Publicaciones: "Publicaciones técnicas y estudios especializados",
      Artistas: "Perfiles de profesionales destacados en ingeniería",
    };

    return (
      descriptions[category.nombre] ||
      `Artículos sobre ${category.nombre} en ingeniería civil`
    );
  };

  return (
    <div className="min-h-72 bg-slate-50 pt-16 md:pt-28">
      {/* Schema Structured Data para Blog Listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Blog de Ingeniería Civil - Casagrande Geotecnia",
            description:
              "Artículos técnicos especializados en geotecnia, estudios de suelos y construcción",
            url: "https://www.casagrandegeotecnia.com/blog",
            numberOfItems: allBlogs.length,
            itemListElement: allBlogs.slice(0, 10).map((blog, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Article",
                headline: blog.titulo,
                description: blog.extracto,
                url: `https://www.casagrandegeotecnia.com/blog/${blog.slug}`,
                datePublished: blog.fecha,
                author: {
                  "@type": "Person",
                  name: blog.autor?.nombre || "Casagrande Geotecnia",
                },
              },
            })),
          }),
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* ================= HERO & RELATED BLOGS SECTION ================= */}
        {activeCategory && mainHero && (
          <section aria-labelledby="categoria-actual" className="space-y-8">
            <nav aria-label="Categorías del blog">
              <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                      activeCategory.id === cat.id
                        ? `${cat.color} text-white shadow-lg transform scale-105`
                        : "bg-gray-100 text-slate-950 hover:bg-[#1b4772] hover:text-white"
                    }`}
                    aria-current={
                      activeCategory.id === cat.id ? "page" : undefined
                    }
                    aria-label={`Ver artículos de ${cat.nombre}`}
                  >
                    {cat.nombre}
                  </button>
                ))}
              </div>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8 mb-6">
              {/* Artículo Principal (Columna Izquierda) */}
              <article className="relative lg:col-span-2">
                <Link
                  href={`/blog/${mainHero.slug}`}
                  className="block rounded-2xl overflow-hidden group  relative"
                  aria-label={`Leer artículo: ${mainHero.titulo}`}
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={mainHero.imagen}
                      alt={mainHero.titulo}
                      width={1200} // ajusta según tu imagen real
                      height={700}
                      fetchPriority="high"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-auto"
                      priority 
                    />
                  </div>
                  <div className="p-2 md:p-6">  
                    <span
                      className="text-sm uppercase tracking-wide font-semibold bg-[#1b4772] text-white px-3 py-1 rounded-full inline-block mb-3"
                      aria-label={`Categoría: ${activeCategory.nombre}`}
                    >
                      {activeCategory.nombre}
                    </span>
                    <h1
                      className="text-3xl font-bold mb-3 leading-tight text-slate-800"
                      id="categoria-actual"
                    >
                      {mainHero.titulo}
                    </h1>
                    <p className="text-slate-900 line-clamp-3 text-lg leading-relaxed">
                      {mainHero.extracto || renderContenido(mainHero.contenido)}
                    </p>
                    <time
                      className="text-sm text-sky-900 mt-4 block"
                      dateTime={mainHero.fecha}
                    >
                      {new Date(mainHero.fecha).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </article>

              {/* Blogs Relacionados (Columna Derecha) */}
              <aside aria-label="Artículos relacionados" className="space-y-2">
                <h2 className="text-xl font-bold text-slate-800">
                  Artículos relacionados
                </h2>
                {relatedBlogs.length > 0 ? (
                  relatedBlogs.map((blog) => (
                    <article key={blog.slug}>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="flex items-start gap-4 rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-all duration-300 group"
                        aria-label={`Leer artículo: ${blog.titulo}`}
                      >
                        <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100">
                          <Image
                            src={blog.imagen}
                            alt={blog.titulo}
                            width={400}
                            height={280}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="128px"
                          />
                        </div>

                        <div className="p-3 flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-[#3e6e9f] transition-colors text-sm leading-tight mb-1">
                            {blog.titulo}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {blog.extracto || renderContenido(blog.contenido)}
                          </p>
                          <time
                            className="text-xs text-gray-400 mt-1 block"
                            dateTime={blog.fecha}
                          >
                            {new Date(blog.fecha).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                            })}
                          </time>
                        </div>
                      </Link>
                    </article>
                  ))
                ) : (
                  <p className="text-slate-900">
                    No hay más artículos en esta categoría.
                  </p>
                )}
                <div className="flex md:justify-end pt-8 md:pt-20">
                  <Link
                    href={`/blog/categoria/${activeCategory.id}`}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-[#1b4772] text-white font-semibold hover:bg-blue-700 transition-colors duration-300 group"
                    aria-label={`Ver todos los artículos de ${activeCategory.nombre}`}
                  >
                    Ver más artículos de {activeCategory.nombre}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        )}

        {/* ================= LISTA DE TODAS LAS CATEGORÍAS ================= */}
        {categories.map((category) => {
          const blogsByCategory = getBlogsByCategory(category).slice(0, 4);
          if (blogsByCategory.length === 0) return null;

          return (
            <section
              key={category.id}
              className="border-t pt-12"
              aria-labelledby={`categoria-${category.id}`}
            >
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h2
                    id={`categoria-${category.id}`}
                    className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-2"
                  >
                    <span
                      className={`${category.color} w-3 h-3 bg-[#1b4772] rounded-full`}
                      aria-hidden="true"
                    />
                    {category.nombre}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {getCategoryDescription(category)}
                  </p>
                </div>
                <Link
                  href={`/blog/categoria/${category.id}`}
                  className="text-[#1b4772] font-semibold hover:underline flex items-center gap-1"
                  aria-label={`Explorar más artículos de ${category.nombre}`}
                >
                  Ver más
                  <span aria-hidden="true">→</span>
                </Link>
              </header>

              <div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                role="list"
                aria-label={`Artículos de ${category.nombre}`}
              >
                {blogsByCategory.map((blog) => (
                  <article
                    key={blog.slug}
                    className="bg-white border border-slate-200 rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden group"
                    role="listitem"
                  >
                    <Link href={`/blog/${blog.slug}`} className="block h-full">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={blog.imagen}
                          alt={blog.titulo}
                          width={400}
                          height={280}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className="flex items-center text-center text-sm font-medium text-white bg-[#1b4772] px-2 py-1 rounded-full"
                            aria-label={`Categoría: ${blog.categoria}`}
                          >
                            {blog.categoria}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col justify-between h-auto">
                        <div>
                          <time
                            className="text-xs text-gray-500 mb-2 block"
                            dateTime={blog.fecha}
                          >
                            {new Date(blog.fecha).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-[#3872ac] transition-colors leading-tight">
                            {blog.titulo}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                            {blog.extracto || renderContenido(blog.contenido)}
                          </p>
                        </div>
                        {blog.autor && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              Por {blog.autor.nombre}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/app/data/blogs.json";
import categoriesData from "@/app/data/categories.json";
import { Blog, Category } from "@/app/types/blog";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import {
  FaArrowLeft,
  FaRegClock,
  FaTag,
  FaHome,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import NotFoundPage from "@/app/not-found";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = use(params);

  const currentBlog = blogsData.find((b: Blog) => b.slug === slug);

  if (!currentBlog) {
    return (
      <NotFoundPage />
    );
  }

  const relatedBlogs = blogsData
    .filter((b) => currentBlog.relacionados?.includes(b.slug))
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-28">
        <main className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-12">
          {/* Índice lateral */}
          <aside className="hidden xl:block xl:col-span-2 sticky top-28 self-start">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Contenido
              </h3>
              <ul className="space-y-2 text-sm">
                {Array.isArray(currentBlog.contenido) &&
                  currentBlog.contenido.map((section, index) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        className="text-blue-600 hover:underline"
                      >
                        {section.titulo}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="lg:col-span-7 space-y-10">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 flex items-center gap-2">
              <Link href="/" className="flex items-center gap-1 hover:underline">
                <FaHome /> Inicio
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-800 font-medium line-clamp-1">
                {currentBlog.titulo}
              </span>
            </nav>

            {/* Hero */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-snug">
                {currentBlog.titulo}
              </h1>
              {currentBlog.subtitulo && (
                <h2 className="text-lg md:text-xl text-gray-600 mb-6">
                  {currentBlog.subtitulo}
                </h2>
              )}
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
                <span className="flex items-center gap-1">
                  <FaTag className="text-blue-600" /> {currentBlog.categoria}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegClock />{" "}
                  {new Date(currentBlog.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="relative w-full h-[380px] md:h-[480px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={currentBlog.imagen}
                  alt={currentBlog.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Contenido */}
            <article className="space-y-12">
              {Array.isArray(currentBlog.contenido) ? (
                currentBlog.contenido.map((section, index) => (
                  <div
                    key={index}
                    id={`section-${index}`}
                    className="space-y-6 scroll-mt-28"
                  >
                    {section.titulo && (
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {section.titulo}
                      </h2>
                    )}
                    {section.texto && (
                      <div className="prose prose-lg max-w-none text-gray-800">
                        <ReactMarkdown>{section.texto}</ReactMarkdown>
                      </div>
                    )}
                    {section.imagen && (
                      <div className="relative w-full h-72 rounded-xl overflow-hidden shadow">
                        <Image
                          src={section.imagen}
                          alt={section.titulo ?? "Imagen de sección"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="prose prose-lg max-w-none text-gray-800">
                  <ReactMarkdown>{currentBlog.contenido as string}</ReactMarkdown>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8">
            {currentBlog.autor && (
              <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-center">
                <Image
                  src={currentBlog.autor.avatar}
                  alt={currentBlog.autor.nombre}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{currentBlog.autor.nombre}</h3>
                  <p className="text-sm text-gray-500">
                    {currentBlog.autor.cargo}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FaUsers /> Únete a la comunidad
              </h3>
              <p className="text-sm mb-4">
                Forma parte de nuestra red y mantente actualizado con lo último
                en ingeniería y construcción.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-200 transition">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="hover:text-gray-200 transition">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </aside>
        </main>

        {/* Noticias relacionadas */}
        {relatedBlogs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 mb-16">
            <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
              Noticias relacionadas
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedBlogs.map((relatedBlog: Blog) => (
                <Link key={relatedBlog.slug} href={`/blog/${relatedBlog.slug}`}>
                  <div className="flex flex-col rounded-xl overflow-hidden bg-white border hover:shadow-lg hover:scale-[1.02] transition">
                    <div className="relative w-full h-44">
                      <Image
                        src={relatedBlog.imagen}
                        alt={relatedBlog.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedBlog.titulo}
                      </h3>
                      {relatedBlog.extracto && (
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {relatedBlog.extracto}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Categorías */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Explora por categorías
            </h2>
            <div className="flex flex-wrap gap-3">
              {categoriesData.map((cat: Category) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.id}`}
                  className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-white transition"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  {cat.nombre}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Redes sociales */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Síguenos en nuestras redes
          </h2>
          <p className="text-sm mb-6 max-w-2xl mx-auto">
            Comparte este artículo y mantente al día con nuestras últimas
            publicaciones.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gray-200 transition">
              <FaFacebook size={28} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaTwitter size={28} />
            </a>
            <a href="#" className="hover:text-gray-200 transition">
              <FaLinkedin size={28} />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

/* eslint-disable react-hooks/rules-of-hooks */
// src/app/blog/[slug]/page.tsx
"use client";

import React, { use, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/app/data/blogs.json";
import categoriesData from "@/app/data/categories.json";
import { Blog, Category } from "@/app/types/blog";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import {
  FaRegClock,
  FaTag,
  FaHome,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import NotFoundPage from "@/app/not-found";
import Head from "next/head";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = use(params);
  const currentBlog = blogsData.find((b: Blog) => b.slug === slug);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  const openImageModal = (imageUrl: string, imageAlt: string) => {
    setModalImageUrl(imageUrl);
    setModalImageAlt(imageAlt);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setModalImageUrl("");
    setModalImageAlt("");
  };

  if (!currentBlog) return <NotFoundPage />;

  // Función mejorada para encontrar blogs relacionados
  const relatedBlogs = useMemo(() => {
    if (!currentBlog) return [];

    return blogsData
      .filter((blog) => blog.slug !== currentBlog.slug)
      .map((blog) => {
        let score = 0;

        // Puntos por categoría coincidente
        if (blog.categoria === currentBlog.categoria) {
          score += 3;
        }

        // Puntos por tags comunes
        const commonTags = blog.tags.filter((tag) =>
          currentBlog.tags.includes(tag)
        ).length;
        score += commonTags * 2;

        // Puntos por palabras clave similares en el título
        const currentTitleWords = currentBlog.titulo.toLowerCase().split(/\s+/);
        const blogTitleWords = blog.titulo.toLowerCase().split(/\s+/);
        const commonWords = currentTitleWords.filter(
          (word) => blogTitleWords.includes(word) && word.length > 3
        ).length;
        score += commonWords;

        return { ...blog, score };
      })
      .filter((blog) => blog.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBlog, blogsData]);

  const pageUrl = `https://www.clubdeingeniero.com/blog/${currentBlog.slug}`;
  const pageTitle = `${currentBlog.titulo} | Blog de Casagrande`;
  const pageDescription =
    currentBlog.extracto ||
    currentBlog.subtitulo ||
    "Artículo de ingeniería civil y geotecnia en Perú";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={currentBlog.imagen} />
      </Head>

      <Navbar />

      {/* Hero Section de ancho completo */}
      <section className="relative w-full h-[50vh] md:h-[80vh] flex items-end justify-center pt-28">
        <Image
          src={currentBlog.imagen}
          alt={`Imagen de portada del artículo: ${currentBlog.titulo}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 "></div>

        <div className="relative z-10 text-center text-white p-2 pb-16 md:pb-40 max-w-4xl">
          <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4 drop-shadow-md">
            {currentBlog.titulo}
          </h1>
          {currentBlog.subtitulo && (
            <h2 className="text-xl md:text-2xl font-light drop-shadow-md">
              {currentBlog.subtitulo}
            </h2>
          )}
        </div>
      </section>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-[1500px] mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar índice - Columna izquierda */}
          <aside className="hidden xl:block xl:col-span-2">
            <nav className="bg-white rounded-xl shadow p-6 sticky top-28 self-start">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Contenido
              </h3>
              <ul className="space-y-2 text-md">
                {Array.isArray(currentBlog.contenido) &&
                  currentBlog.contenido.map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="text-[#1b4772] hover:underline"
                      >
                        {section.titulo}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>

          {/* Contenido principal - Columna central */}
          <div className="lg:col-span-7 space-y-10">
            {/* Breadcrumb y Metadatos */}
            <div className="space-y-4">
             
              <div className="flex flex-wrap items-center gap-4 text-lg text-[#1b4772]">
                <span className="flex items-center gap-1 font-black text-2xl">
                  <div className="text-[#1b4772] "  /> {currentBlog.categoria}
                </span>
                <span className="flex items-center gap-1 font-black">
                  
                  <time dateTime={new Date(currentBlog.fecha).toISOString()}>
                    {new Date(currentBlog.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
              </div>
            </div>

            {/* Contenido del blog */}
            <article className="space-y-12">
              {Array.isArray(currentBlog.contenido) ? (
                currentBlog.contenido.map((section, idx) => (
                  <section
                    key={idx}
                    id={`section-${idx}`}
                    className="space-y-6 scroll-mt-28"
                  >
                    {section.titulo && (
                      <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                        {section.titulo}
                      </h2>
                    )}
                    {section.texto && (
                      <div className="prose prose-xl text-lg max-w-none text-gray-800">
                        <ReactMarkdown>{section.texto}</ReactMarkdown>
                      </div>
                    )}
                    {section.imagen && (
                      <div className="relative w-full max-w-xl h-auto min-h-[100px] cursor-pointer">
                        <div
                          className="relative w-full h-auto min-h-[100px]"
                          onClick={() =>
                            openImageModal(
                              section.imagen!,
                              section.titulo ?? "Imagen de sección"
                            )
                          }
                        >
                          <Image
                            src={section.imagen!}
                            alt={section.titulo ?? "Imagen de sección"}
                            width={400}
                            height={250}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </section>
                ))
              ) : (
                <div className="prose prose-xl max-w-none text-gray-800">
                  <ReactMarkdown>
                    {currentBlog.contenido as string}
                  </ReactMarkdown>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar DERECHO - Columna derecha */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="sticky top-28 space-y-8">
              {currentBlog.autor && (
                <div className=" rounded-xl shadow p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <Image
                    src={currentBlog.autor.avatar}
                    alt={currentBlog.autor.nombre}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg">
                      {currentBlog.autor.nombre}
                    </h3>
                    <p className="text-base text-gray-500">
                      {currentBlog.autor.cargo}
                    </p>
                  </div>
                </div>
              )}

              {relatedBlogs.length > 0 && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Artículos relacionados
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.slice(0, 3).map((blog) => (
                      <Link
                        key={blog.slug}
                        href={`/blog/${blog.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3 items-start">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={blog.imagen}
                              alt={blog.titulo}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {blog.titulo}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {blog.categoria}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <FaUsers /> Únete a la comunidad
                </h3>
                <p className="text-base mb-4">
                  Forma parte de nuestra red y mantente actualizado con lo
                  último en ingeniería y construcción.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-gray-200">
                    <FaFacebook size={24} />
                  </a>
                  <a href="#" className="hover:text-gray-200">
                    <FaTwitter size={24} />
                  </a>
                  <a href="#" className="hover:text-gray-200">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <section className="bg-blue-600 text-white rounded-xl p-8 my-12 text-center max-w-4xl mx-auto shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            ¿Quieres aprender más sobre Geotecnia?
          </h2>
          <p className="text-lg mb-6">
            Explora nuestros artículos relacionados y mejora tus conocimientos
            en ingeniería civil, cimentaciones, taludes y proyectos de
            construcción seguros.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Ver todos los artículos
          </Link>
        </section>

        {/* Sección de categorías */}
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
                  className="px-4 py-2 rounded-full text-base font-medium border hover:bg-white transition"
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
          <p className="text-base mb-6 max-w-2xl mx-auto">
            Comparte este artículo y mantente al día con nuestras últimas
            publicaciones.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gray-200">
              <FaFacebook size={28} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaTwitter size={28} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaLinkedin size={28} />
            </a>
          </div>
        </section>
      </main>
      <Footer />

      {/* JSON-LD completo para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": pageUrl,
            },
            headline: currentBlog.titulo,
            alternativeHeadline: currentBlog.subtitulo || currentBlog.titulo,
            image: [currentBlog.imagen],
            author: {
              "@type": "Person",
              name: currentBlog.autor?.nombre || "Autor",
            },
            editor: currentBlog.autor?.nombre || "Editor",
            genre: currentBlog.categoria,
            keywords: currentBlog.tags.join(", "),
            wordcount: Array.isArray(currentBlog.contenido)
              ? currentBlog.contenido.reduce(
                  (acc, s) => acc + (s.texto?.split(" ").length || 0),
                  0
                )
              : (currentBlog.contenido as string).split(" ").length,
            publisher: {
              "@type": "Organization",
              name: "Casagrande",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            url: pageUrl,
            datePublished: currentBlog.fecha,
            dateModified: currentBlog.fecha,
            description: pageDescription,
          }),
        }}
      />

      {/* Modal de imagen mejorado */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-6xl max-h-[95vh] w-full h-full rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-gray-800 bg-opacity-70 rounded-full"
              aria-label="Cerrar imagen"
            >
              <FaTimes size={24} />
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={modalImageUrl}
                alt={modalImageAlt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>
            {modalImageAlt && (
              <p className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-base text-center text-white">
                {modalImageAlt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
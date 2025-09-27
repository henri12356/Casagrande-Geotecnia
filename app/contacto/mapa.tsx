/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// PASO 1: Asegúrate de que 'use' esté importado desde React
import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import {
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";

import blogsData from "@/app/data/blogs.json";
import { Blog } from "@/app/types/blog";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";
import NotFoundPage from "@/app/not-found";

// PASO 2: Actualiza el tipado de 'params' a una Promesa
interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  // PASO 3: Utiliza use() para acceder al valor de la promesa
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

  const relatedBlogs = useMemo(() => {
    if (!currentBlog) return [];

    return blogsData
      .filter((blog) => blog.slug !== currentBlog.slug)
      .map((blog) => {
        let score = 0;
        if (blog.categoria === currentBlog.categoria) {
          score += 3;
        }
        const commonTags = blog.tags.filter((tag) =>
          currentBlog.tags.includes(tag)
        ).length;
        score += commonTags * 2;
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
  }, [currentBlog]);

  if (!currentBlog) return <NotFoundPage />;

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

      {/* El resto del código JSX no necesita cambios */}
      {/* ... (pega aquí todo tu JSX desde <section> hasta el final) ... */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={currentBlog.imagen}
          alt={`Imagen de portada del artículo: ${currentBlog.titulo}`}
          fill
          priority
          className="object-cover object-center scale-105 blur-[2px] brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b4772]/90 via-[#1b4772]/60 to-transparent"></div>
        <div className="relative z-10 max-w-5xl pt-20 md:pt-32 text-center text-white px-4">
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            {currentBlog.titulo}
          </h1>
          {currentBlog.subtitulo && (
            <h2 className="text-lg md:text-2xl font-semibold text-white drop-shadow-md">
              {currentBlog.subtitulo}
            </h2>
          )}
        </div>
      </section>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-[1500px] mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="hidden xl:block xl:col-span-2">
            <nav className="bg-white rounded-xl shadow p-6 sticky top-40 self-start">
              <h3 className="text-xl font-semibold mb-4 text-[#1b4772]">
                Contenido
              </h3>
              <ul className="space-y-2 text-md">
                {Array.isArray(currentBlog.contenido) &&
                  currentBlog.contenido.map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="text-slate-900 hover:underline"
                      >
                        {section.titulo}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-lg text-[#1b4772]">
                <span className="flex items-center gap-1 font-semibold text-2xl">
                  <div className="text-[#1b4772]" /> {currentBlog.categoria}
                </span>
                <span className="flex items-center gap-1 font-semi">
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

            <article className="space-y-12">
              {Array.isArray(currentBlog.contenido) ? (
                currentBlog.contenido.map((section, idx) => (
                  <section
                    key={idx}
                    id={`section-${idx}`}
                    className="space-y-6 scroll-mt-32"
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

          <aside className="lg:col-span-3 space-y-8">
            <div className="sticky top-40 space-y-8">
              {currentBlog.autor && (
                <div className="rounded-xl shadow p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
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
                  <h3 className="text-xl font-semibold mb-4 text-[#1b4772]">
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
                            <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-[#1b4772] transition-colors">
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

              <div className="bg-gradient-to-br from-[#1b4772] to-[#1b4772] text-white rounded-xl p-6">
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

        <section className="bg-[#1b4772] text-white rounded-xl p-8 my-12 text-center max-w-4xl mx-auto shadow-lg">
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
            className="inline-block bg-white text-[#1b4772] font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Ver todos los artículos
          </Link>
        </section>

        <section className="bg-gradient-to-r from-[#1b4772] to-[#1b4772] text-white py-16 text-center">
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
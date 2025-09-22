import blogsData from "@/app/data/blogs.json";
import categoriesData from "@/app/data/categories.json";
import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import NotFoundPage from "@/app/not-found";
import { Blog, Category } from "@/app/types/blog";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

// Helper para renderizar contenido
const renderContenido = (contenido: Blog["contenido"]) => {
  if (typeof contenido === "string") return contenido;
  return contenido[0]?.texto ?? "";
};

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;

  const categoria: Category | undefined = categoriesData.find(
    (c: Category) => c.id.toLowerCase() === slug.toLowerCase()
  );

  if (!categoria) {
    return (
      <NotFoundPage />
    );
  }

  const blogs = blogsData.filter(
    (b: Blog) => b.categoria.toLowerCase() === categoria.nombre.toLowerCase()
  );

  if (blogs.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12">{categoria.nombre}</h1>
        <p>No hay artículos todavía en esta categoría.</p>
      </main>
    );
  }

  const mainBlog = blogs[0];
  const sideBlogs = blogs.slice(1, 3);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero */}
        <h1 className="text-4xl font-bold mb-12 flex items-center gap-2">
          <span className={`${categoria.color} w-4 h-4 rounded-full`} />
          {categoria.nombre}
        </h1>

        <section className="grid lg:grid-cols-3 gap-8 mb-16">
          <Link
            href={`/blog/${mainBlog.slug}`}
            className="relative lg:col-span-2 h-96 rounded-2xl overflow-hidden group shadow-lg"
          >
            <Image
              src={mainBlog.imagen}
              alt={mainBlog.titulo}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold">{mainBlog.titulo}</h2>
              <p className="line-clamp-2">{renderContenido(mainBlog.contenido)}</p>
            </div>
          </Link>

          <div className="space-y-6">
            {sideBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="flex items-center gap-4 rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition"
              >
                <div className="relative w-32 h-28 flex-shrink-0">
                  <Image
                    src={blog.imagen}
                    alt={blog.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold line-clamp-2">{blog.titulo}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {renderContenido(blog.contenido)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Grid más artículos */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Más artículos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(3).map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="bg-white border rounded-xl shadow overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.imagen}
                    alt={blog.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {blog.titulo}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

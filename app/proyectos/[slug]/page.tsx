import proyectos from "@/app/data/proyectos.json";
import NotFoundPage from "@/app/not-found";
import ProyectoClientPage from "./ProyectoClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Genera rutas estáticas
export async function generateStaticParams() {
  return proyectos.map((proyecto) => ({
    slug: proyecto.slug,
  }));
}

// ✅ Ahora es asíncrona
export default async function ProyectoPage({ params }: PageProps) {
  const { slug } = await params; // 👈 Aquí esperamos los params

  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) {
    return <NotFoundPage />;
  }

  return <ProyectoClientPage proyecto={proyecto} />;
}

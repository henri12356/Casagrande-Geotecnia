import { NextResponse } from "next/server";

export async function POST() {
  // ✅ Lista de URLs (igual que tu sitemap)
  const baseUrl = "https://www.casagrandegeotecnia.com.pe";

  const serviciosSlugs = [
    "geotecnia",
    "geologia",
    "estudio-de-suelos",
    "laboratorio-geotecnico",
    "servicios-pavimento",
    "geofisica",
    "geomecanica",
    "hidrogeologia",
    "control-calidad",
  ];

  const proyectosSlugs = [
    "aeropuerto-internacional-jorge-chavez",
    "hospital-nacional",
    "carretera-interoceanica",
    "metro-de-lima",
    "presa-hidroelectrica",
    "edificio-corporativo",
    "centro-comercial",
  ];

  const staticUrls = [
    "",
    "servicios",
    "proyectos",
    "nosotros",
    "blog",
    "contacto",
  ];

  // ✅ Combinar todas las URLs
  const allUrls = [
    ...staticUrls.map((slug) => `${baseUrl}/${slug}`.replace(/\/$/, "")),
    ...serviciosSlugs.map((slug) => `${baseUrl}/servicios/${slug}`),
    ...proyectosSlugs.map((slug) => `${baseUrl}/proyectos/${slug}`),
  ];

  // ✅ Enviar a IndexNow
  const body = {
    host: "www.casagrandegeotecnia.com.pe",
    key: "22e9205e7fe44ff6b6a6bfa79f05e116",
    keyLocation: `${baseUrl}/22e9205e7fe44ff6b6a6bfa79f05e116.txt`,
    urlList: allUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    const data = await res.text();
    return NextResponse.json({ status: res.status, data });
  } catch (error) {
    return NextResponse.json({
      error: "Error enviando URLs a IndexNow",
      details: (error as Error).message,
    });
  }
}

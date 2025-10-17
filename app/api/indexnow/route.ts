import { NextResponse } from "next/server";

// ✅ Método POST - Envío a IndexNow
export async function POST() {
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

  const staticUrls = ["", "servicios", "proyectos", "nosotros", "blog", "contacto"];

  const allUrls = [
    ...staticUrls.map((slug) => `${baseUrl}/${slug}`.replace(/\/$/, "")),
    ...serviciosSlugs.map((slug) => `${baseUrl}/servicios/${slug}`),
    ...proyectosSlugs.map((slug) => `${baseUrl}/proyectos/${slug}`),
  ];

  const body = {
    host: "www.casagrandegeotecnia.com.pe",
    key: "22e9205e7fe44ff6b6a6bfa79f05e116",
    keyLocation: `${baseUrl}/22e9205e7fe44ff6b6a6bfa79f05e116.txt`,
    urlList: allUrls,
  };

  try {
    const res = await fetch("https://www.bing.com/indexnow", {
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

// ✅ Método GET solo para verificar si el endpoint está activo
export async function GET() {
  return NextResponse.json({
    message: "esta e sun prueba si esta funcionado el codigo de indexnow",
  });
}

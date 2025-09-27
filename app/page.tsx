import Navbar from "./navbar";
import Hero from "./hero";
import Sobrenosotros from "./sobrenosotros";
import Certificado from "./certificado";
import Numeros from "./numeros";
import Galeria from "./galeria";
import Footer from "./footer";
import Clientes from "./clientes";
import MapaProyectosHero from "./proyectos";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Sobrenosotros />
      <Certificado />
      <Galeria />
      <MapaProyectosHero />
      <Clientes />
      <Numeros />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

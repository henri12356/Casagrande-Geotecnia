import Navbar from "./navbar";
import Hero from "./hero";
import Sobrenosotros from "./sobrenosotros";
import Certificado from "./certificado";
import Numeros from "./numeros";
import Galeria from "./galeria";
import Proyectos from "./proyectos";
import Footer from "./footer";
import Clientes from "./clientes";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Sobrenosotros />
      <Certificado />
      <Numeros />
      <Galeria />
      <Proyectos />
      <Clientes />
      <Footer />
    </div>
  );
}

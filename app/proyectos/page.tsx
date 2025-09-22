import Link from "next/link";
import Footer from "../footer";
import Navbar from "../navbar";
import HeroProyectos from "./hero";
import Proyecto from "./proyectos";
import Trusted from "@/app/clientes";


const Projects = () => {
  return (
    <div className="bg-white">
      <Navbar />
       
     <HeroProyectos />
     <Proyecto />
     <Trusted/>
    <section className="bg-gradient-to-r bg-[#1b4772] text-white py-20 text-center">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
               ¿Quieres un proyecto como este?
             </h2>
             <p className="mb-8 text-lg opacity-90">
               Contáctanos y llevemos tu idea al siguiente nivel.
             </p>
             <Link
               href="/contacto"
               className="px-6 py-3 bg-white text-[#1b4772]  font-bold rounded-full shadow-md hover:shadow-lg transition"
             >
               Contáctanos
             </Link>
           </section>
      <Footer />
    </div>
  );
};

export default Projects;

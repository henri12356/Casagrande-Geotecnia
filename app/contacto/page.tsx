import Footer from "../footer";
import Navbar from "../navbar";
import Formulario from "./formulario";
import HeroContacto from "./hero";
import Mapa from "./mapa";

const Projects = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeroContacto />
      <Formulario />
      <Mapa />
      <Footer />
    </div>
  );
};

export default Projects;

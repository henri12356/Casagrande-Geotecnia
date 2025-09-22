import Brochure from "../brochure";
import Footer from "../footer";
import Navbar from "../navbar";
import HeroServicios from "./hero";
import Servicios from "./servicios";

const Projects = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <HeroServicios />
      <Servicios />
      <Brochure />
      <Footer />
    </div>
  );
};

export default Projects;

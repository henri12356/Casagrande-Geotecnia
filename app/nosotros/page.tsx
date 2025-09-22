import Brochure from "../brochure";
import Footer from "../footer";
import Navbar from "../navbar";
import CertificadoNosotros from "./certificadoNosotros";
import Familia from "./familia";
import HeroNosotros from "./hero";
import Trayectoria from "./trayectoria";
import Valores from "./valores";

const Projects = () => {
  return (
    <div className="bg-white">
      <Navbar />


      <HeroNosotros />
      <Familia />
      <Valores />
      <Trayectoria />
      <CertificadoNosotros />
        <Brochure />
      <Footer />
    </div>
  );
};

export default Projects;

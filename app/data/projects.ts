// data/projects.ts

import { Project } from "../types/project";


export const geotectonicsProjects: Project[] = [
  {
    id: 'p001',
    province: 'Lima',
    description: 'Estudio de estabilidad de taludes para proyecto de infraestructura vial clave.',
    mapPosition: { top: '65%', left: '42%' }, // Coordenadas aproximadas en el mapa de Perú
  },
  {
    id: 'p002',
    province: 'Arequipa',
    description: 'Monitoreo geotécnico en proyecto minero de gran envergadura en el sur.',
    mapPosition: { top: '78%', left: '45%' },
  },
  {
    id: 'p003',
    province: 'Cusco',
    description: 'Investigación geofísica para cimentaciones de nuevo centro turístico.',
    mapPosition: { top: '70%', left: '55%' },
  },
  {
    id: 'p004',
    province: 'Piura',
    description: 'Análisis de riesgos por sismicidad para planta industrial costera.',
    mapPosition: { top: '15%', left: '28%' },
  },
  // ¡Agrega más proyectos aquí! 
];
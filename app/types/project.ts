// types/project.ts

export type Project = {
  id: string;
  province: string;
  description: string;
  // Posición en el mapa: se define como porcentajes para ser más responsivo.
  // Ej. left: 30% desde el borde izquierdo del mapa.
  mapPosition: {
    top: string; 
    left: string;
  };
};
export interface Blog {
  esPopular?: boolean;
  slug: string;
  titulo: string;
  subtitulo?: string;
  categoria: string;
  imagen: string;
  fecha: string;
  extracto?: string;
  autor?: {
    nombre: string;
    cargo: string;
    avatar: string;
  };
  contenido: string | { titulo?: string; texto?: string; imagen?: string }[];
  relacionados: string[];
  tags?: string[];
}
export interface Category {
  id: string;
  nombre: string;
  color: string;
}

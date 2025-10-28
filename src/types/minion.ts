export interface Minion {
  id: number;
  name: string;
  language: string;
  skills: string[];
  imageUrl?: string;
}


export interface MinionDetail extends Minion {
  fecha_cumpleanos: number;
  experiencia: number;
  estado: string;
  descripcion: string;
  numero_ojos: number;
  altura: number;
  comida_favorita: string;
  personalidad: string;
}
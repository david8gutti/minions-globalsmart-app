export interface Minion {
  id: string;
  name: string;
  language: string;
  skills: string[];
  imageUrl?: string;
}

export interface MinionDetail extends Minion {
  fecha_cumpleanos: string;
  experiencia: string;
  estado: string;
  descripcion: string;
  numero_ojos: string;
  altura: string;
  comida_favorita: string;
  personalidad: string;
}

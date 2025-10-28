"use client";

import { Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

interface MinionForm {
  name: string;
  language: string;
  skills: string[];
  imageUrl: string;
  fecha_cumpleanos: string;
  experiencia: number;
  estado: string;
  descripcion: string;
  numero_ojos: number;
  altura: number;
  comida_favorita: string;
  personalidad: string;
}


interface MinionFormProps {
  initialData: MinionForm;
  mode: "create" | "edit" | "view";
}

export default function MinionForm({ initialData, mode }: MinionFormProps) {
  const [form, setForm] = useState<MinionForm>(initialData);

  const isReadOnly = mode === "view";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { id, value } = e.target;
  setForm(prev => ({ ...prev, [id]: value }));
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    // Aquí podrías hacer fetch POST/PUT a tu API
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      {form.imageUrl && (
  <img
    src={form.imageUrl}   // blob:...
    alt="Minion"
    width={150}
    height={150}
    className="rounded-lg object-cover"
  />
)}
      <div>
        <Label htmlFor="name">Nombre</Label>
        <TextInput id="name" value={form.name} onChange={handleChange} disabled={isReadOnly} required />
      </div>

      <div>
        <Label htmlFor="language">Idioma</Label>
        <TextInput id="language" value={form.language} onChange={handleChange}  disabled={isReadOnly}required />
      </div>
    
    <div>
        <Label htmlFor="fecha_cumpleanos">Fecha de cumpleaños</Label>
        <TextInput
          id="fecha_cumpleanos"
          type="date"
          value={form.fecha_cumpleanos}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>
      <div>
        <Label htmlFor="habilidades">Habilidades</Label>
        <TextInput
          id="habilidades"
          type="text"
          value={form.skills}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>
      
        <div>
        <Label htmlFor="experiencia">Experiencia</Label>
        <TextInput
          id="experiencia"
          type="number"
          value={form.experiencia}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="estado">Estado</Label>
        <TextInput
          id="estado"
          type="text"
          value={form.estado}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripcion</Label>
        <Textarea
          id="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="altura">Altura</Label>
        <TextInput
          id="altura"
          type="text"
          value={form.altura}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="numero_ojos">Cantidad Ojos</Label>
        <TextInput
          id="numero_ojos"
          type="text"
          value={form.numero_ojos}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="comida_favorita">Comida favorita</Label>
        <TextInput
          id="comida_favorita"
          type="text"
          value={form.comida_favorita}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>

      <div>
        <Label htmlFor="personalidad">Personalidad</Label>
        <TextInput
          id="personalidad"
          type="text"
          value={form.personalidad}
          onChange={handleChange}
          disabled={isReadOnly}
          required
        />
      </div>


    </form>
  );
}

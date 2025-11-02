"use client";

// Componente: MinionForm
// Formulario dinámico para crear, editar o visualizar los detalles de un Minion.
// Props:
// - initialData: datos iniciales del Minion (para modo "edit" o "view").
// - title: título que se muestra en la cabecera del formulario.
// - mode: determina el comportamiento del formulario ("create", "edit" o "view").
// - imageUrl: URL de la imagen a mostrar; si no existe, se muestra una imagen por defecto.
// - handleSubmit: función callback que se ejecuta al enviar el formulario.
// - handleBack: función para volver a la vista anterior.

import { Button, Image, Input, NumberInput, Textarea } from "@heroui/react";
import { useState } from "react";
import type { MinionDetail } from "@/types/minion";

interface MinionFormProps {
  initialData: MinionDetail;
  title: string;
  mode: "create" | "edit" | "view";
  imageUrl: string | null;
  handleSubmit: (formData: MinionDetail, e: React.FormEvent) => void;
  handleBack: () => void;
}

export default function MinionForm({
  initialData,
  title,
  mode,
  imageUrl,
  handleSubmit,
  handleBack,
}: MinionFormProps) {
  const [form, setForm] = useState<MinionDetail>(initialData);

  const isReadOnly = mode === "view";

  //Manejadores de cambios (texto y numeros)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleNumberChange = (id: string, value: number) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(form, e)}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">{title}</h1>
        <div className="flex gap-3">
          <Button className="w-md font-bold" onPress={handleBack}>
            ⬅️ Volver
          </Button>
          <Button
            type="submit"
            className="dark:bg-yellow-300 bg-yellow-300 border-3 border-solid border-blue-700 w-full text-blue-700 font-bold"
            isDisabled={isReadOnly}
          >
            {mode === "create" ? "➕ Crear" : "✏️ Editar"}
          </Button>
        </div>
      </div>
      <hr className="h-px my-5 bg-yellow-300 border-0 dark:bg-yellow-300" />

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center justify-center h-full">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Minion" width="256" height="256" />
              <p className="mt-2">Foto del Minion</p>
            </>
          ) : (
            <Image src="/creating_minion.png" alt="Minion" width="300" height="300" />
          )}
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="col-span-2 mb-5">
            <Input
              id="name"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Nombre"
              labelPlacement="outside-top"
              value={form.name}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>

          <div className="mb-5 mr-3">
            <Input
              id="language"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Idioma"
              labelPlacement="outside-top"
              value={form.language}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>

          <div>
            <Input
              id="fecha_cumpleanos"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Fecha Cumpleaños"
              labelPlacement="outside-top"
              type="date"
              value={form.fecha_cumpleanos}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>
          <div className="col-span-2 mb-5 dark:text-blue-400">
            <Input
              id="habilidades"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Habilidades"
              labelPlacement="outside-top"
              type="text"
              value={form.skills.join(", ")}
              onChange={(e) =>
                setForm({
                  ...form,
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              isReadOnly={isReadOnly}
              className="col-span-2"
              isRequired
            />
          </div>

          <div className="mb-5 mr-3">
            <NumberInput
              id="experiencia"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Experiencia"
              labelPlacement="outside"
              value={form.experiencia}
              onValueChange={(value) =>
                handleNumberChange("experiencia", value)
              }
              isReadOnly={isReadOnly}
              isInvalid={form.experiencia < 0}
              errorMessage={
                form.experiencia < 0
                  ? "Debe ser mayor que 0"
                  : null
              }
              isRequired
            />
          </div>

          <div>
            <Input
              id="estado"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Estado"
              labelPlacement="outside-top"
              type="text"
              value={form.estado}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>

          <div className="col-span-2 mb-5">
            <Textarea
              id="descripcion"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Descripción"
              labelPlacement="outside-top"
              value={form.descripcion}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>

          <div className="mb-5 mr-3">
            <NumberInput
              id="altura"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Altura (cm)"
              labelPlacement="outside"
              value={form.altura}
              onValueChange={(value) => handleNumberChange("altura", value)}
              isReadOnly={isReadOnly}
              isInvalid={form.altura < 0}
              errorMessage={
                form.altura < 0
                  ? "Debe ser mayor que 0"
                  : null
              }
              isRequired
            />
          </div>

          <div>
            <NumberInput
              id="numero_ojos"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              type="number"
              label="Numero de ojos"
              labelPlacement="outside"
              value={form.numero_ojos}
              onValueChange={(value) =>
                handleNumberChange("numero_ojos", value)
              }
              isReadOnly={isReadOnly}
              isInvalid={form.numero_ojos < 0}
              errorMessage={
                form.numero_ojos < 0
                  ? "Debe ser mayor que 0"
                  : null
              }
              isRequired
            />
          </div>

          <div className="mr-3">
            <Input
              id="comida_favorita"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Comida Favorita"
              labelPlacement="outside-top"
              type="text"
              value={form.comida_favorita}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>

          <div>
            <Input
              id="personalidad"
              classNames={{
                label: "font-bold text-blue-700 dark:text-blue-400",
              }}
              label="Personalidad"
              labelPlacement="outside-top"
              type="text"
              value={form.personalidad}
              onChange={handleChange}
              isReadOnly={isReadOnly}
              isRequired
            />
          </div>
        </div>
      </div>
    </form>
  );
}

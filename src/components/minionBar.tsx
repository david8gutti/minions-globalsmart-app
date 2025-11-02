import { Button, Input, Select, SelectItem } from "@heroui/react";
import type { useRouter } from "next/navigation";

// Componente: MinionBar
// Renderiza una barra de búsqueda y filtrado para la lista de Minions.
// Permite buscar por nombre, filtrar por idioma y seleccionar múltiples habilidades.
// 
// Props:
// - languages: lista de idiomas disponibles para el filtro.
// - skills: lista de habilidades disponibles para selección múltiple.
// - selectedLanguage: idioma actualmente seleccionado.
// - selectedSkill: array con las habilidades seleccionadas.
// - searchTerm: texto de búsqueda introducido por el usuario.
// - router: instancia del hook useRouter (para redirecciones).
// - setSelectedLanguage / setSelectedSkill / setSearchTerm: setters para actualizar los filtros.


interface MinionBarProps {
  languages: string[];
  skills: string[];
  selectedLanguage: string;
  selectedSkill: string[];
  searchTerm: string;
  router: ReturnType<typeof useRouter>;
  setSelectedLanguage: (lang: string) => void;
  setSelectedSkill: (skill: string[]) => void;
  setSearchTerm: (term: string) => void;
}

export function MinionBar({
  languages,
  skills,
  selectedLanguage,
  selectedSkill,
  searchTerm,
  router,
  setSelectedLanguage,
  setSelectedSkill,
  setSearchTerm,
}: MinionBarProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mt-5 mb-5">
      <div>
        <Input
          size="lg"
          id="search"
          aria-label="Buscar"
          type="text"
          placeholder="🔎 Buscar por palabra clave"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Select
          value={selectedLanguage}
          label="Idioma"
          aria-label="Idioma"
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <SelectItem key={lang}>{lang}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Select
          value={selectedSkill}
          label="Habilidades"
          aria-label="Habilidades"
          selectionMode="multiple"
          onChange={(e) => {
            const value = e.target.value;
            const values = Array.isArray(value)
              ? value
              : typeof value === "string" && value.length > 0
                ? value.split(",")
                : [];
            setSelectedSkill(values);
          }}
        >
          {skills.map((skill) => (
            <SelectItem key={skill}>{skill}</SelectItem>
          ))}
        </Select>
      </div>
      <div>
        <Button
          className="dark:bg-yellow-400 bg-yellow-300 border-3 border-solid border-blue-700 w-full"
          size="lg"
          aria-label="Añadir nuevo minion"
          radius="sm"
          onPress={() => router.push("/new")}
        >
          <span className="text-blue-700 font-bold">+ Añadir nuevo minion</span>
        </Button>
      </div>
    </div>
  );
}

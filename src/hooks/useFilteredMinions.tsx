import { useMemo, useState } from "react";
import type { Minion } from "@/types/minion";
import { normalizeText } from "@/utils/string";

/**
 * useFilteredMinions
 * -------------------------
 * Gestiona la lógica de filtrado, búsqueda y paginación de minions.
 *
 * Propósito:
 * Este hook centraliza la lógica relacionada con la visualización filtrada de Minions,
 * evitando la duplicación del código y manteniendo limpio el componente principal.
 *
 *  Devuelve:
 * - filteredMinions: Lista filtrada completa
 * - paginatedMinions: Página actual de resultados
 * - totalPages: Total de páginas
 * - page / setPage: Estado de paginación
 * 
 * NOTA: Pensé en meter este hook de primeras dentro de useMinion, pero en realidad son dos
 * tipos de responsabilidades (useFiltered de gestionar toda la vista, useMinions de obtener y
 * mantener el estado)
 */

export const useFilteredMinions = (
  minions: Minion[],
  selectedLanguage: string,
  selectedSkill: string[],
  searchTerm: string,
  itemsPerPage = 5
) => {
  const [page, setPage] = useState(1);

  // USEMEMO:
  // Al igual que con los filtros, tambien es un calculo costoso
  //a la hora de haber tantos minions
  const filteredMinions = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return minions.filter((m) => {
      const languageMatch = selectedLanguage
        ? m.language === selectedLanguage
        : true;

      const skillMatch =
        selectedSkill.length > 0
          ? selectedSkill.every((skill) =>
              m.skills.some(
                (s) => normalizeText(s) === normalizeText(skill)
              )
            )
          : true;

      const searchMatch =
        !normalizedSearch ||
        normalizeText(m.name).includes(normalizedSearch) ||
        normalizeText(m.language).includes(normalizedSearch) ||
        m.skills.some((s) =>
          normalizeText(s).includes(normalizedSearch)
        );

      return languageMatch && skillMatch && searchMatch;
    });
  }, [minions, selectedLanguage, selectedSkill, searchTerm]);

  // USEMEMO:
  // Se calculan los resultados de la pagina actual
  //basandose en los minions filtrados
  const paginatedMinions = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredMinions.slice(start, start + itemsPerPage);
  }, [filteredMinions, page]);

  const totalPages = Math.max(1, Math.ceil(filteredMinions.length / itemsPerPage));

  return { filteredMinions, paginatedMinions, totalPages, page, setPage };
};

/**
 * normalizeText
 * -------------------------
 * Normaliza una cadena de texto eliminando acentos, espacios sobrantes
 * y convirtiéndola a minúsculas.
 *
 */

export const normalizeText = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

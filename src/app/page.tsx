"use client";

import { Pagination } from "@heroui/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { MinionBar } from "@/components/minionBar";
import { MinionTable } from "@/components/minionTable";
import { useMinions } from "@/hooks/useMinions";
import { deleteMinion } from "@/redux/minionsSlice";
import type { AppDispatch } from "@/redux/store";

export default function MinionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { minions, status } = useMinions();

  const [page, setPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 5;

  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onPageChange = (page: number) => setPage(page);

  const handleDelete = async (id: string) => {
    try {
      dispatch(deleteMinion(id));
    } catch (error) {
      console.error("Error eliminando minion:", error);
    }
  };

  // Filtros dinamicos
  /* Solo recalcula cuando cambian las dependencias */
  const languages = useMemo(
    () => Array.from(new Set(minions.map((m) => m.language))),
    [minions],
  );
  const skills = useMemo(
    () => Array.from(new Set(minions.flatMap((m) => m.skills))),
    [minions],
  );

  const normalizeText = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // 🔹 Minions filtrados por búsqueda + filtros
  const filteredMinions = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return minions.filter((m) => {
      const languageMatch = selectedLanguage
        ? m.language === selectedLanguage
        : true;

      const skillMatch =
        selectedSkill.length > 0
          ? selectedSkill.every((skill) =>
              m.skills.some((s) => normalizeText(s) === normalizeText(skill)),
            )
          : true;

      const searchMatch =
        !normalizedSearch ||
        normalizeText(m.name).includes(normalizedSearch) ||
        normalizeText(m.language).includes(normalizedSearch) ||
        m.skills.some((s) => normalizeText(s).includes(normalizedSearch));

      return languageMatch && skillMatch && searchMatch;
    });
  }, [minions, selectedLanguage, selectedSkill, searchTerm]);

  const paginatedMinions = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMinions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMinions, page]);

  const totalPagesFrontend = Math.max(
    1,
    Math.ceil(filteredMinions.length / ITEMS_PER_PAGE),
  );

  // 🔹 Mostrar loading
  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Image
          src={"/minion_spinner.gif"}
          className="place-items-center"
          alt="Minion...."
          width={512}
          height={512}
          priority
        />
      </div>
    );
  }

  if (status === "rejected") return <p>Error cargando minions</p>;

  return (
    <div className="place-items-center m-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-10">
        Gestión de Minions
      </h1>

      <MinionBar
        languages={languages}
        skills={skills}
        selectedLanguage={selectedLanguage}
        selectedSkill={selectedSkill}
        searchTerm={searchTerm}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedSkill={setSelectedSkill}
        setSearchTerm={setSearchTerm}
      />

      <div className="w-full max-w-6xl mx-auto">
        <MinionTable data={paginatedMinions} handleDelete={handleDelete} />
        <div className="flex sm:justify-center mt-5">
          <Pagination
            classNames={{
              cursor:"bg-yellow-400 text-black font-bold border border-blue-700 shadow-md",
            }}
            initialPage={page}
            total={totalPagesFrontend}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}

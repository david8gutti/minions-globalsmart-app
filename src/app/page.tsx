"use client";

import { Alert, Pagination } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteModal } from "@/components/deleteModal";
import { MinionBar } from "@/components/minionBar";
import { MinionTable } from "@/components/minionTable";
import { ThemeSwitcher } from "@/components/themeSwitcher";
import { useFilteredMinions } from "@/hooks/useFilteredMinions";
import { useMinions } from "@/hooks/useMinions";
import { deleteMinion } from "@/redux/minionsSlice";
import type { AppDispatch } from "@/redux/store";

export default function MinionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { minions, status, error } = useMinions();

  const columnNames = ["NOMBRE", "IDIOMA", "HABILIDAD", "ACCIONES"];

  //Filtros
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Modales, alertas
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [minionToDelete, setMinionToDelete] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

    const { paginatedMinions, totalPages, page, setPage } = useFilteredMinions(
    minions,
    selectedLanguage,
    selectedSkill,
    searchTerm,
    5,
  );

  // USECALLBACK:
  // Handlers que se le pasa a componente hijo para evitar
  //su re-renderizado 
  const handleDelete = useCallback((id: string) => {
    setMinionToDelete(id);
    setIsDeleteOpen(true); //Modal de eliminacion abierto
  }, []);

  const handleConfirmDelete = useCallback(() => {
    //Si existe el id, procede a borrar el minion, cerrar el modal
    //y después mostrar la alerta
    if (minionToDelete) {
      dispatch(deleteMinion(minionToDelete));
      setMinionToDelete(null);
      setIsDeleteOpen(false);

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
    }
  }, [dispatch, minionToDelete]);

  // USEMEMO:
  // Extrae y memoriza los valores unicos, se recalculan solo
  //si cambia la lista de minions
  const languages = useMemo(
    () => Array.from(new Set(minions.map((m) => m.language))),
    [minions],
  );
  const skills = useMemo(
    () => Array.from(new Set(minions.flatMap((m) => m.skills))),
    [minions],
  );

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Image
          src={"/minion_spinner.gif"}
          className="place-items-center"
          alt="Cargando lista de minions"
          width={512}
          height={512}
          priority
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6 text-red-600 font-bold">
        <Image
          src="/minion_error.gif"
          alt="Error al cargar"
          width={512}
          height={512}
          priority
        />
        <p>Error al cargar</p>
      </div>
    );
  }

  return (
    <div className="place-items-center m-50">
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-10">
        Gestión de Minions
      </h1>

      <MinionBar
        languages={languages}
        skills={skills}
        selectedLanguage={selectedLanguage}
        selectedSkill={selectedSkill}
        searchTerm={searchTerm}
        router={router}
        setSelectedLanguage={setSelectedLanguage}
        setSelectedSkill={setSelectedSkill}
        setSearchTerm={setSearchTerm}
      />

      <div className="w-full max-w-6xl mx-auto">
        <MinionTable
          columnNames={columnNames}
          data={paginatedMinions}
          handleDelete={handleDelete}
          router={router}
        />
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Eliminar Minion"
          message="¿Seguro que quieres eliminar este Minion?"
        />

        <div className="flex sm:justify-center mt-5">
          <Pagination
            classNames={{
              cursor:
                "bg-yellow-400 text-black font-bold border border-blue-700 shadow-md",
            }}
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
        {showAlert && (
          <div className="mt-15">
            <Alert color="success" title="Minion eliminado con éxito" />
          </div>
        )}
      </div>
      <div className="mt-15">
        <ThemeSwitcher/>
      </div>
    </div>
  );
}

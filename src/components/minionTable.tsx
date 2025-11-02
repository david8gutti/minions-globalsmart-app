import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { useRouter } from "next/navigation";
import type { Minion } from "@/types/minion";

interface MinionTableProps {
  data: Minion[];
  handleDelete: (id: string) => void;
  router: ReturnType<typeof useRouter>;
}

export function MinionTable({ data, handleDelete, router }: MinionTableProps) {
  return (
    <Table isStriped aria-label="Tabla de Minions">
      <TableHeader>
        <TableColumn className="bg-yellow-300 dark:bg-yellow-300 text-blue-700">
          NOMBRE
        </TableColumn>
        <TableColumn className="bg-yellow-300 dark:bg-yellow-300 text-blue-700">
          IDIOMA
        </TableColumn>
        <TableColumn className="bg-yellow-300 dark:bg-yellow-300 text-blue-700">
          HABILIDAD
        </TableColumn>
        <TableColumn className="bg-yellow-300 dark:bg-yellow-300 text-blue-700">
          ACCIONES
        </TableColumn>
      </TableHeader>
      <TableBody className="divide-y">
        {data.map((minion: Minion) => (
          <TableRow key={minion.id}>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {minion.name}
            </TableCell>
            <TableCell>{minion.language}</TableCell>
            <TableCell>
              {Array.isArray(minion.skills) && minion.skills.length > 0
                ? minion.skills.join(", ")
                : "—"}
            </TableCell>
            <TableCell className="grid grid-cols-3">
              <EyeIcon
                className="h-6 w-6 text-gray-700"
                aria-label="Ver Minion"
                onClick={() => router.push(`/${minion.id}?mode=view`)}
              />

              <PencilIcon
                className="h-6 w-6 text-gray-700"
                aria-label="Editar Minion"
                onClick={() => router.push(`/${minion.id}?mode=edit`)}
              />

              <TrashIcon
                className="h-6 w-6 text-gray-700"
                aria-label="Ver Minion"
                onClick={() => handleDelete(minion.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client"
import { deleteMinion, setMinions } from "@/redux/minionsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Minion } from "@/types/minion";
import { Button, Dropdown, DropdownItem, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineEye, HiOutlinePencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export default function TablePage() {
    const dispatch = useDispatch<AppDispatch>()

    const minions = useSelector((state: RootState) => state.minions.minions )
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1); 
    const onPageChange = (page: number) => setPage(page);
    const [loading, setLoading] = useState<boolean>(true);

    const handleDelete = async (id: number) => {
        if (!confirm("¿Seguro que quieres eliminar este minion?")) return;
        try {
            // Actualiza la lista de minions
            dispatch(deleteMinion(id));
        } catch (error) {
            console.error("Error eliminando minion:", error);
        }
        };
    
    useEffect(()=>{
        setLoading(true); 
        fetch(`/api/minions?page=${page}`)
            .then((response) => response.json())
            .then((data)=>{
                const mappedMinions: Minion[] = data.minions.map((m: any) => ({
                    id: m.id,
                    name: m.nombre,
                    language: m.idioma,
                    skills: m.habilidades,
                    }));
            
                dispatch(setMinions(mappedMinions))
                //setPage(data.page)
                setTotalPages(data.totalPages)
           })
        .catch((error) => console.error("Error fetching minions:", error))
        .finally(() => setLoading(false));
    }, [page])
  return (
    
    <div className="place-items-center m-50">
    <h1 className="text-2xl font-bold">Gestion de Minions</h1>
    <br />
    
    {loading ? (
        <div className="flex justify-center items-center">
          <Image 
          src="/minion_loading.gif" 
          alt="Cargando..." 
          height={300}
            width={300}
          />
        </div>
      ) : (
        <div className="overflow-x-auto w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-2 mb-3">
            <div className="col-span-4">
              <TextInput id="email1" type="email" placeholder="🔎 Buscar por palabra clave" />
            </div>
            <div className="col-span-2">
              <Dropdown label="Idioma" dismissOnClick={false}>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownItem>Sign out</DropdownItem>
              </Dropdown>
            </div>
            <div className="col-span-2">
              <Dropdown label="Habilidad" dismissOnClick={false}>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownItem>Sign out</DropdownItem>
              </Dropdown>
            </div>
            <div className="col-span-4">
              <Button color="yellow" pill>
                + Añadir nuevo minion
              </Button>
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow className="bg-white dark:border-b-blue-700 dark:bg-amber-400">
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Idioma</TableHeadCell>
                <TableHeadCell>Habilidad</TableHeadCell>
                <TableHeadCell>Acciones</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {minions.map((minion: Minion) => (
                <TableRow
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={minion.id}
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {minion.name}
                  </TableCell>
                  <TableCell>{minion.language}</TableCell>
                  <TableCell>{minion.skills.join(", ")}</TableCell>
                  <TableCell className="grid grid-cols-3">
                    <Link
                        href={`/table/${minion.id}?mode=view`}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                      <HiOutlineEye />
                    </Link>
                    
                    
                        <Link
                        href={`/table/${minion.id}?mode=edit`}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                      <HiOutlinePencil />
                    </Link>
                      <MdDelete 
                      onClick={() => handleDelete(minion.id)}
                      />
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <br />
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      )}
    </div>

  );
}

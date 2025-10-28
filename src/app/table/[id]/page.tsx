import MinionForm from "@/components/minionForm";
import { Button } from "flowbite-react";

interface MinionDetailsProps {
  params: { id: string }; 
  searchParams: { mode?: "create" | "edit" | "view" }
}

async function getMinion(id: string) {
  const res = await fetch(`https://minion.globalsmartiot.es/getMinion?id=${id}`);
  return res.json();
}

async function getMinionPic(id: string) {
  const res = await fetch(`https://minion.globalsmartiot.es/getMinionPic?id=${id}`);
  const blob = await res.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}


export default async function MinionDetails({params, searchParams}: MinionDetailsProps){
    const { id } = params
    const mode = searchParams.mode || "view";
    const minion = await getMinion(id);
    const minionPic = await getMinionPic(id);
    
    const initialForm = {
    name: minion.nombre,
    language: minion.idioma,
    skills: minion.habilidades,
    imageUrl: minionPic,
    fecha_cumpleanos: new Date(minion.fecha_cumpleanos * 1000)
      .toISOString()
      .slice(0, 10),
    experiencia: minion.experiencia,
    estado: minion.estado,
    descripcion: minion.descripcion,
    numero_ojos: minion.numero_ojos,
    altura: minion.altura,
    comida_favorita: minion.comida_favorita,
    personalidad: minion.personalidad
  };
    
    return (
    <>

    <main className="p-6">
      <h1 className="text-2xl font-bold">Ficha del minion</h1>
        <br />
        <div className="mb-5">
            <Button>Volver</Button>
        <Button>Editar</Button>
        </div>
        
      <MinionForm initialData={initialForm} mode={mode} />
    </main>
    </>
  );
}
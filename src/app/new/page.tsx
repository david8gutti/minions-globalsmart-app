"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { v4 as uuid4 } from "uuid";
import MinionForm from "@/components/minionForm";
import { addMinion } from "@/redux/minionsSlice";
import type { AppDispatch } from "@/redux/store";
import type { MinionDetail } from "@/types/minion";

export default function MinionNew() {
  const initialForm: MinionDetail = {
    id: uuid4(),
    name: "",
    language: "",
    skills: [],
    imageUrl: "",
    fecha_cumpleanos: "",
    experiencia: "0",
    estado: "",
    descripcion: "",
    numero_ojos: "2",
    altura: "100",
    comida_favorita: "",
    personalidad: "",
  };

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleBack = () => router.push("/");
  const handleSubmit = (formData: MinionDetail, e: React.FormEvent) => {
    e.preventDefault();
    const newMinion = {
      ...formData,
      skills: Array.isArray(formData.skills) ? formData.skills : [],
    };
    dispatch(addMinion(newMinion));
    router.push("/");
  };

  return (
    <div className="m-30">
      <MinionForm
        initialData={initialForm}
        title="Nuevo minion"
        mode="create"
        handleSubmit={handleSubmit}
        handleBack={handleBack}
        imageUrl=""
      />
    </div>
  );
}

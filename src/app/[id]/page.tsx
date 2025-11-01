"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MinionForm from "@/components/minionForm";
import { updateMinion } from "@/redux/minionsSlice";
import type { AppDispatch } from "@/redux/store";
import type { MinionDetail } from "@/types/minion";

interface MinionDetailsProps {
  params: { id: string };
  searchParams?: { mode?: "edit" | "view" };
}

export default function MinionDetails({
  params,
  searchParams,
}: MinionDetailsProps) {
  const router = useRouter();

  const { id } = params;
  const mode = searchParams?.mode || "view";
  const [loading, setLoading] = useState(true);

  const [minionDetail, setMinionDetail] = useState<MinionDetail | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    const fetchMinion = async () => {
      try {
        const res = await fetch(`/api/minion?id=${id}`);
        const data = await res.json();

        const picRes = await fetch(`/api/minionPic?id=${id}`);
        const dataImage = await picRes.json();

        if (dataImage.image) {
          setImageUrl(dataImage.image);
        }

        const fetched: MinionDetail = {
          id: data.id,
          name: data.nombre,
          language: data.idioma,
          skills: data.habilidades,
          fecha_cumpleanos: new Date(data.fecha_cumpleanos * 1000)
            .toISOString()
            .slice(0, 10),
          experiencia: data.experiencia,
          estado: data.estado,
          descripcion: data.descripcion,
          numero_ojos: data.numero_ojos,
          altura: data.altura,
          comida_favorita: data.comida_favorita,
          personalidad: data.personalidad,
        };

        setMinionDetail(fetched);
      } catch (error) {
        console.error("Error al cargar el minion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinion();
  }, [id]);

  const handleBack = () => router.push("/")

  const handleSubmit = (formData: MinionDetail, e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();

    console.log("Formulario enviado:", formData);
    const newMinion = {
      ...formData,
    };
    dispatch(updateMinion(newMinion));
    router.push("/");
  };

  if (loading || !minionDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/minion_loading.gif"
          alt="Cargando..."
          width={256}
          height={256}
        />
      </div>
    );
  }

  return (
    <div className="m-30">
      <MinionForm
        initialData={minionDetail}
        handleBack={handleBack}
        title="Ficha del Minion"
        mode={mode}
        handleSubmit={handleSubmit}
        imageUrl={imageUrl}
      />
    </div>
  );
}

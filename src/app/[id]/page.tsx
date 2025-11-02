"use client";

import { Spinner } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MinionForm from "@/components/minionForm";
import { updateMinion } from "@/redux/minionsSlice";
import type { AppDispatch } from "@/redux/store";
import type { MinionDetail } from "@/types/minion";

interface MinionDetailsProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: "edit" | "view" }>;
}

export default function MinionDetails({
  params,
  searchParams,
}: MinionDetailsProps) {
  const router = useRouter();

  //Nueva forma de obtener los params
  const resolvedParams = use(params);
  const resolvedSearchParams = use(
    searchParams ?? Promise.resolve<{ mode?: "edit" | "view" }>({})
  );

  const { id } = resolvedParams;
  const mode = resolvedSearchParams?.mode || "view";
  const [loading, setLoading] = useState(true);

  const [minionDetail, setMinionDetail] = useState<MinionDetail | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    const fetchMinion = async () => {
      try {
        const [res, picRes] = await Promise.all([
          fetch(`/api/minion?id=${id}`),
          fetch(`/api/minionPic?id=${id}`),
        ]);

        const data = await res.json();
        const dataImage = await picRes.json();

        if (dataImage.image) {
          setImageUrl(dataImage.image);
        }

        const fetched: MinionDetail = {
          id: data.id,
          name: data.nombre,
          language: data.idioma,
          skills: Array.isArray(data.habilidades) ? data.habilidades : [],
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

  const handleBack = () => router.push("/");

  const handleSubmit = (formData: MinionDetail, e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateMinion(formData));
    router.push("/");
  };

  if (loading || !minionDetail) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <Image
          src="/minion_loading.gif"
          alt="Cargando..."
          width={200}
          height={200}
          priority
        />
        <Spinner color="warning" size="lg" />
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

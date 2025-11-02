import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinions } from "@/redux/minionsSlice";
import type { AppDispatch, RootState } from "@/redux/store";


/**
 * CUSTOM HOOK: useMinions
 * 
 * Custom hook que centraliza toda la lógica relacionada con la obtención y el estado
 * de los minions dentro de la aplicación.
 * Permite separar la lógica de negocio (fetch, control de carga, manejo de errores)
 * de la lógica de presentación de los componentes, favoreciendo la reutilización
 * y el mantenimiento del código.
 * 
 * Propósito:
 * Este hook evita duplicar código en los componentes que necesitan acceder a la lista
 * de minions, ya que se encarga de despachar automáticamente la acción fetchMinions() solo si los datos
 *  aún no han sido cargados.
 *
 */

export const useMinions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { minions, status, error, loaded } = useSelector((state: RootState) => state.minions);

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchMinions());
    }

  }, [loaded, dispatch]);

  return { minions, status, error };
};

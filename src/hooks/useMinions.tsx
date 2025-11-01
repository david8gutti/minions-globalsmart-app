// hooks/useMinions.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinions } from "@/redux/minionsSlice";
import type { AppDispatch, RootState } from "@/redux/store";

export const useMinions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { minions, status, error, loaded } = useSelector((state: RootState) => state.minions);
  console.log("DEBUG:", { status, count: minions.length });

  useEffect(() => {
    if (minions.length > 0) return; 
    if (!loaded) {
      dispatch(fetchMinions());
    }

  }, [loaded,minions.length, dispatch]);

  return { minions, status, error };
};

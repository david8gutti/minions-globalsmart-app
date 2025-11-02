// hooks/useMinions.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMinions } from "@/redux/minionsSlice";
import type { AppDispatch, RootState } from "@/redux/store";

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

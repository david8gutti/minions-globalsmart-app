import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Minion } from "../types/minion";

interface MinionsState {
  minions: Minion[];
  status: "pending" | "success" | "rejected";
  loaded: boolean;
  error?: string;
}

const initialState: MinionsState = {
  minions: [],
  status: "pending",
  loaded: false,
};

export const fetchMinions = createAsyncThunk("minions/fetchAll", async () => {
  const res = await fetch("/api/minions?page=1");
  const data = await res.json();

  const totalPages = data.totalPages ?? 1;
  const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

  const otherResults = await Promise.all(
    pages.map(async (p) => {
      const res = await fetch(`/api/minions?page=${p}`);
      const d = await res.json();
      return d.minions;
    })
  );

  const allMinionsRaw = [data.minions, ...otherResults].flat();

  const allMinions = allMinionsRaw.map((m: any) => ({
    id: m.id,
    name: m.nombre ?? m.name ?? "",
    language: m.idioma ?? m.language ?? "",
    skills: m.habilidades ?? m.skills ?? [],
  }));

  return allMinions as Minion[];
});

export const minionsSlice = createSlice({
  name: "minions",
  initialState,
  reducers: {
    addMinion: (state, action: PayloadAction<Minion>) => {
      state.minions.unshift(action.payload);
    },
    updateMinion: (state, action: PayloadAction<Minion>) => {
      const index = state.minions.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) state.minions[index] = action.payload;
    },
    deleteMinion: (state, action: PayloadAction<string>) => {
      state.minions = state.minions.filter((m) => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMinions.fulfilled, (state, action) => {
        state.status = "success";
        state.minions = action.payload;
        state.loaded = true;
      })
      .addCase(fetchMinions.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addMinion, updateMinion, deleteMinion } = minionsSlice.actions;
export default minionsSlice.reducer;

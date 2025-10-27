import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Minion } from '../types/minion';

interface MinionsState {
  minions: Minion[];
}

const initialState: MinionsState = { minions: [] };

export const minionsSlice = createSlice({
  name: 'minions',
  initialState,
  reducers: {
    setMinions: (state, action: PayloadAction<Minion[]>) => {
      state.minions = action.payload;
    },
    addMinion: (state, action: PayloadAction<Minion>) => {
      state.minions.push(action.payload);
    },
    updateMinion: (state, action: PayloadAction<Minion>) => {
      const index = state.minions.findIndex(m => m.id === action.payload.id);
      if (index !== -1) state.minions[index] = action.payload;
    },
    deleteMinion: (state, action: PayloadAction<number>) => {
      state.minions = state.minions.filter(m => m.id !== action.payload);
    },
  },
});

export const { setMinions, addMinion, updateMinion, deleteMinion } = minionsSlice.actions;
export default minionsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SelectedState {
  value: string;
}

const initialState: SelectedState = {
  value: "",
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelected: (state, action)=>{
      const { id } = action.payload;
  
      return {...state, value: id};
    },
  },
});

export const { setSelected } = selectedSlice.actions;

export const selectSelected = (state: RootState) => state.selected.value;

export default selectedSlice.reducer;

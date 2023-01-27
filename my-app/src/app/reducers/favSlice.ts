import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FavState {
  values: string[];
}

const initialState: FavState = {
  values: [],
};

const deleteFavById = (favs: string[], id: string) => {
  return  favs.filter((fav: string)=>fav !== id);
}

export const favSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
  
    deleteFav: (state, action)=>{
      const { id } = action.payload;

      const temp = {...state};    
      const values = deleteFavById(temp.values, id);
      return {...state, values: values};
    },
    insertFav: (state, action)=>{
      const { id } = action.payload;

      return {...state, values: [...state.values, id]}
    },
  },
});

export const { deleteFav, insertFav } = favSlice.actions;

export const selectFavs = (state: RootState) => state.favs.values;

export default favSlice.reducer;

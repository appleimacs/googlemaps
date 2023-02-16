import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchResults } from '../searchAPI';
import { ResultType, LocationType } from '../../Globals';

const initialState: ResultType = {
  values: [],
  filter: "",
  center: {lat:47.6062,lng:-122.3321},
  map: {},
  status: 'idle',
};

export const getResults = createAsyncThunk(
  'results/fetchResults',
  async (params:{center: LocationType, filter: string}) => {
    const { filter, center } = params;
    const response = await fetchResults(filter, center);
    return response;
  }
);

export const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setCenter: (state, action)=>{
      const { center } = action.payload;
  
      return {...state, center: center};
    },
    setMap: (state, action)=>{
      const { map } = action.payload;
  
      return {...state, map: map};
    },
    setFilter: (state, action)=>{
      const { filter } = action.payload;
  
      return {...state, filter: filter};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResults.fulfilled, (state, action) =>{
        state.status = 'idle';
        state.values = action.payload;
      })
      .addCase(getResults.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCenter, setMap, setFilter } = resultSlice.actions;

export const selectResults = (state: RootState) => state.results.values;
export const selectCenter = (state: RootState) => state.results.center;
export const selectMap = (state: RootState) => state.results.map;
export const selectFilter = (state: RootState) => state.results.filter;

export default resultSlice.reducer;

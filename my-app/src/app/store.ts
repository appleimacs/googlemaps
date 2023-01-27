import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import resultReducer from './reducers/resultSlice';
import selectedReducer from './reducers/selectedSlice';
import favReducer from './reducers/favSlice';

export const store = configureStore({
  reducer: {
    results: resultReducer,
    selected: selectedReducer,
    favs: favReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

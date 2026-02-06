import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import spacesReducer from './spacesSlice';
import bookingsReducer from './bookingsSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    spaces: spacesReducer,
    bookings: bookingsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
       
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.DEV,
});

export default store;



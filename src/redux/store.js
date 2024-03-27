import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const postPersistConfig = {
   key: 'post',
   storage,
};

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedPostReducer = persistReducer(postPersistConfig, postReducer);
export const store = configureStore({
   reducer: {
      auth: authReducer,
      post: persistedPostReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),

   //    middleware: (getDefaultMiddleware) =>
   //    getDefaultMiddleware({
   //      thunk: {
   //        extraArgument: myCustomApiService,
   //      },
   //      serializableCheck: false,
   //    }),
});

export const persistor = persistStore(store);

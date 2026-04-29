import { configureStore } from '@reduxjs/toolkit';
import app from '@/shared/store/slices/app.slice';
import config from '@/shared/utils/config';
import { Env } from '@/shared/types';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    app,
  },
  middleware: getDefaultMiddleware =>
    config.env === Env.dev ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger),
  devTools: config.env === Env.dev,
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;

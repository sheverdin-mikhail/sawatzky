import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './ReducerManager';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['addDocumentForm/setFile'],
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

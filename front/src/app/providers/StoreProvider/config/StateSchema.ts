import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { ApplicationSchema } from 'entities/Application';
import {AxiosInstance} from 'axios'
import { ApplicationDetailSchema } from 'pages/ApplicationDetailPage';
import { CreateApplicationSchema } from 'features/CreateApplication';
import { ApplicationsPageSchema } from 'pages/ApplicationsPage';
import { DirectoryNavigaionSchema } from 'widgets/DirectoryNavigaion';
import { WorkTaskGroupSchema } from 'entities/WorkTaskGroup';
import { AddWorkTaskGroupFormSchema } from 'features/AddWorkTaskGroup';

export interface StateSchema {
    user: UserSchema;

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    application?: ApplicationSchema;
    applicationDetail?: ApplicationDetailSchema; 
    createApplication?: CreateApplicationSchema; 
    applicationsPage?: ApplicationsPageSchema;
    direcotryNavigation?: DirectoryNavigaionSchema;
    workTaskGroup?: WorkTaskGroupSchema;
    addWorkTaskGroupForm?: AddWorkTaskGroupFormSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}


export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

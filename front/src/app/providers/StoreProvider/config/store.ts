import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { userReducer } from "etities/User";



export function createReduxStore(initialState?: StateSchema){

    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer
    }

    return  configureStore<StateSchema>({
        reducer: rootReducers,
        preloadedState: initialState,
    })
}



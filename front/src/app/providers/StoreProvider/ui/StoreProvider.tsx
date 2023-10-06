import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';
import { useNavigate } from 'react-router-dom';
import { DeepPartial, ReducersMapObject } from 'redux';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
    const { children, initialState, asyncReducers } = props;

    const navigate = useNavigate()
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate
    )
    


    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
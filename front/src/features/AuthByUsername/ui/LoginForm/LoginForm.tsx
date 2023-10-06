import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Title } from 'shared/ui/Title/Title';
import { useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { ReduxStoreWithManager } from 'app/providers';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Button } from 'shared/ui/Button/Button';
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';

interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

export const LoginForm: React.FC<LoginFormProps> = memo((props) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const error = useSelector(getLoginError)
    const isLoading = useSelector(getLoginIsLoading)

    

    const onChangeUsername = useCallback((value: string)=>{
        dispatch(loginActions.setUsername(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string)=>{
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback( async ()=>{
        dispatch(loginByUsername({username, password}))
    }, [dispatch, username, password])


    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.loginForm, {}, [className ?? ''])}>
                <Title className={cls.title}>Вход</Title>
                <Input placeholder='Логин' onChange={onChangeUsername} value={username} className={cls.input}/>
                <Input placeholder='Пароль' onChange={onChangePassword} value={password} className={cls.input} />
                <Button className={cls.button} disabled={isLoading}  onClick={onLoginClick} >Войти</Button>
                { error && <Text text={error} theme={TextTheme.ERROR} className={cls.error} /> }
            </div>
        </DynamicModuleLoader>
    );
})
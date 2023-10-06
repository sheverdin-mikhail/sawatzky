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

interface LoginFormProps {
    className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = memo((props) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)

    const store = useStore() as ReduxStoreWithManager

    useEffect(()=>{
        store.reducerManager.add('loginForm', loginReducer)

        return () => {
            store.reducerManager.remove('loginForm')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
        <div className={classNames(cls.loginForm, {}, [className ?? ''])}>
            <Title className={cls.title}>Вход</Title>
            <Input placeholder='Логин' onChange={onChangeUsername} value={username} className={cls.input}/>
            <Input placeholder='Пароль' onChange={onChangePassword} value={password} className={cls.input} />
            <Button className={cls.button} onClick={onLoginClick} >Войти</Button>
        </div>
    );
})
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';

interface LoginFormProps {
    className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loginForm, {}, [className ?? ''])}>
            <h1>Вход</h1>
            <Input placeholder='Логин'  className={cls.input}/>
            <Input placeholder='Пароль' className={cls.input} />
            <Button className={cls.button} >Войти</Button>
        </div>
    );
}
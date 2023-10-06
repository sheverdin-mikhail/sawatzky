import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AuthorizationPage.module.scss';
import { LoginForm } from 'features/AuthByUsername';
import { Logo } from 'shared/ui/Logo/Logo';

interface AuthorizationPageProps {
    className?: string;
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.authorizationPage, {}, [className ?? ''])}>
            <Logo width={197} className={cls.logo} />
            <LoginForm className={cls.form} />
        </div>
    );
}

export default AuthorizationPage;
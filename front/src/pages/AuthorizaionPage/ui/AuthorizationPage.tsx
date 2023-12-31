import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { LoginForm } from 'features/AuthByUsername';
import cls from './AuthorizationPage.module.scss';

interface AuthorizationPageProps {
    className?: string;
}

const AuthorizationPage: React.FC<AuthorizationPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.authorizationPage, {}, [className ?? ''])}>
      <LoginForm className={cls.form} />
    </div>
  );
};

export default AuthorizationPage;

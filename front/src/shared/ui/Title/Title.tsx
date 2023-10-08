import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Title.module.scss';
import { ReactNode } from 'react';

interface TitleProps {
    className?: string;
    children: ReactNode;
}



export const Title: React.FC<TitleProps> = (props) => {
    const { className, children } = props;

    return (
        <h1 className={classNames(cls.title, {}, [className])}>
            {children}
        </h1>
    );
}
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.scss';

interface LoaderProps {
    className?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.loader, {}, [className ?? ''])}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
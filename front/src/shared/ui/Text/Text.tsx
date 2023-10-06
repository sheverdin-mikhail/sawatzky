import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
}

export const enum TextTheme {
    NORMAL = 'normal',
    ERROR = 'error'
}

export const Text: React.FC<TextProps> = (props) => {
    const { className, title, text, theme=TextTheme.NORMAL } = props;

    return (
        <div className={classNames('', {}, [className])}>
            { title && <h2 className={classNames(cls.title, {}, [cls[theme]])}>{title}</h2> }
            { text && <p className={classNames(cls.text, {}, [cls[theme]])}>{text}</p> }
        </div>
    );
}
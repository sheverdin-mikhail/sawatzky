import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DocItem.module.scss';
import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';

interface DocItemProps {
  className?: string;
  docTitle: string;
}

export const DocItem: React.FC<DocItemProps> = (props) => {
  const { className, docTitle } = props;

  return (
    <li className={cls.item}>
      <p className={cls.title}><DocIcon /> {docTitle}</p>
      <div className={cls.btns}></div>
    </li>
  );
}
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DocList.module.scss';
import { DocItem } from '../DocItem/DocItem';

interface DocListProps {
  className?: string;
  title: string;
}

export const DocList: React.FC<DocListProps> = (props) => {
  const { className, title } = props;

  return (
    <div className={cls.docs}>
      <h2 className={cls.title}>{title}</h2>
      <ul className={cls.list}>
        <DocItem docTitle={'doc'} />
      </ul>
    </div>
  );
}
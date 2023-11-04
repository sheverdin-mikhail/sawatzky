import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DocList.module.scss';

interface DocListProps {
  className?: string;
}

export const DocList: React.FC<DocListProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.docList, {}, [className])}>

    </div>
  );
}
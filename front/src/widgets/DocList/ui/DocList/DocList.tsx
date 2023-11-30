import { classNames } from 'shared/lib/classNames/classNames';
import { Document } from 'entities/Document';
import cls from './DocList.module.scss';
import { DocItem } from '../DocItem/DocItem';
import { DoneItem } from '../DoneItem/DoneItem';

interface DocListProps {
  className?: string;
  acts?: string;
  title: string;
  docs?: Document[];
  onDelete?: () => void;
}

export const DocList: React.FC<DocListProps> = (props) => {
  const {
    className, title, docs, acts, onDelete,
  } = props;
  return (
    <div className={cls.docs}>
      {acts ? '' : <h2 className={cls.title}>{title}</h2>}
      <ul className={classNames(cls.list, {}, [className])}>
        {acts ? docs?.map((item, index) => (
          <DoneItem
            index={index}
            doc={item}
            key={item.id}
            modal={modal}
          />
        ))
          : docs?.map((item) => (
            <DocItem
              onDelete={onDelete}
              doc={item}
              key={item.id}
              modal={modal}
            />
          ))}
      </ul>
    </div>
  );
};

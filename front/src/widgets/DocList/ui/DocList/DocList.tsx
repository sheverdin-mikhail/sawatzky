import cls from './DocList.module.scss';
import { DocItem } from '../DocItem/DocItem';
import { docList } from 'widgets/DocList/model/type/docList';
import { DoneItem } from '../DoneItem/DoneItem';
import { classNames } from 'shared/lib/classNames/classNames';

interface DocListProps {
  className?: string;
  acts?: string;
  title: string;
  docs: docList[];
}

export const DocList: React.FC<DocListProps> = (props) => {
  const { className, title, docs, acts } = props;
  return (
    <div className={cls.docs}>
      {acts ? '' : <h2 className={cls.title}>{title}</h2>}
      <ul className={classNames(cls.list, {}, [className])}>
        {acts ? docs.map((item) =>
          <DoneItem docId={item.id}
            docTitle={item.title}
            date={item.date}
            time={item.time}
            key={item.id}
          />) :
          docs.map((item) =>
            <DocItem docId={item.id}
              docTitle={item.title}
              key={item.id}
            />)}
      </ul>
    </div>
  );
}
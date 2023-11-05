import cls from './DocList.module.scss';
import { DocItem } from '../DocItem/DocItem';
import { docList } from 'widgets/DocList/model/type/docList';

interface DocListProps {
  className?: string;
  title: string;
  docs: docList[];
}

export const DocList: React.FC<DocListProps> = (props) => {
  const { title, docs } = props;

  return (
    <div className={cls.docs}>
      <h2 className={cls.title}>{title}</h2>
      <ul className={cls.list}>
        {docs.map((item) =>
          <DocItem docId={item.id}
            docTitle={item.title}
            key={item.id}
          />)}
      </ul>
    </div>
  );
}
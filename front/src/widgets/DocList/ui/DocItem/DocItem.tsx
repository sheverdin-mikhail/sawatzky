import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';
import { ReactComponent as DownloadIcon } from 'shared/assets/icons/download-icon.svg';
import { ReactComponent as CancelIcon } from 'shared/assets/icons/cancel-icon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Document, deleteDocument } from 'entities/Document';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './DocItem.module.scss';

interface DocItemProps {
  className?: string;
  doc: Document;
  onDelete?: () => void;
  modal?: boolean;
}

export const DocItem: React.FC<DocItemProps> = (props) => {
  const { doc, onDelete, modal } = props;

  const dispatch = useAppDispatch();

  const onDownloadClick = useCallback(() => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name; // устанавливаем имя файла, которое будет видеть пользователь при скачивании
    document.body.appendChild(link); // добавляем ссылку в DOM
    link.click(); // имитируем клик по ссылке
    document.body.removeChild(link);
  }, [doc]);

  const onDeleteHandler = () => {
    dispatch(deleteDocument(doc.id)).then(() => onDelete?.());
  };

  return (
    <li className={cls.item} id={doc.id}>
      <p className={cls.title}>
        <Button theme={ButtonThemes.CLEAR} className={cls.icon}><DocIcon /></Button>
        {doc.name}
      </p>
      <div className={cls.btns}>
        <Button theme={ButtonThemes.WHITE_ROUND} onClick={onDeleteHandler}> <CancelIcon /> </Button>
        {!modal
          && (<Button theme={ButtonThemes.WHITE_ROUND} onClick={onDownloadClick}> <DownloadIcon /> </Button>)}
      </div>
    </li>
  );
};

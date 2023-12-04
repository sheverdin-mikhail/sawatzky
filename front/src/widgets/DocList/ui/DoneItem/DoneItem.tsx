import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';
import { ReactComponent as DownloadIcon } from 'shared/assets/icons/download-icon.svg';
import { ReactComponent as MoreIcon } from 'shared/assets/icons/more-icon.svg';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { Document } from 'entities/Document';
import { getDateString } from 'shared/lib/getDateString/getDateString';
import cls from './DoneItem.module.scss';

interface DoneItemProps {
  className?: string;
  doc: Document;
  index: number;
  modal: boolean;
}

export const DoneItem: React.FC<DoneItemProps> = (props) => {
  const {
    doc,
    index,
    modal,
  } = props;

  const modsItem: Mods = {
    [cls.iconHide]: index === 0,
  };

  const onDownloadClick = useCallback(() => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name; // устанавливаем имя файла, которое будет видеть пользователь при скачивании
    document.body.appendChild(link); // добавляем ссылку в DOM
    link.click(); // имитируем клик по ссылке
    document.body.removeChild(link);
  }, [doc]);

  return (
    <li className={classNames(cls.item, modsItem, [])} id={doc?.id}>
      <p className={cls.title}>
        <Button theme={ButtonThemes.CLEAR} className={classNames(cls.icon, modsItem, [])}><DocIcon /></Button>
        {doc?.name}
      </p>
      <Button disabled={index !== 0} theme={ButtonThemes.WHITE_ROUND} onClick={onDownloadClick}> <DownloadIcon /> </Button>
      <p className={cls.title}>{getDateString(new Date(doc.createdAt), true)}</p>
      {/* <p className={cls.title}>{time}</p> */}
      {
        modal && <Button theme={ButtonThemes.CLEAR} className={classNames(cls.icon, modsItem, [])} disabled={index !== 0}><MoreIcon /></Button>
      }
    </li>
  );
};

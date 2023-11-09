import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';
import { ReactComponent as DownloadIcon } from 'shared/assets/icons/download-icon.svg';
import { ReactComponent as MoreIcon } from 'shared/assets/icons/more-icon.svg';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import cls from './DoneItem.module.scss';

interface DoneItemProps {
  className?: string;
  docTitle: string;
  docId: string;
  date?: string;
  time?: string;
}

export const DoneItem: React.FC<DoneItemProps> = (props) => {
  const {
    docTitle, docId, date, time,
  } = props;

  const modsItem: Mods = {
    [cls.iconHide]: docId === '1',
  };

  return (
    <li className={classNames(cls.item, modsItem, [])} id={docId}>
      <p className={cls.title}>
        <Button theme={ButtonThemes.CLEAR} className={classNames(cls.icon, modsItem, [])}><DocIcon /></Button>
        {docTitle}
      </p>
      <Button theme={ButtonThemes.WHITE_ROUND}> <DownloadIcon /> </Button>
      <p className={cls.title}>{date}</p>
      <p className={cls.title}>{time}</p>
      <Button theme={ButtonThemes.CLEAR} className={classNames(cls.icon, modsItem, [])} disabled={docId !== '1'}><MoreIcon /></Button>
    </li>
  );
};

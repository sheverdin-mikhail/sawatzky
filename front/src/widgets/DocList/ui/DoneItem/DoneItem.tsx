import cls from './DoneItem.module.scss';
import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';
import { ReactComponent as DownloadIcon } from 'shared/assets/icons/download-icon.svg';
import { ReactComponent as MoreIcon } from 'shared/assets/icons/more-icon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface DoneItemProps {
  className?: string;
  docTitle: string;
  docId: string;
  date?: string;
  time?: string;
}

export const DoneItem: React.FC<DoneItemProps> = (props) => {
  const { docTitle, docId, date, time } = props;

  return (
    <li className={cls.item} id={docId}>
      <p className={cls.title}><DocIcon className={cls.icon} /> {docTitle}</p>
      <Button theme={ButtonThemes.WHITE_ROUND}> <DownloadIcon /> </Button>
      <p className={cls.title}>{date}</p>
      <p className={cls.title}>{time}</p>
      <Button theme={ButtonThemes.CLEAR} className={cls.icon}><MoreIcon /></Button>
    </li>
  );
}
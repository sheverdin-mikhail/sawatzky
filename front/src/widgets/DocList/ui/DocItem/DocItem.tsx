import cls from './DocItem.module.scss';
import { ReactComponent as DocIcon } from 'shared/assets/icons/docs-icon.svg';
import { ReactComponent as DownloadIcon } from 'shared/assets/icons/download-icon.svg';
import { ReactComponent as CancelIcon } from 'shared/assets/icons/cancel-icon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface DocItemProps {
  className?: string;
  docTitle: string;
  docId: string;
}

export const DocItem: React.FC<DocItemProps> = (props) => {
  const { docTitle, docId } = props;

  return (
    <li className={cls.item} id={docId}>
      <p className={cls.title}><DocIcon /> {docTitle}</p>
      <div className={cls.btns}>
        <Button theme={ButtonThemes.WHITE_ROUND}> <CancelIcon /> </Button>
        <Button theme={ButtonThemes.WHITE_ROUND}> <DownloadIcon /> </Button>
      </div>
    </li>
  );
}
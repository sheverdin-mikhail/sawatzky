import { CollapsBoard } from 'widgets/CollapsBoard';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DocList } from 'widgets/DocList';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import { Document } from 'entities/Document';
import cls from './ApplicationDetailActs.module.scss';

interface ApplicationDetailActsProps {
  className?: string;
  acts?: Document[];
}

export const ApplicationDetailActs: React.FC<ApplicationDetailActsProps> = (props) => {
  const { acts } = props;

  return (
    <CollapsBoard title="Акт выполненных работ" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
      <div className={cls.actsBlock}>
        {/* <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn}>+ Добавить </Button> */}
        <DocList docs={acts} title="Список документов" acts="acts" className={cls.docList} />
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.blueBtn}>отправить на подтверждение заказчику</Button>
      </div>
    </CollapsBoard>
  );
};

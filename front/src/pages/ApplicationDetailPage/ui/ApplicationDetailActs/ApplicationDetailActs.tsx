import { CollapsBoard } from 'widgets/CollapsBoard';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DocList } from 'widgets/DocList';
import { docList } from 'widgets/DocList/model/type/docList';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import cls from './ApplicationDetailActs.module.scss';

interface ApplicationDetailActsProps {
  className?: string;
}

export const ApplicationDetailActs: React.FC<ApplicationDetailActsProps> = (props) => {
  const docList: docList[] = [
    {
      id: '1', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
    {
      id: '2', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
    {
      id: '3', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
  ];

  return (
    <CollapsBoard title="Акт выполненных работ" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
      <div className={cls.actsBlock}>
        <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn}>+ Добавить </Button>
        <DocList docs={docList} title="Список документов" acts="acts" className={cls.docList} />
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.blueBtn}>отправить на подтверждение заказчику</Button>
      </div>
    </CollapsBoard>
  );
};

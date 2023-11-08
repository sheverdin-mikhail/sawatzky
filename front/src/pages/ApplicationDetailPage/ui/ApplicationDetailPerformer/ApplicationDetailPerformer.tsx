import { CollapsBoard } from 'widgets/CollapsBoard';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import { Performer } from 'widgets/Performer';
import { performer } from 'widgets/Performer/model/type/Performer';
import cls from './ApplicationDetailPerformer.module.scss';

interface ApplicationDetailPerformerProps {
  className?: string;
}

export const ApplicationDetailPerformer: React.FC<ApplicationDetailPerformerProps> = (props) => {
  const firstPerformer: performer = {
    id: '1',
    name: 'Иванов А.А.',
    priority: 'срочно',
    status: 'отправлено исполнителю',
    done: false,
    date: 'дата',
    time: 'время',
  };

  return (
    <CollapsBoard title="Исполнитель" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
      <Performer item={firstPerformer} className={cls.performer} />
    </CollapsBoard>
  );
};

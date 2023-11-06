import cls from './ApplicationDetailPerformer.module.scss';
import { CollapsBoard } from 'widgets/CollapsBoard';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';

interface ApplicationDetailPerformerProps {
  className?: string;
}


export const ApplicationDetailPerformer: React.FC<ApplicationDetailPerformerProps> = (props) => {

  return (
    <CollapsBoard title='Исполнитель' className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>

    </CollapsBoard>
  );
}
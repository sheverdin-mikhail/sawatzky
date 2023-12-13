import { CollapsBoard } from 'widgets/CollapsBoard';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import { Performer } from 'widgets/Performer';
import { ApplicationPerformer } from 'entities/Performer';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addPerformerToApplicationFormActions } from 'features/AddPerformerToApplication';
import cls from './ApplicationDetailPerformer.module.scss';

interface ApplicationDetailPerformerProps {
  className?: string;
  performers?: ApplicationPerformer[];
}

export const ApplicationDetailPerformer: React.FC<ApplicationDetailPerformerProps> = (props) => {
  const { performers } = props;

  const dispatch = useAppDispatch();

  return (
    <>
      <CollapsBoard title="Исполнитель" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
        <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.addBtn} onClick={() => dispatch(addPerformerToApplicationFormActions.openModal())}>+ Добавить </Button>
        {
          performers?.map((item) => <Performer item={item} key={item.performer.id} className={cls.performer} />)
        }
      </CollapsBoard>
    </>
  );
};

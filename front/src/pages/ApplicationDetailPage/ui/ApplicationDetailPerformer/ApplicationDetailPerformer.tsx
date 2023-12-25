import { CollapsBoard } from 'widgets/CollapsBoard';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import { Performer } from 'widgets/Performer';
import { ApplicationPerformer } from 'entities/Performer';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addPerformerToApplicationFormActions } from 'features/AddPerformerToApplication';
import { useCallback } from 'react';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import cls from './ApplicationDetailPerformer.module.scss';

interface ApplicationDetailPerformerProps {
  className?: string;
  performers?: ApplicationPerformer[];
  applicationId: string;
}

export const ApplicationDetailPerformer: React.FC<ApplicationDetailPerformerProps> = (props) => {
  const { performers, applicationId } = props;

  const dispatch = useAppDispatch();
  const { isDispatcher, isDispatcherPerformer } = useUserData();

  const onDeleteHandler = useCallback((performer: ApplicationPerformer) => {
    // dispatch(addPerformerToApplicationFormActions)
  }, []);

  return (
    <>
      <CollapsBoard title="Исполнитель" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
        {
          (isDispatcher || isDispatcherPerformer)
          && <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.addBtn} onClick={() => dispatch(addPerformerToApplicationFormActions.openModal())}>+ Добавить </Button>
        }
        {
          performers?.map((item) => <Performer applicationId={applicationId} onDelete={onDeleteHandler} item={item} key={item.performer.id} className={cls.performer} />)
        }
      </CollapsBoard>
    </>
  );
};

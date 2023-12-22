import { CollapsBoard } from 'widgets/CollapsBoard';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DocList } from 'widgets/DocList';
import { CollapsBoardThemes } from 'widgets/CollapsBoard/ui/CollapsBoard/CollapsBoard';
import { Document } from 'entities/Document';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { nextApplicationStep } from 'pages/ApplicationDetailPage/model/services/nextApplicationStep/nextApplicationStep';
import { getApplicationDetail } from 'pages/ApplicationDetailPage/model/slice/applicationDetailSlice';
import { StateSchema } from 'app/providers';
import { useSelector } from 'react-redux';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { PerformerStatus } from 'entities/Performer';
import cls from './ApplicationDetailActs.module.scss';

interface ApplicationDetailActsProps {
  className?: string;
  acts?: Document[];
  applicationId: string;
}

export const ApplicationDetailActs: React.FC<ApplicationDetailActsProps> = (props) => {
  const { acts, applicationId } = props;

  const dispatch = useAppDispatch();
  const { isDispatcher, isInitiator } = useUserData();
  const step = useSelector((state: StateSchema) => getApplicationDetail.selectById(state, applicationId))?.step;
  const application = useSelector((state: StateSchema) => getApplicationDetail.selectById(state, applicationId));
  const isCompleted = Boolean(application?.performers?.find((performer) => performer.status === PerformerStatus.COMPLETED));

  if (acts && acts?.length > 0) {
    return (
      <CollapsBoard title="Акт выполненных работ" className={cls.Collapse} theme={CollapsBoardThemes.GRAY}>
        <div className={cls.actsBlock}>
          {/* <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn}>+ Добавить </Button> */}
          <DocList docs={acts} title="Список документов" acts="acts" className={cls.docList} />
          {
            (step && step === 4 && isDispatcher && isCompleted) && (
              <Button
                className={cls.blueBtn}
                theme={ButtonThemes.BLUE_SOLID}
                onClick={() => dispatch(nextApplicationStep({
                  applicationId,
                  step,
                }))}
              >Отправить на подтверждение заказчику
              </Button>
            )
          }
          {
            (step && step === 6 && isDispatcher) && (
              <Button
                className={cls.blueBtn}
                theme={ButtonThemes.BLUE_SOLID}
                onClick={() => dispatch(nextApplicationStep({
                  applicationId,
                  step,
                }))}
              >Завершить заявку
              </Button>
            )
          }
          {
            (step && step === 5 && isInitiator) && (
              <Button
                className={cls.blueBtn}
                theme={ButtonThemes.BLUE_SOLID}
                onClick={() => dispatch(nextApplicationStep({
                  applicationId,
                  step,
                }))}
              >Согласовать
              </Button>
            )
          }
        </div>
      </CollapsBoard>
    );
  }
  return null;
};

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ApplicationStatus } from 'entities/Application';
import { memo, useMemo } from 'react';
import cls from './Tag.module.scss';

interface TagProps {
    className?: string;
    status: ApplicationStatus;
}

export const Tag: React.FC<TagProps> = memo((props) => {
  const { className, status = ApplicationStatus.NEW } = props;

  const TagMods: Mods = {
    [cls.new]: status === ApplicationStatus.NEW,
    [cls.coordination]: status === ApplicationStatus.COORDINATION || status === ApplicationStatus.WAITING_FINISH,
    [cls.paymentCoordination]: status === ApplicationStatus.PAYMENT_COORDINATION,
    [cls.inWork]: status === ApplicationStatus.IN_WORK,
    [cls.processed]: status === ApplicationStatus.PROCESSED,
    [cls.finished]: status === ApplicationStatus.FINISHED,
  };

  const statusMessage = useMemo(() => {
    switch (status) {
    case ApplicationStatus.NEW:
      return 'Запрос создан';
    case ApplicationStatus.COORDINATION:
      return 'На согласовании у заказчика';
    case ApplicationStatus.PAYMENT_COORDINATION:
      return 'Ожидается оплата';
    case ApplicationStatus.IN_WORK:
      return 'Отправлено исполнителю';
    case ApplicationStatus.PROCESSED:
      return 'Обрабатывается';
    case ApplicationStatus.WAITING_FINISH:
      return 'Ожидает подтверждения завершения';
    case ApplicationStatus.FINISHED:
      return 'Запрос выполнен';
    }
  }, [status]);

  return (
    <div className={classNames(cls.tag, TagMods, [className])}>
      {statusMessage}
    </div>
  );
});

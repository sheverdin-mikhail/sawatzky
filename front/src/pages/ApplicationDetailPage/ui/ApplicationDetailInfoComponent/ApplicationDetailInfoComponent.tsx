import { classNames } from 'shared/lib/classNames/classNames';
import { getDateString } from 'shared/lib/getDateString/getDateString';
import { Tag } from 'shared/ui/Tag/Tag';
import cls from './ApplicationDetailInfoComponent.module.scss';
import { ApplicationInfo } from '../../model/type/applicationDetail';

interface ApplicationDetailInfoComponentProps {
	className?: string;
	info: ApplicationInfo;
}

export const ApplicationDetailInfoComponent: React.FC<ApplicationDetailInfoComponentProps> = (props) => {
  const { className, info } = props;

  return (
    <div className={classNames(cls.applicationDetailInfoComponent, {}, [className])}>
      <div className={classNames(cls.firstColumn, {}, [cls.column])}>
        <h2 className={cls.title}>Информация по запросу</h2>
        <span className={classNames(cls.text, {}, [cls.name])}><b className={cls.textBold}>Название: </b>{ info.title }</span>
        <span className={cls.text}><b className={cls.textBold}>ID:</b> {info.id}</span>
        <span className={cls.text}><b className={cls.textBold}>Создал запрос:</b> { info.creator?.fio }</span>
        <Tag status={info.status} />
      </div>
      <div className={classNames(cls.secondColumn, {}, [cls.column])}>
        <span className={cls.text}>
          <b className={cls.textBold}>Дата запроса: </b>
          { getDateString(new Date(info.createdAt), true) }
        </span>
        <span className={cls.text}>
          <b className={cls.textBold}>Дата проведения работ: </b>
          {
            info.startWorkDate && info.endWorkDate
              ? `${getDateString(new Date(info.startWorkDate), true)} — ${getDateString(new Date(info.endWorkDate), true)}`
              : 'Дата отсутствует'
          }
        </span>
      </div>
      <div className={cls.verticalLine} />
      <div className={classNames(cls.thirdColumn, {}, [cls.column])}>
        <span className={cls.text}>
          { info.description }
        </span>
      </div>
    </div>
  );
};

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectTreeHeader.module.scss';
import { DirectoryObjectTreeHeaderItem } from '../DirectoryObjectTreeHeaderItem/DirectoryObjectTreeHeaderItem';

interface DirectoryObjectTreeHeaderProps {
  className?: string;
}

export const DirectoryObjectTreeHeader: React.FC<DirectoryObjectTreeHeaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.directoryObjectTreeHeader, {}, [className])}>
      <DirectoryObjectTreeHeaderItem>
        <p className={cls.textMain}>Исполнительный директор
          <span className={cls.bold}> Иванов Иван Иванович</span>
        </p>
      </DirectoryObjectTreeHeaderItem>

      <DirectoryObjectTreeHeaderItem>
        <p className={cls.textSub}>Первое управление департамента по управлению и эксплуатации недвижимости Операционный директор
          <span className={cls.bold}> Петров Петр Петрович</span>
        </p>
      </DirectoryObjectTreeHeaderItem>
    </div>
  );
};

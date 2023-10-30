import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Progressbar.module.scss';

interface ProgressbarProps {
  className?: string;
}

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.progressbar, {}, [className])}>
      <ul className={classNames(cls.list, {}, [className])}>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.done_start, {}, [cls.done])}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M4.47059 8C4.35477 7.99842 4.24373 7.95339 4.15925 7.87376L1.10044 4.80019C1.03075 4.71488 0.995145 4.60657 1.00053 4.49634C1.00592 4.38611 1.05192 4.28183 1.12959 4.20379C1.20725 4.12575 1.31103 4.07952 1.42073 4.07411C1.53044 4.0687 1.63822 4.10448 1.72312 4.1745L4.47059 6.94071L10.2769 1.10092C10.3618 1.0309 10.4696 0.995122 10.5793 1.00054C10.689 1.00595 10.7927 1.05217 10.8704 1.13021C10.9481 1.20825 10.9941 1.31253 10.9995 1.42276C11.0049 1.533 10.9692 1.6413 10.8996 1.72661L4.78194 7.87376C4.69746 7.95339 4.58641 7.99842 4.47059 8Z" fill="white" stroke="white" stroke-width="0.8" />
            </svg>
          </div>
          <p className={classNames(cls.title, {}, [className])}>Новая</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.done, {}, [cls.done_cancel, cls.done_start])}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M4.47059 8C4.35477 7.99842 4.24373 7.95339 4.15925 7.87376L1.10044 4.80019C1.03075 4.71488 0.995145 4.60657 1.00053 4.49634C1.00592 4.38611 1.05192 4.28183 1.12959 4.20379C1.20725 4.12575 1.31103 4.07952 1.42073 4.07411C1.53044 4.0687 1.63822 4.10448 1.72312 4.1745L4.47059 6.94071L10.2769 1.10092C10.3618 1.0309 10.4696 0.995122 10.5793 1.00054C10.689 1.00595 10.7927 1.05217 10.8704 1.13021C10.9481 1.20825 10.9941 1.31253 10.9995 1.42276C11.0049 1.533 10.9692 1.6413 10.8996 1.72661L4.78194 7.87376C4.69746 7.95339 4.58641 7.99842 4.47059 8Z" fill="white" stroke="white" stroke-width="0.8" />
            </svg>
          </div>
          <p className={classNames(cls.title, {}, [className])}>Обрабатывается</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.done_end, {}, [cls.done])}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M4.47059 8C4.35477 7.99842 4.24373 7.95339 4.15925 7.87376L1.10044 4.80019C1.03075 4.71488 0.995145 4.60657 1.00053 4.49634C1.00592 4.38611 1.05192 4.28183 1.12959 4.20379C1.20725 4.12575 1.31103 4.07952 1.42073 4.07411C1.53044 4.0687 1.63822 4.10448 1.72312 4.1745L4.47059 6.94071L10.2769 1.10092C10.3618 1.0309 10.4696 0.995122 10.5793 1.00054C10.689 1.00595 10.7927 1.05217 10.8704 1.13021C10.9481 1.20825 10.9941 1.31253 10.9995 1.42276C11.0049 1.533 10.9692 1.6413 10.8996 1.72661L4.78194 7.87376C4.69746 7.95339 4.58641 7.99842 4.47059 8Z" fill="white" stroke="white" stroke-width="0.8" />
            </svg>
          </div>
          <p className={classNames(cls.title, {}, [className])}>На согласовании
            у заказчика</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.step, {}, [cls.step_end])}>
            4
          </div>
          <p className={classNames(cls.title, {}, [className])}>Стоимость<br></br>
            работ</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.step, {}, [cls.step_end])}>
            5
          </div>
          <p className={classNames(cls.title, {}, [className])}>В работе</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.step, {}, [cls.step_end])}>
            6
          </div>
          <p className={classNames(cls.title, {}, [className])}>На согласовании
            у заказчика</p>
        </li>
        <li className={classNames(cls.item, {}, [className])}>
          <div className={classNames(cls.step, {}, [cls.step_cancel])}>
            7
          </div>
          <p className={classNames(cls.title, {}, [className])}>Сделано</p>
        </li>
      </ul>
    </div>
  );
}
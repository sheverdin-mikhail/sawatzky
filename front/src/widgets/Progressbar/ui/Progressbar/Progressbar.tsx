import cls from './Progressbar.module.scss';
import { ProgressbarStep } from '../ProgressbarStep/ProgressbarStep';

export const ProgressSteps: { id: string, title: string }[] = [
  { id: '1', title: 'Новая' },
  { id: '2', title: 'Обрабатывается' },
  { id: '3', title: 'На согласовании у заказчика' },
  { id: '4', title: 'Стоимость работ' },
  { id: '5', title: 'В работе' },
  { id: '6', title: 'На согласовании у заказчика' },
  { id: '7', title: 'Сделано' },
];

interface ProgressbarProps {
  className?: string;
  step: number;
}

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const { step } = props;

  return (
    <div className={cls.progressbar}>
      <ul className={cls.list}>
        {ProgressSteps.map((item) =>
          <ProgressbarStep step={step} id={item.id} title={item.title} key={item.id} />
        )}
      </ul>
    </div>
  );
}
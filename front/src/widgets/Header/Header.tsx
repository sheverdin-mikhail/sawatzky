import { classNames } from 'shared/lib/classNames/classNames';
import { Logo } from 'shared/ui/Logo/Logo';
import { DropdownMenu } from 'widgets/DropdownMenu/DropdownMenu';
import cls from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.header, {}, [className ?? ''])}>
      <Logo width={121} className={cls.logo} />
      <DropdownMenu />
    </div>
  );
};

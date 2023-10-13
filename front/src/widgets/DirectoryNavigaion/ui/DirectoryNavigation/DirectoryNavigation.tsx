import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryNavigation.module.scss';
import { DirectoryNavigationLinks } from '../DirectoryNavigationLinks/DirectoryNavigationLinks';

interface DirectoryNavigationProps {
	className?: string;
}

export const DirectoryNavigation: React.FC<DirectoryNavigationProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.directoryNavigation, {}, [className])}>
			<DirectoryNavigationLinks />
		</div>
	);
}
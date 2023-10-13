import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryNavigationLinkItem.module.scss';

interface DirectoryNavigationLinkItemProps {
	className?: string;
}

export const DirectoryNavigationLinkItem: React.FC<DirectoryNavigationLinkItemProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.directoryNavigationLinkItem, {}, [className])}>
			DirectoryNavigationLinkItem
		</div>
	);
}
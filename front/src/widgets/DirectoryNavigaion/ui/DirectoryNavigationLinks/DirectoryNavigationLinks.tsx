import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryNavigationLinks.module.scss';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import { DirectoryNavigationLinkItem } from '../DirectoryNavigationLinkItem/DirectoryNavigationLinkItem';

interface DirectoryNavigationLinksProps {
	className?: string;
}

export const DirectoryNavigationLinks: React.FC<DirectoryNavigationLinksProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.directoryNavigationLinks, {}, [className])}>
			{
			}
		</div>
	);
}
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryNavigationLinks.module.scss';
import { DirectoryLinkType } from '../../model/type/directoryNavigation';
import { DirectoryNavigationLinkItem } from '../DirectoryNavigationLinkItem/DirectoryNavigationLinkItem';

interface DirectoryNavigationLinksProps {
	className?: string;
	links?: DirectoryLinkType[]; 
}

export const DirectoryNavigationLinks: React.FC<DirectoryNavigationLinksProps> = (props) => {
	const { className, links } = props;

	return (
		<div className={classNames(cls.directoryNavigationLinks, {}, [className])}>
			{
				links && links.map((link) => 
				<DirectoryNavigationLinkItem 
					className={cls.link} 
					link={link} 
					key={`directoryNavLink_${link.path}`}
				/>)
			}
		</div>
	);
}
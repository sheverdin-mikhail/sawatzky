import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryNavigationLinks } from '../DirectoryNavigationLinks/DirectoryNavigationLinks';
import { useSelector } from 'react-redux';
import { getDirectoryNavigationPage } from 'widgets/DirectoryNavigaion/model/slice/directoryNavigationSlice';

interface DirectoryNavigationProps {
	className?: string;
}

export const DirectoryNavigation: React.FC<DirectoryNavigationProps> = (props) => {
	const { className } = props;

	const links = useSelector(getDirectoryNavigationPage.selectAll)

	console.log(links)

	return (
		<div className={classNames('', {}, [className])}>
			<DirectoryNavigationLinks links={links} />
		</div>
	);
}
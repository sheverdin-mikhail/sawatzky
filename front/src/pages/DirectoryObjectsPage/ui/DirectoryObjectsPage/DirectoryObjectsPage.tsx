import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectsPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';

interface DirectoryObjectsPageProps {
	className?: string;
}

const DirectoryObjectsPage: React.FC<DirectoryObjectsPageProps> = (props) => {
	const { className } = props;

	return (
		<DirectoryPageWrapper className={classNames(cls.directoryObjectsPage, {}, [className])}>
			
		</DirectoryPageWrapper>
	);
}


export default DirectoryObjectsPage;
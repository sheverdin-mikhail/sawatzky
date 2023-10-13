import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectsPage.module.scss';
import { Title } from 'shared/ui/Title/Title';
import { DirectoryNavigation } from 'widgets/DirectoryNavigaion';

interface DirectoryObjectsPageProps {
	className?: string;
}

const DirectoryObjectsPage: React.FC<DirectoryObjectsPageProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.directoryObjectsPage, {}, [className])}>
			<Title className={cls.title}>Справочнки</Title>
			<DirectoryNavigation />
		</div>
	);
}


export default DirectoryObjectsPage;
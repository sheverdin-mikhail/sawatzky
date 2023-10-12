import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryPage.module.scss';

interface DirectoryPageProps {
	className?: string;
}

const DirectoryPage: React.FC<DirectoryPageProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.directoryPage, {}, [className])}>
			DirectoryPage
		</div>
	);
}


export default DirectoryPage;
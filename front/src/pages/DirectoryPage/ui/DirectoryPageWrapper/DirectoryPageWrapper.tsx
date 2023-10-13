import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryPageWrapper.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { directoryNavigationReducer } from 'widgets/DirectoryNavigaion';

interface DirectoryPageWrapperProps {
	className?: string;
}

const reducers: ReducersList = {
	direcotryNavigation: directoryNavigationReducer
}
export const DirectoryPageWrapper: React.FC<DirectoryPageWrapperProps> = (props) => {
	const { className } = props;

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.directoryPageWrapper, {}, [className])}>
			</div>
		</DynamicModuleLoader>
	);
}
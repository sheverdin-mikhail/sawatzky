import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectsPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { Table, TableType } from 'widgets/Table';
import { AddObjectForm } from 'features/AddObject/ui/AddObjectForm/AddObjectForm';

interface DirectoryObjectsPageProps {
	className?: string;
}

const DirectoryObjectsPage: React.FC<DirectoryObjectsPageProps> = (props) => {
	const { className } = props;

	const tableData: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование группы',
			code: 'Код объекта',
		},
		items: [
			{
				id: '1',
				name: 'Группа объектов № 15',
				code: '12345'
			},
			{
				id: '2',
				name: 'Группа объектов № 15',
				code: '12346'
			},
		]
	}

	return (
		<DirectoryPageWrapper className={classNames(cls.directoryObjectsPage, {}, [className])}>
			<div className={cls.buttons}>
				<Button helpInfo='Добавить объект' className={cls.button} theme={ButtonThemes.ICON}  >
					<AddIcon />
				</Button>
				<Button helpInfo='Удалить объект' className={cls.button} theme={ButtonThemes.ICON}  >
					<DeleteIcon />
				</Button>
			</div>
			<Table data={tableData} />
			<AddObjectForm className={cls.form} />
		</DirectoryPageWrapper>
	);
}


export default DirectoryObjectsPage;
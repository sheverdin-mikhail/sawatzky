import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryLegalEntityPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { Table, TableType } from 'widgets/Table';
import { CreateLegalEntity } from 'features/CreateLegalEntity';

interface DirectoryLegalEntityPageProps {
	className?: string;
}

const DirectoryLegalEntityPage: React.FC<DirectoryLegalEntityPageProps> = (props) => {
	const { className } = props;

	const tableData: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование компании',
			group: 'Группа объектов',
			object: 'Объект',
		},
		items: [
			{
				id: '1',
				name: 'Наименование Юр. лица',
				group: 'Группа объектов № 15',
				object: '12345',
			},
		
			{
				id: '2',
				name: 'Наименование Юр. лица 2',
				group: 'Группа объектов № 15',
				object: '12346',
			},
		
		]
	}

	return (
		<DirectoryPageWrapper className={classNames(cls.directoryLegalEntityPage, {}, [className])}>
			<div className={cls.buttons}>
				<Button helpInfo='Добавить объект' className={cls.button} theme={ButtonThemes.ICON}  >
					<AddIcon />
				</Button>
				<Button helpInfo='Удалить объект' className={cls.button} theme={ButtonThemes.ICON}  >
					<DeleteIcon />
				</Button>
			</div>
			<Table data={tableData} />
			<CreateLegalEntity className={cls.form} />
		</DirectoryPageWrapper>
	);
}


export default DirectoryLegalEntityPage;
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectsGroupPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { Table, TableItemsMod, TableType } from 'widgets/Table';
import { AddObjectsGroupForm } from 'features/AddObjectsGroup';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}

const DirectoryObjectsGroupPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
	const { className } = props;

	const tableData: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование группы',
		},
		items: [
			{
				id: '15',
				name: 'Группа объектов № 15'
			},
			{
				id: '16',
				name: 'Группа объектов № 16'
			},
		]
	}

	return (
		<DirectoryPageWrapper className={classNames(cls.directoryObjectsGroupPage, {}, [className])}>
			<div className={cls.buttons}>
				<Button helpInfo='Добавить группу объектов' className={cls.button} theme={ButtonThemes.ICON}  >
					<AddIcon />
				</Button>
				<Button helpInfo='Удалить группу объектов' className={cls.button} theme={ButtonThemes.ICON}  >
					<DeleteIcon />
				</Button>
			</div>
			<Table mod={TableItemsMod.LINK} path={DirectoryPath.object} data={tableData} />

			<AddObjectsGroupForm className={cls.form} />
		</DirectoryPageWrapper>
	);
}


export default DirectoryObjectsGroupPage;
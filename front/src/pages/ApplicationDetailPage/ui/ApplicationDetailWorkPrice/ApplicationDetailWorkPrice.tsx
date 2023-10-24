import cls from './ApplicationDetailWorkPrice.module.scss';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { TableType } from 'widgets/Table';
import { getTime } from 'shared/lib/helpers/getTime';
import { WorkMaterial } from 'entities/WorkMaterial';
import { CollapsBoard } from 'widgets/CollapsBoard';
import { ApplicationWorkTask } from 'entities/Application';
import { useTable } from 'shared/lib/hooks/useTable';

interface ApplicationDetailWorkPriceProps {
	className?: string;
	workTasks?: ApplicationWorkTask[];
}

export const ApplicationDetailWorkPrice: React.FC<ApplicationDetailWorkPriceProps> = (props) => {
	const { workTasks=[] } = props;
	
	
	const workMaterials: WorkMaterial[] = [
		{
			id: '1',
			name: 'Материал номер 1',
			price: 700,
			count: 40
		},
		{
			id: '2',
			name: 'Материал номер 2',
			price: 1200,
			count: 20
		},
	] 
	const workTasksTable: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование работ',
			price: 'Цена',
			time: 'Время',
			sum: 'Сумма',
		},
		items: workTasks.map((item)=>{

		const { hours, minuts } = getTime(item.actualTime)
		const sum = item.workTask.price*hours + Math.floor(item.workTask.price*minuts/60)
		const timeString =  minuts > 0 && hours > 0 
			? `${hours} ч ${minuts} м` 
			: minuts > 0 
				? `${minuts} м` 
				: `${hours} ч` 

		return {
			id: item.workTask.id,
			name: item.workTask.name,
			price: `${item.workTask.price} ₽/час`,
			time: timeString,
			sum: `${ sum } руб`
		}
	})
		

	}
	const workMaterialsTable: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование работ',
			price: 'Цена',
			time: 'Количество штук',
			sum: 'Сумма',
		},
		items: workMaterials.map(item => {

			const sum = item.count * item.price

			return {
				id: item.id,
				name: item.name,
				price: `${item.price} ₽/шт`,
				time: `${item.count}  шт`,
				sum: `${sum} руб`
			}
		})
	}

	const workTotalPrice = workTasks.reduce((prev, item)=>{
		const { hours, minuts } = getTime(item.actualTime)
		const sum = item.workTask.price*hours + Math.floor(item.workTask.price*minuts/60)
		return prev + sum
	}, 0)

	const materialTotalPrice = workMaterials.reduce((prev, item) => {
		const sum = item.count * item.price
		return prev + sum
	}, 0)

	const clearPrice = workTotalPrice + materialTotalPrice

	const { Table: WorkTasksTable } = useTable({
		data: workTasksTable,
		className: cls.table
		// onDelete: onTableDeleteHandler
	})

	const { Table: WorkMaterialsTable } = useTable({
		data: workMaterialsTable,
		className: cls.table
		// onDelete: onTableDeleteHandler
	})

	return (
		<CollapsBoard title='Стоимость работ' >
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить работы </Button>
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить расходный материал </Button>
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Загрузить документ </Button>
			<div className={cls.tablesBlock}>
				{WorkTasksTable}
				{WorkMaterialsTable}
				<p className={cls.price}>Общая стоимость работ/услуг и материалов составляет <b className={cls.totalPrice}>{clearPrice} ₽</b> без НДС </p>
				<p className={cls.price}>Общая стоимость работ/услуг и материалов составляет <b className={cls.totalPrice}>{clearPrice} ₽</b> сумма с НДС </p>
			</div>
		</CollapsBoard>
	);
}
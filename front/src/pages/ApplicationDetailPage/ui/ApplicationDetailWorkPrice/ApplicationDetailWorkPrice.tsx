import cls from './ApplicationDetailWorkPrice.module.scss';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Table, TableType } from 'widgets/Table';
import { WorkTask } from 'entities/WorkTask';
import { getTime } from 'shared/lib/helpers/getTime';
import { WorkMaterial } from 'entities/WorkMaterial';
import { CollapsBoard } from 'widgets/CollapsBoard';

interface ApplicationDetailWorkPriceProps {
	className?: string;
}

export const ApplicationDetailWorkPrice: React.FC<ApplicationDetailWorkPriceProps> = (props) => {
	// const { } = props;


	const workTasks: WorkTask[] = [
		{
			id: '1',
			name: 'Работа номер 1',
			price: 700,
			time: 80
		},
		{
			id: '2',
			name: 'Работа номер 2',
			price: 500,
			time: 60
		},
		{
			id: '3',
			name: 'Работа номер 3',
			price: 1000,
			time: 30
		},
		{
			id: '4',
			name: 'Работа номер 4',
			price: 300,
			time: 150
		},
	] 
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
			name: 'Наименование работ',
			price: 'Цена',
			time: 'Время',
			sum: 'Сумма',
		},
		items: workTasks.map((item)=>{

		const { hours, minuts } = getTime(item.time)
		const sum = item.price*hours + Math.floor(item.price*minuts/60)
		const timeString =  minuts > 0 && hours > 0 
			? `${hours} ч ${minuts} м` 
			: minuts > 0 
				? `${minuts} м` 
				: `${hours} ч` 

		return {
			name: item.name,
			price: `${item.price} ₽/час`,
			time: timeString,
			sum: `${ sum } руб`
		}
	})
		

	}
	const workMaterialsTable: TableType = {
		header: {
			name: 'Наименование работ',
			price: 'Цена',
			time: 'Количество штук',
			sum: 'Сумма',
		},
		items: workMaterials.map(item => {

			const sum = item.count * item.price

			return {
				name: item.name,
				price: `${item.price} ₽/шт`,
				time: `${item.count}  шт`,
				sum: `${sum} руб`
			}
		})
	}

	const workTotalPrice = workTasks.reduce((prev, item)=>{
		const { hours, minuts } = getTime(item.time)
		const sum = item.price*hours + Math.floor(item.price*minuts/60)
		return prev + sum
	}, 0)

	const materialTotalPrice = workMaterials.reduce((prev, item) => {
		const sum = item.count * item.price
		return prev + sum
	}, 0)

	const clearPrice = workTotalPrice + materialTotalPrice

	return (
		<CollapsBoard title='Стоимость работ' >
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить работы </Button>
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Добавить расходный материал </Button>
			<Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn} >+ Загрузить документ </Button>
			<div className={cls.tablesBlock}>
				<Table className={cls.table} data={workTasksTable} />
				<Table className={cls.table} data={workMaterialsTable} />
				<p className={cls.price}>Общая стоимость работ/услуг и материалов составляет <b className={cls.totalPrice}>{clearPrice} ₽</b> без НДС </p>
				<p className={cls.price}>Общая стоимость работ/услуг и материалов составляет <b className={cls.totalPrice}>{clearPrice} ₽</b> сумма с НДС </p>
			</div>
		</CollapsBoard>
	);
}
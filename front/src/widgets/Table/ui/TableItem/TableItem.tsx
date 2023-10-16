import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableItem.module.scss';
import { TableItemType, TableItemsMod } from '../../model/type/table';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface TableItemProps {
	className?: string;
	item: TableItemType;
	type?: ItemTheme;
	mod?: TableItemsMod;
	path?: string;
}

export const enum ItemTheme {
	HEADER = 'header',
	BODY = 'body'
} 

export const TableItem: React.FC<TableItemProps> = (props) => {
	const { className, item, type=ItemTheme.BODY, mod, path } = props;



	if(mod === TableItemsMod.LINK && type === ItemTheme.BODY){
		return 	<AppLink to={`${path}${item.id}`} className={classNames(cls.tableItem, {}, [className, cls[mod], cls[type]])}>
				{
					<Checkbox className={cls.checkbox} id={`${item.id}`} onClick={e => e.stopPropagation()} />
				}
				{
					Object.keys(item).map((key, index)=>(
						<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
							<span className={cls.text}>{item[key]}</span>
						</div>
					))
				}
			</AppLink>
	}


	return (
		<div className={classNames(cls.tableItem, {}, [className, cls[type]])}>
			{
				<Checkbox className={cls.checkbox} id={`${item.id}`} onClick={e => e.stopPropagation()} />
			}
			{
				Object.keys(item).map((key, index)=>(
					<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
						<span className={cls.text}>{item[key]}</span>
					</div>
				))
			}
		</div>
	);
}
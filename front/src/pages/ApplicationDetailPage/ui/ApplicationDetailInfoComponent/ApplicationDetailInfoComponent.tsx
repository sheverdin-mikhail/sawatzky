import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationDetailInfoComponent.module.scss';
import { Application } from 'entities/Application';
import { ApplicationTag } from 'pages/ApplicationsPage/ui/ApplicationTag/ApplicationTag';
import { getDateString } from 'shared/lib/getDateString/getDateString';

interface ApplicationDetailInfoComponentProps {
	className?: string;
	info: Application;
}


export const ApplicationDetailInfoComponent: React.FC<ApplicationDetailInfoComponentProps> = (props) => {
	const { className, info } = props;
	

	return (
		<div className={classNames(cls.applicationDetailInfoComponent, {}, [className])}>
			<div className={classNames(cls.firstColumn, {}, [cls.column])}>
				<h2 className={cls.title}>Информация по заявке</h2>
				<span className={classNames(cls.text, {}, [cls.name])}><b className={cls.textBold}>Название: </b>{ info.title }</span>
				<span className={cls.text}><b className={cls.textBold}>ID:</b> {info.id}</span>
				<span className={cls.text}><b className={cls.textBold}>Создал заявку:</b> { info.creator?.fio }</span>
				<ApplicationTag status={info.status} />
			</div>			
			<div className={classNames(cls.secondColumn, {}, [cls.column])}>
				<span className={cls.text}>
					<b className={cls.textBold}>Дата заявки: </b> 
					{ getDateString(new Date(info.createdAt)) }
				</span>
				<span className={cls.text}>
					<b className={cls.textBold}>Дата проведения работ: </b> 
					{
						info.startWorkDate && info.endWorkDate 
							? `${getDateString(new Date(info.startWorkDate))} — ${getDateString(new Date(info.endWorkDate))}`
							: 'Дата отсутствует'
					}
				</span>
			</div>		
			<div className={cls.verticalLine} ></div>	
			<div className={classNames(cls.thirdColumn, {}, [cls.column])} >
				<span className={cls.text} >
					{ info.description }
				</span>
			</div>
		</div>
	);
}
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CollapsBoard.module.scss';
import { ReactNode, useCallback, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg'

interface CollapsBoardProps {
	className?: string;
	title: string;
	children?: ReactNode;
}

export const CollapsBoard: React.FC<CollapsBoardProps> = (props) => {
	const { className, children, title } = props;

	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

	const onToggleCollapsed = useCallback(() => {
		setIsCollapsed(prev => !prev)
	}, [])



	return (
		<div className={classNames(cls.collapsBoard, {
			[cls.collapsed]: isCollapsed
		}, [className])}>
			<div className={cls.header} onClick={onToggleCollapsed}>
				<Text title={title} size={TextSize.M} />
				<div className={cls.iconContainer}><ArrowIcon className={cls.icon} /></div>
			</div>
			<div className={cls.controls}>
				<div style={{ minHeight: 0 }}>
					{children}
				</div>
			</div>
		</div>
	);
}
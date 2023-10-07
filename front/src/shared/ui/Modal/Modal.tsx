import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

const ANIMATION_DELAY = 200

export const Modal: React.FC<ModalProps> = (props) => {
	const { 
		className, 
		children,
		isOpen=false,
		onClose
	} = props;

	
	const [isClosing, setIsClosing] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const closeHandler = useCallback(() => {
		if(onClose){
			setIsClosing(true)
			timerRef.current = setTimeout(()=>{
				onClose()
				setIsClosing(false)
			}, ANIMATION_DELAY)
		}
	},[onClose])

	const onContentClick = useCallback((e: any) => {
		e.stopPropagation()
	}, [])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if(e.key === 'Escape') {
			closeHandler()
		}
	}, [closeHandler])

	useEffect(() => {

		if(isOpen){
			window.addEventListener('keydown', onKeyDown)
		}

		return () => { 
			clearTimeout(timerRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	},[isOpen, onKeyDown])

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing
	}
	

	return (
		<Portal>
			<div className={classNames(cls.modal, mods, [className])}>
				<div className={cls.overlay} onClick={closeHandler}>
					<div className={cls.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
}
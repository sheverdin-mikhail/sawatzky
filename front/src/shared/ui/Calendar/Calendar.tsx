import React, { Component, useCallback } from 'react';
import { DatePicker, RangePicker, Theme } from 'react-trip-date';
import cls from './Calendar.module.scss'
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg'
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { RangePickerSelectedDays } from 'react-trip-date/dist/rangePicker/rangePicker.type';


const theme: Theme = {
    primary: {
      light: "#6b737c",
      main: "transparent",
      dark: "#545B63",
    },
    grey: {
      700: "#fff",
      900: "#1b1b1d",
    },
    background: {
      default: "#F2F2F2",
    },
    text: {
      disabled: "#BABABA",
    },
    shape: {
        borderRadius: 0
    }
}

interface CalendarProps {
    onChange?: (selectedDays: RangePickerSelectedDays) => void;
    className?: string;
}
	
export const Calendar: React.FC<CalendarProps> = (props) =>  {

    const {
        onChange,
        className
    } = props

    const onChangeHandler = useCallback((selectedDays: RangePickerSelectedDays)=>{
        if(onChange){
            onChange(selectedDays)
        }
    },[onChange])

    return (
        <div className={classNames(cls.calendar, {}, [className])}>
            <RangePicker
                numberOfMonths={1}
                allowDisabledDaysSpan={true}
                theme={theme}
                onChange={onChangeHandler}
                autoResponsive={false}
                components={{
                    header: {
                        monthIcons: {
                            left: (<Button theme={ButtonThemes.CLEAR} className={cls.button}><ArrowIcon className={classNames(cls.arrowLeft, {}, [cls.icon])} /></Button>),
                            right: (<Button theme={ButtonThemes.CLEAR} className={cls.button}><ArrowIcon className={classNames(cls.arrowRight, {}, [cls.icon])} /></Button>),
                        },
                        yearIcons: {
                            left: (<Button theme={ButtonThemes.CLEAR} className={cls.button}><ArrowIcon className={classNames(cls.arrowLeft, {}, [cls.icon])} /></Button>),
                            right: (<Button theme={ButtonThemes.CLEAR} className={cls.button}><ArrowIcon className={classNames(cls.arrowRight, {}, [cls.icon])} /></Button>),
                        },
                    }
                }}
            />
        </div>
    );
  }
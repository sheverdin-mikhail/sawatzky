import { createSlice } from '@reduxjs/toolkit'
import { AppointmentSchema, AppointmentStatus } from '../types/appointment'


const initialState: AppointmentSchema = {
    appointments: [
        {
            id: '1',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.NEW
        },
        {
            id: '2',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.COORDINATION
        },
        {
            id: '3',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.PROCESSED
        },
    ],
    isLoading: false,
}

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    
  },
})

export const { actions: appointmentActions } = appointmentSlice
export const { reducer: appointmentReducer } = appointmentSlice

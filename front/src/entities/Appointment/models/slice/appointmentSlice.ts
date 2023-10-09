import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Appointment, AppointmentSchema, AppointmentStatus } from '../types/appointment'
import { StateSchema } from 'app/providers'



const appointmentAdapter = createEntityAdapter<Appointment>({
    selectId: ( appointment ) => appointment.id
  })
  
  export const getAppointment = appointmentAdapter.getSelectors<StateSchema>(
    (state) => state.appointment || appointmentAdapter.getInitialState()
  )



export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: appointmentAdapter.getInitialState<AppointmentSchema>({
    ids: ['1', '2', '3'],
    entities: {
        "1": {
            id: '1',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.NEW,
            creator: {
              id: '2',
              username: 'admin2',
              fio: 'Иванов Иван',
            }
        },
        "2": {
            id: '2',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.COORDINATION,
            creator: {
              id: '2',
              username: 'admin2',
              fio: 'Иванов Иван',
            }
        },
        "3": {
            id: '3',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: AppointmentStatus.PROCESSED,
            creator: {
              id: '2',
              username: 'admin2',
              fio: 'Иванов Иван',
            }
        }
    },
    isLoading: false,
  }),
  reducers: {
    
  },
})

export const { actions: appointmentActions } = appointmentSlice
export const { reducer: appointmentReducer } = appointmentSlice

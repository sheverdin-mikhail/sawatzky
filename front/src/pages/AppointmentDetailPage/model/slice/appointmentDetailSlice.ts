import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { AppointmentDetailSchema } from '../type/appointmentDetail'
import { Appointment, AppointmentStatus } from 'entities/Appointment'
import { StateSchema } from 'app/providers'


const appointmentDetailAdapter = createEntityAdapter<Appointment>({
  selectId: ( appointment ) => appointment.id
})

export const getAppointmentDetail = appointmentDetailAdapter.getSelectors<StateSchema>(
  (state) => state.appointmentDetail || appointmentDetailAdapter.getInitialState()
)

export const appointmentDetailSlice = createSlice({
  name: 'appointmentDetail',
  initialState: appointmentDetailAdapter.getInitialState<AppointmentDetailSchema>({
    ids: [ 1 ],
    entities: {
      "1": {
        id: '1',
        createdAt: '25.12.2022',
        description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
        subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
        title: 'Документы на поставку IT оборудования ',
        status: AppointmentStatus.NEW,
      },
    },
    error: undefined,
    isLoading: false
  }),
  reducers: {
    
  },
})

export const { actions: appointmentDetailActions } = appointmentDetailSlice
export const { reducer: appointmentDetailReducer } = appointmentDetailSlice

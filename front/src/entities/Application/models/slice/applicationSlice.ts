import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Application, ApplicationSchema, ApplicationStatus } from '../types/application'
import { StateSchema } from 'app/providers'



const applicationAdapter = createEntityAdapter<Application>({
    selectId: ( application ) => application.id
  })
  
  export const getApplication = applicationAdapter.getSelectors<StateSchema>(
    (state) => state.application || applicationAdapter.getInitialState()
  )



export const applicationSlice = createSlice({
  name: 'application',
  initialState: applicationAdapter.getInitialState<ApplicationSchema>({
    ids: ['1', '2', '3'],
    entities: {
        "1": {
            id: '1',
            createdAt: '25.12.2022',
            description: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....',
            subject: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее ',
            title: 'Документы на поставку IT оборудования ',
            status: ApplicationStatus.NEW,
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
            status: ApplicationStatus.COORDINATION,
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
            status: ApplicationStatus.PROCESSED,
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

export const { actions: applicationActions } = applicationSlice
export const { reducer: applicationReducer } = applicationSlice

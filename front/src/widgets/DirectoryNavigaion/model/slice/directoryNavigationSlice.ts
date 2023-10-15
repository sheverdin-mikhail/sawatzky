import {  createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { DirectoryLinkType, DirectoryNavigaionSchema } from '../type/directoryNavigation'
import { StateSchema } from 'app/providers';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';



export const directoryNavigationAdapter = createEntityAdapter<DirectoryLinkType>({
  selectId: (link) => link.path
})

export const getDirectoryNavigationPage = directoryNavigationAdapter.getSelectors<StateSchema>(
  (state) => state.direcotryNavigation || directoryNavigationAdapter.getInitialState()
)



export const directoryNavigationSlice = createSlice({
  name: 'directoryNavigation',
  initialState: directoryNavigationAdapter.getInitialState<DirectoryNavigaionSchema>({
    ids: [DirectoryPath.objects, DirectoryPath.legal_entity, DirectoryPath.legal_entity_swatzky],
    entities: {
      [DirectoryPath.objects]: {
        path: DirectoryPath.objects,
        text: 'Группа объектов'
      },
      [DirectoryPath.legal_entity]: {
        path: DirectoryPath.legal_entity,
        text: 'Контрагенты (Юр. лиц заказчиков)'
      },
      [DirectoryPath.legal_entity_swatzky]: {
        path: DirectoryPath.legal_entity_swatzky,
        text: 'Юр. лица Sawatzky'
      },
    },
    error: undefined,
    isLoading: false
  }),
  reducers: {
  },
 
})

export const { actions: directoryNavigationActions } = directoryNavigationSlice
export const { reducer: directoryNavigationReducer } = directoryNavigationSlice

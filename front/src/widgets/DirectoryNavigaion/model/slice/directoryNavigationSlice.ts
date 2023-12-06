import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { DirectoryPath, routeConfig } from 'shared/config/RouteConfig/appRouteConfig';
import { DirectoryLinkType, DirectoryNavigaionSchema } from '../type/directoryNavigation';

export const directoryNavigationAdapter = createEntityAdapter<DirectoryLinkType>({
  selectId: (link) => link.path,
});

export const getDirectoryNavigationPage = directoryNavigationAdapter.getSelectors<StateSchema>(
  (state) => state.direcotryNavigation || directoryNavigationAdapter.getInitialState(),
);

export const directoryNavigationSlice = createSlice({
  name: 'directoryNavigation',
  initialState: directoryNavigationAdapter.getInitialState<DirectoryNavigaionSchema>({
    ids: [
      DirectoryPath.objects,
      DirectoryPath.object_tree,
      DirectoryPath.legal_entity,
      DirectoryPath.legal_entity_sawatzky,
      DirectoryPath.work_task_group,
      DirectoryPath.work_material_group,
      DirectoryPath.employee,
      DirectoryPath.employee_sawatzky,
    ],
    entities: {
      [DirectoryPath.objects]: {
        path: DirectoryPath.objects,
        text: 'Группа объектов',
        sawatzkyOnly: routeConfig.objects.sawatzkyOnly ?? false,
      },
      [DirectoryPath.legal_entity]: {
        path: DirectoryPath.legal_entity,
        text: 'Контрагенты (Юр. лиц заказчиков)',
        sawatzkyOnly: routeConfig.legal_entity.sawatzkyOnly ?? false,
      },
      [DirectoryPath.legal_entity_sawatzky]: {
        path: DirectoryPath.legal_entity_sawatzky,
        text: 'Юр. лица Sawatzky',
        sawatzkyOnly: routeConfig.legal_entity_sawatzky.sawatzkyOnly ?? false,
      },
      [DirectoryPath.work_task_group]: {
        path: DirectoryPath.work_task_group,
        text: 'Группа услуг',
        sawatzkyOnly: routeConfig.work_task_group.sawatzkyOnly ?? false,
      },
      [DirectoryPath.work_material_group]: {
        path: DirectoryPath.work_material_group,
        text: 'Группа материалов',
        sawatzkyOnly: routeConfig.work_material_group.sawatzkyOnly ?? false,
      },
      [DirectoryPath.object_tree]: {
        path: DirectoryPath.object_tree,
        text: 'Дерево объектов',
        sawatzkyOnly: routeConfig.object_tree.sawatzkyOnly ?? false,
      },
      [DirectoryPath.employee]: {
        path: DirectoryPath.employee,
        text: 'Представители заказчика',
        sawatzkyOnly: routeConfig.employee.sawatzkyOnly ?? false,
      },
      [DirectoryPath.employee_sawatzky]: {
        path: DirectoryPath.employee_sawatzky,
        text: 'Сотрудники Sawatzky',
        sawatzkyOnly: routeConfig.employee_sawatzky.sawatzkyOnly ?? false,
      },
    },
    error: undefined,
    isLoading: false,
  }),
  reducers: {
  },

});

export const { actions: directoryNavigationActions } = directoryNavigationSlice;
export const { reducer: directoryNavigationReducer } = directoryNavigationSlice;

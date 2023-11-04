import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import { DirectoryLinkType, DirectoryNavigaionSchema } from '../type/directoryNavigation';

export const directoryNavigationAdapter = createEntityAdapter<DirectoryLinkType>({
<<<<<<< HEAD
    selectId: (link) => link.path,
});

export const getDirectoryNavigationPage = directoryNavigationAdapter.getSelectors<StateSchema>(
    (state) => state.direcotryNavigation || directoryNavigationAdapter.getInitialState(),
);
=======
    selectId: (link) => link.path
})

export const getDirectoryNavigationPage = directoryNavigationAdapter.getSelectors<StateSchema>(
    (state) => state.direcotryNavigation || directoryNavigationAdapter.getInitialState()
)


>>>>>>> main

export const directoryNavigationSlice = createSlice({
    name: 'directoryNavigation',
    initialState: directoryNavigationAdapter.getInitialState<DirectoryNavigaionSchema>({
        ids: [
<<<<<<< HEAD
            DirectoryPath.objects,
            DirectoryPath.legal_entity,
=======
            DirectoryPath.objects, 
            DirectoryPath.legal_entity, 
>>>>>>> main
            DirectoryPath.legal_entity_sawatzky,
            DirectoryPath.work_task_group,
            DirectoryPath.work_material_group,
        ],
        entities: {
            [DirectoryPath.objects]: {
                path: DirectoryPath.objects,
<<<<<<< HEAD
                text: 'Группа объектов',
            },
            [DirectoryPath.legal_entity]: {
                path: DirectoryPath.legal_entity,
                text: 'Контрагенты (Юр. лиц заказчиков)',
            },
            [DirectoryPath.legal_entity_sawatzky]: {
                path: DirectoryPath.legal_entity_sawatzky,
                text: 'Юр. лица Sawatzky',
            },
            [DirectoryPath.work_task_group]: {
                path: DirectoryPath.work_task_group,
                text: 'Группа услуг',
            },
            [DirectoryPath.work_material_group]: {
                path: DirectoryPath.work_material_group,
                text: 'Группа материалов',
            },
        },
        error: undefined,
        isLoading: false,
    }),
    reducers: {
    },
=======
                text: 'Группа объектов'
            },
            [DirectoryPath.legal_entity]: {
                path: DirectoryPath.legal_entity,
                text: 'Контрагенты (Юр. лиц заказчиков)'
            },
            [DirectoryPath.legal_entity_sawatzky]: {
                path: DirectoryPath.legal_entity_sawatzky,
                text: 'Юр. лица Sawatzky'
            },
            [DirectoryPath.work_task_group]: {
                path: DirectoryPath.work_task_group,
                text: 'Группа услуг'
            },
            [DirectoryPath.work_material_group]: {
                path: DirectoryPath.work_material_group,
                text: 'Группа материалов'
            },
        },
        error: undefined,
        isLoading: false
    }),
    reducers: {
    },
 
})
>>>>>>> main

});

export const { actions: directoryNavigationActions } = directoryNavigationSlice;
export const { reducer: directoryNavigationReducer } = directoryNavigationSlice;

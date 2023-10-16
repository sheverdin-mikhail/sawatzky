import { ApplicationDetailPage } from "pages/ApplicationDetailPage"
import { ApplicationsPage } from "pages/ApplicationsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { DirectoryLegalEntityPage } from "pages/DirectoryLegalEntityPage"
import { DirectoryLegalEntitySawatzkyPage } from "pages/DirectoryLegalEntitySawatzkyPage"
import { DirectoryObjectPage } from "pages/DirectoryObjectPage"
import { DirectoryObjectsGroupPage } from "pages/DirectoryObjectsGroupPage"
import { DirectoryWorkTaskGroupPage } from "pages/DirectoryWorkTaskGroupPage"
import { Navigate, RouteProps } from "react-router-dom"


export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

//global routing

export enum AppRoutes{
    APPLICATIONS = 'applications',
    Application_DETAIL = 'application_detail',
    AUTHORIZATION = 'authorization',
    HOME = 'home',
}


export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPLICATIONS] : '/application',
    [AppRoutes.AUTHORIZATION] : '/login',
    [AppRoutes.Application_DETAIL] : '/application/',
    [AppRoutes.HOME] : '/',
}
//-----------------------------------------------------------------------------------

// Directory routing
export enum DirectoryRoutes{
    OBJECTS = 'objects',
    OBJECT = 'object',
    LEGAL_ENTITY = 'legal_entity',
    LEGAL_ENTITY_SAWATZKY = 'legal_entity_sawatzky',
    WORK_TASK_GROUP = 'work_task_group',
}

export const DirectoryPath: Record<DirectoryRoutes, string>= {
    [DirectoryRoutes.OBJECTS]: '/directory/objects',
    [DirectoryRoutes.OBJECT]: '/directory/objects/',
    [DirectoryRoutes.LEGAL_ENTITY]: '/directory/legal-entity',
    [DirectoryRoutes.LEGAL_ENTITY_SAWATZKY]: '/directory/legal-entity-sawatzky',
    [DirectoryRoutes.WORK_TASK_GROUP]: '/directory/work-task-group',
}


//------------------------------------------------------------------------------------


//Routing config

export const routeConfig: Record<AppRoutes | DirectoryRoutes, AppRouteProps> = {
    [AppRoutes.APPLICATIONS] : {
        path: RoutePath.applications,
        element: <ApplicationsPage />,
        authOnly: true
    },
    [AppRoutes.Application_DETAIL] : {
        path: `${RoutePath.application_detail}:id`,
        element: <ApplicationDetailPage />,
        authOnly: true

    },
    
    //Directory Routes
    [DirectoryRoutes.OBJECTS] : {
        path: DirectoryPath.objects,
        element: <DirectoryObjectsGroupPage />,
        authOnly: true
    },
    [DirectoryRoutes.OBJECT] : {
        path: `${DirectoryPath.object}:id`,
        element: <DirectoryObjectPage />,
        authOnly: true
    },
    [DirectoryRoutes.LEGAL_ENTITY] : {
        path: DirectoryPath.legal_entity,
        element: <DirectoryLegalEntityPage />,
        authOnly: true
    },
    [DirectoryRoutes.LEGAL_ENTITY_SAWATZKY] : {
        path: DirectoryPath.legal_entity_sawatzky,
        element: <DirectoryLegalEntitySawatzkyPage />,
        authOnly: true
    },
    
    [DirectoryRoutes.WORK_TASK_GROUP] : {
        path: DirectoryPath.work_task_group,
        element: <DirectoryWorkTaskGroupPage />,
        authOnly: true
    },
    

    //No Private pages

    [AppRoutes.AUTHORIZATION] : {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
        authOnly: false

    },
    [AppRoutes.HOME] : {
        path: RoutePath.home,
        element: <Navigate
            to={RoutePath.applications}
            replace // <-- redirect
        />,
        authOnly: false
    },
}



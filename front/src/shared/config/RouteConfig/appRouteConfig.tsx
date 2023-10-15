import { ApplicationDetailPage } from "pages/ApplicationDetailPage"
import { ApplicationsPage } from "pages/ApplicationsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { DirectoryLegalEntityPage } from "pages/DirectoryLegalEntityPage"
import { DirectoryLegalEntitySwatzkyPage } from "pages/DirectoryLegalEntitySwatzkyPage"
import { DirectoryObjectsGroupPage } from "pages/DirectoryObjectsGroupPage"
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
    LEGAL_ENTITY = 'legal_entity',
    LEGAL_ENTITY_SWATZKY = 'legal_entity_swatzky',
}

export const DirectoryPath: Record<DirectoryRoutes, string>= {
    [DirectoryRoutes.OBJECTS]: '/directory/objects',
    [DirectoryRoutes.LEGAL_ENTITY]: '/directory/legal-entity',
    [DirectoryRoutes.LEGAL_ENTITY_SWATZKY]: '/directory/legal-entity-swatzky',
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
    [DirectoryRoutes.LEGAL_ENTITY] : {
        path: DirectoryPath.legal_entity,
        element: <DirectoryLegalEntityPage />,
        authOnly: true
    },
    [DirectoryRoutes.LEGAL_ENTITY_SWATZKY] : {
        path: DirectoryPath.legal_entity_swatzky,
        element: <DirectoryLegalEntitySwatzkyPage />,
        authOnly: true
    },
    

    //Private pages

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



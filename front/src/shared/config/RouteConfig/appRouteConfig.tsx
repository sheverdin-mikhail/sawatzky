import { ApplicationDetailPage } from "pages/ApplicationDetailPage"
import { ApplicationsPage } from "pages/ApplicationsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { DirectoryObjectsPage } from "pages/DirectoryObjectsPage"
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
}

export const DirectoryPath: Record<DirectoryRoutes, string>= {
    [DirectoryRoutes.OBJECTS]: '/directory/objects',
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
        element: <DirectoryObjectsPage />,
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



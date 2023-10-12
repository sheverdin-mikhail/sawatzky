import { ApplicationDetailPage } from "pages/ApplicationDetailPage"
import { ApplicationsPage } from "pages/ApplicationsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { DirectoryPage } from "pages/DirectoryPage"
import { Navigate, RouteProps } from "react-router-dom"


export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes{
    APPLICATIONS = 'applications',
    Application_DETAIL = 'application_detail',
    AUTHORIZATION = 'authorization',
    HOME = 'home',
    DIRECTORY = 'directory'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPLICATIONS] : '/application',
    [AppRoutes.AUTHORIZATION] : '/login',
    [AppRoutes.Application_DETAIL] : '/application/',
    [AppRoutes.HOME] : '/',
    [AppRoutes.DIRECTORY] : '/directory',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
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
    [AppRoutes.DIRECTORY] : {
        path: RoutePath.directory,
        element: <DirectoryPage />,
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



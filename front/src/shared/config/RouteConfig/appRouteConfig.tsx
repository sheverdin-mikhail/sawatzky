import { AppointmentsPage } from "pages/AppointmentsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { RouteProps } from "react-router-dom"


export enum AppRoutes{
    APPOINTMENT = 'appointment',
    AUTHORIZATION = 'authorization',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPOINTMENT] : '/',
    [AppRoutes.AUTHORIZATION] : '/login',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.APPOINTMENT] : {
        path: RoutePath.appointment,
        element: <AppointmentsPage />
    },
    [AppRoutes.AUTHORIZATION] : {
        path: RoutePath.authorization,
        element: <AuthorizationPage />
    },
}



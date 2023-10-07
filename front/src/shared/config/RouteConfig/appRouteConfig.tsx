import { AppointmentDetailPage } from "pages/AppointmentDetailPage"
import { AppointmentsPage } from "pages/AppointmentsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { RouteProps } from "react-router-dom"


export type AppRouteProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes{
    APPOINTMENTS = 'appointments',
    APPOINTMENT_DETAIL = 'appointment_detail',
    AUTHORIZATION = 'authorization',
    HOME = 'home',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPOINTMENTS] : '/appointment',
    [AppRoutes.AUTHORIZATION] : '/login',
    [AppRoutes.APPOINTMENT_DETAIL] : '/appointment/',
    [AppRoutes.HOME] : '/',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.APPOINTMENTS] : {
        path: RoutePath.appointments,
        element: <AppointmentsPage />,
        authOnly: true
    },
    [AppRoutes.APPOINTMENT_DETAIL] : {
        path: `${RoutePath.appointment_detail}:id`,
        element: <AppointmentDetailPage />,
        authOnly: true

    },
    [AppRoutes.AUTHORIZATION] : {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
        authOnly: false

    },
    [AppRoutes.HOME] : {
        path: RoutePath.home,
        element: <AppointmentsPage />,
        authOnly: false

    },
}



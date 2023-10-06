import { AppointmentDetailPage } from "pages/AppointmentDetailPage"
import { AppointmentsPage } from "pages/AppointmentsPage"
import { AuthorizationPage } from "pages/AuthorizaionPage"
import { RouteProps } from "react-router-dom"


export enum AppRoutes{
    APPOINTMENTS = 'appointments',
    APPOINTMENT_DETAIL = 'appointment_detail',
    AUTHORIZATION = 'authorization',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPOINTMENTS] : '/',
    [AppRoutes.AUTHORIZATION] : '/login',
    [AppRoutes.APPOINTMENT_DETAIL] : '/appointment/:id',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.APPOINTMENTS] : {
        path: RoutePath.appointments,
        element: <AppointmentsPage />
    },
    [AppRoutes.APPOINTMENT_DETAIL] : {
        path: RoutePath.appointment_detail,
        element: <AppointmentDetailPage />
    },
    [AppRoutes.AUTHORIZATION] : {
        path: RoutePath.authorization,
        element: <AuthorizationPage />
    },
}



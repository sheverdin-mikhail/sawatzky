import {AppointmentPage} from "pages/AppointmentPage"
import { RouteProps } from "react-router-dom"


export enum AppRoutes{
    APPOINTMENT = 'appointment',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.APPOINTMENT] : '/',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.APPOINTMENT] : {
        path: RoutePath.appointment,
        element: <AppointmentPage />
    },
}



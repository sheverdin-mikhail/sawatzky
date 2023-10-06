export interface Appointement {
    id: string;
    title: string;
    subject: string;
    description: string;
    performer?: any; //Надо поменять когда появится модель исполнителя 
    workTasks?: any; //Поменять когда появится модель проводимых работ
    workMaterials?: any; //Поменять когда появится модель материалов
    documents?: any; //Поменять когда появится модель документов
    status: AppointmentStatus;

    createdAt: string;
    updatedAt?: string;
    startWorkDate?: string;
    endWorkDate?: string;
}


export enum AppointmentStatus {
    NEW ='new',
    PROCESSED='processed',
    COORDINATION = 'coordination',
    PAYMENT_COORDINATION = 'paymentCoordination',
    IN_WORK = 'inWork',
    FINISHED = 'finished' 
}

export interface AppointmentSchema {
    appointments: Appointement[];
    isLoading: boolean;
    error?: string;
}
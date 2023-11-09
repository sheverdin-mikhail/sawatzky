import { DirectoryPath, RoutePath } from "shared/config/RouteConfig/appRouteConfig";
import { ReactComponent as InfoIcon } from 'shared/assets/icons/info-icon.svg';
import { ReactComponent as ApplicationIcon } from 'shared/assets/icons/application-icon.svg';
import { ReactComponent as ReportIcon } from 'shared/assets/icons/report-icon.svg';
import { ReactComponent as DirectoryIcon } from 'shared/assets/icons/directory-icon.svg';
import { ReactComponent as ArchiveIcon } from 'shared/assets/icons/archive-icon.svg';
import { ReactComponent as DocIcon } from 'shared/assets/icons/doc-icon.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export interface AlertType {
    id: string,
    name: string,
}

export const SidebarItemsList: SidebarItemType[] = [

    {
        path: '/info',
        text: 'Информация',
        Icon: InfoIcon,
        authOnly: true,
    },
    {
        path: RoutePath.applications,
        text: 'Запросы',
        Icon: ApplicationIcon,
        authOnly: true,
    },
    {
        path: '/report',
        text: 'Отчеты',
        Icon: ReportIcon,
        authOnly: true,

    },
    {
        path: DirectoryPath.objects,
        text: 'Справочники',
        Icon: DirectoryIcon,
        authOnly: true,

    },
    {
        path: '/archive',
        text: 'Архив',
        Icon: ArchiveIcon,
        authOnly: true,

    },
    {
        path: '/documents',
        text: 'Документы',
        Icon: DocIcon,
        authOnly: true,

    },
];

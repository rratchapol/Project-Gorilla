/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'divider-0',
        type: 'divider',
    },
    {
        id: 'home',
        title: 'หน้าหลัก',
        type: 'basic',
        icon: 'heroicons_solid:home',
        link: 'dashboards/projectt',
        userType: 'influencer',
    },
    {
        id: 'home',
        title: 'กรอกข้อมูลส่วนตัว',
        type: 'basic',
        icon: 'feather:check-square',
        link: 'fill-out',
        userType: 'influencer',
    },
    {
        id: 'home',
        title: 'ข้อมูล Influencer',
        type: 'collapsable',
        icon: 'heroicons_solid:table-cells',
        children: [
            {
                id: 'home',
                title: 'Database Influencer',
                type: 'basic',
                link: 'database/list',
                userType: 'admin',
            },

        ]
    },
    {
        id: 'home',
        title: 'งานทั้งหมด',
        type: 'basic',
        icon: 'heroicons_solid:clipboard-document-list',
        link: 'tasks/list',
        userType: 'admin',
    },
    {
        id: 'home',
        title: 'ข้อมูลพนักงาน',
        type: 'collapsable',
        icon: 'heroicons_solid:user',
        children: [
            {
                id: 'home',
                title: 'ข้อมูลพนักงาน',
                type: 'basic',
                link: 'employee/list',
                userType: 'admin',
            },

        ]
    },
    {
        id: 'home',
        title: 'ข้อมูลลูกค้า',
        type: 'basic',
        icon: 'heroicons_solid:user',
        link: 'inventory/list',
        userType: 'admin',
    },
    {
        id: 'home',
        title: 'ออกจากระบบ',
        type: 'basic',
        icon: 'feather:power',
        link: 'sign-out',
        userType: 'influencer',
    },
    // {
    //     id: 'home',
    //     title: 'ออกจากระบบ',
    //     type: 'basic',
    //     icon: 'feather:power',
    //     link: 'dialog',
    //     userType: 'influencer',
    // },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        type: 'group',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Misc',
        type: 'group',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];

import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ListComponent } from './list/inventory.component';

export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory',
    },

    {
        path    : 'list',
        component: ListComponent,
    },
    // {
    //     path     : 'inventory',
    //     component: InventoryComponent,
    //     children : [
    //         {
    //             path     : '',
    //             component: InventoryListComponent,
    //             resolve  : {
    //                 brands    : () => inject(InventoryService).getBrands(),
    //                 categories: () => inject(InventoryService).getCategories(),
    //                 products  : () => inject(InventoryService).getProducts(),
    //                 tags      : () => inject(InventoryService).getTags(),
    //                 vendors   : () => inject(InventoryService).getVendors(),
    //             },
    //         },
    //     ],
    // },
] as Routes;

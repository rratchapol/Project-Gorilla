import { Routes } from '@angular/router';
import { HomeCustomerComponent } from './line-customer/home-customer/home-customer.component';
import { HomeDriverComponent } from './line-driver/home-driver/home-driver.component';

export default [
    {
        path     : 'customer',
        component: HomeCustomerComponent,
        children: [],
    },
    {
        path     : 'driver',
        component: HomeDriverComponent,
        children: [],
    },
] as Routes;

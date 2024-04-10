import { Routes } from '@angular/router';
import { FillOutComponent } from './fill-out.component';
// import { HomeCustomerComponent } from './line-customer/home-customer/home-customer.component';
// import { HomeDriverComponent } from './line-driver/home-driver/home-driver.component';

export default [
    {
        path     : '',
        component: FillOutComponent,
        children: [],
    },
    // {
    //     path     : '',
    //     component: FillOutComponent,
    //     children: [],
    // },
] as Routes;

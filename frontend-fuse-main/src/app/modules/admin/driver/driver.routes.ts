import { Routes } from '@angular/router';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { DriverComponent } from './driver.component';
import { DriverListComponent } from './influencer-list/driver-list.component';

export default [
    {
        path: '',
        component: DriverComponent,
        children: [
            { path: '', component: DriverListComponent },
            { path: 'form', component: DriverFormComponent },
            { path: ':id', component: DriverFormComponent },
            { path: 'form', component: DriverFormComponent },
            { path: 'form/:id', component: DriverFormComponent }
        ]
    },

] as Routes;

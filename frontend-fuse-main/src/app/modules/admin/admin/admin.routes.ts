import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

export default [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: AdminListComponent },
            { path: 'form', component: AdminFormComponent },
            { path: ':id', component: AdminFormComponent },
            { path: 'form', component: AdminFormComponent },
            { path: 'form/:id', component: AdminFormComponent }
        ]
    },
] as Routes;

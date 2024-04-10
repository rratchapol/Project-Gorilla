import { Routes } from '@angular/router';
import { ListComponent } from './form/form.component';

export default [
    // {
    //     path     : 'form',
    //     component: FormComponent,
    //     children: [],
    // },
    // {
    //     path: '',
    //     component: EmployeeComponent,
    //     children: [
    //         { path: '', component: ListComponent },
    //         { path: 'form', component: EmployeeFormComponent },
    //         { path: ':id', component: EmployeeFormComponent },
    //         { path: 'form', component: EmployeeFormComponent },
    //         { path: 'form/:id', component: EmployeeFormComponent }
    //     ]
    // },

    // {
    //     path    : 'list',
    //     component: ListComponent,
    // },
    {
        path    : 'form',
        component: ListComponent,
    },
    // {
    //     path    : 'edit',
    //     component: EditComponent,
    // },

] as Routes;

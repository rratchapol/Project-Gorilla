import { Routes } from '@angular/router';
import { SelectComponent } from './select.component';
import { SelectListComponent } from './list/list.component';

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

    {
        path    : 'list',
        component: SelectListComponent,
    },
    // {
    //     path    : 'form',
    //     component: EmployeeFormComponent,
    // },
    // {
    //     path    : 'edit',
    //     component: EditComponent,
    // },

] as Routes;

import { Routes } from '@angular/router';
import { SelecttListComponent } from './select.component';
import { SelectComponent } from './list/list.component';

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
        component: SelectComponent,
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

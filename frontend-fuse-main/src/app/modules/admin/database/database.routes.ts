import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { EditComponent } from './edit/edit.component';

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
        component: ListComponent,
    },
    {
        path    : 'form',
        component: FormComponent,
    },
    {
        path    : 'edit',
        component: EditComponent,
    },

] as Routes;

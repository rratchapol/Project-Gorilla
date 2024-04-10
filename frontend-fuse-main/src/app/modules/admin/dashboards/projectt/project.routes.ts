import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectComponent } from 'app/modules/admin/dashboards/project/project.component';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { ProjecttComponent } from './project.component';

export default [
    {
        path     : '',
        component: ProjecttComponent,
        resolve  : {
            data: () => inject(ProjectService).getData(),
        },
    },
] as Routes;

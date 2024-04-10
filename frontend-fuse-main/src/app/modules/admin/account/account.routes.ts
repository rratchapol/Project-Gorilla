import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ActivitiesComponent } from 'app/modules/admin/pages/activities/activities.component';
import { ActivitiesService } from 'app/modules/admin/pages/activities/activities.service';
import { AccountComponent } from './account.component';

export default [
    {
        path     : '',
        component: AccountComponent,
        resolve  : {
            // activities: () => inject(ActivitiesService).getActivities(),
        },
    },
] as Routes;
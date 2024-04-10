import { Routes } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { VerificationListComponent } from './verification-list/verification-list.component';

export default [
    {
        path     : '',
        component: VerificationComponent,
        children: [{
            path: '',
            component: VerificationListComponent,
        }]
    },
] as Routes;

import { Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthhSignInComponent } from './sign-in.component';


export default [
    {
        path     : '',
        component: AuthhSignInComponent,
    },
] as Routes;

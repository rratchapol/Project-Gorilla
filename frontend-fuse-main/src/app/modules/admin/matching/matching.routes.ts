import { Routes } from '@angular/router';
import { MatchingComponent } from './matching.component';
import { MatchingListComponent } from './matching-list/matching-list.component';

export default [
    {
        path     : '',
        component: MatchingComponent,
        children: [{
            path: '',
            component: MatchingListComponent,
        }]
    },
] as Routes;

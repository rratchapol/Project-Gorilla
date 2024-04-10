import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-home-customer',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './home-customer.component.html',
    styleUrl: './home-customer.component.scss',
})
export class HomeCustomerComponent implements OnInit {

    ngOnInit(): void { }

}

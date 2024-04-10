import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-home-driver',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home-driver.component.html',
    styleUrl: './home-driver.component.scss',
})
export class HomeDriverComponent implements OnInit {

    ngOnInit(): void { }

}

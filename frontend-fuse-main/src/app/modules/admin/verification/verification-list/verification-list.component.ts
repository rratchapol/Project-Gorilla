import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
    selector: 'app-verification-list',
    standalone: true,
    imports: [ CommonModule, DataTablesModule ],
    templateUrl: './verification-list.component.html',
    styleUrl: './verification-list.component.scss',
})
export class VerificationListComponent implements OnInit {
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
}

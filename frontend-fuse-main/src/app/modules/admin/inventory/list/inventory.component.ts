import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';

import { InventoryService } from '../inventory.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
// import { DialogUploadcsv } from '../../matching/dialoguploadcsv/dialoguploadcsv';

@Component({

    selector: 'list',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonToggleModule,
        DataTablesModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatPaginatorModule,

        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        RouterLink,
        MatToolbarModule,
        MatDatepickerModule
    
    ],
    templateUrl: './inventory.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: ListComponent }],
})
export class ListComponent {
    EmployeeForm: FormGroup;
    public dataRow: any[];
    formFieldHelpers: any;
id: any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: InventoryService,
        private _router: Router


    ) { }

    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 10,
            serverSide: true,
            processing: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json",
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                // that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                //     this.dataRow = resp.data.data;
                //     console.log('111',this.dataRow)
                //     this.pages.current_page = resp.current_page;
                //     this.pages.last_page = resp.last_page;
                //     this.pages.per_page = resp.per_page;
                //     if (resp.currentPage > 1) {
                //         this.pages.begin =
                //             parseInt(resp.itemsPerPage) * (parseInt(resp.currentPage) - 1);
                //     } else {
                //         this.pages.begin = 0;
                //     }

                //     callback({
                //         recordsTotal: resp.data.total,
                //         recordsFiltered: resp.data.total,
                //         data: [],
                //     });
                //     this._changeDetectorRef.markForCheck();
                // });
            },
            columns: [
                { data: 'name' },
                { data: 'tel' },
                { data: 'email' },
                { data: 'code' },
            ],
        };
        
    }

    addElement() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //    console.log(result,'result')
            }
        });
    }


    gotoAaddriver() {
        this.router.navigate(['/tasks/form']);
    }
    changes = new Subject<void>();

    seemore() {
        this.router.navigate(['/tasks/product/form']);
    }
    // changes = new Subject<void>();

    editElement() {
        
        this._router.navigate(['admin/employee/edit']);
    }


    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.


    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `Page 1 of 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Page ${page + 1} of ${amountPages}`;
    }
}


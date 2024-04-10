import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
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
import { DialogUploadcsv } from '../../matching/dialoguploadcsv/dialoguploadcsv';
import { DatabaseService } from '../database.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseConfirmationService } from '@fuse/services/confirmation';
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
        MatTooltipModule

    ],
    templateUrl: './list.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: ListComponent }],
})
export class ListComponent {
    EmployeeForm: FormGroup;
    public dataRow: any[];

    EmployeeArray: any[] = [];
    isResultLoaded = false;
    isUpdateFormActive = false;
    currentEmployeeID = "";

    id: any;
    http: any;
    item: any;
    // private _fuseConfirmationService: any;
    flashMessage: null;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: DatabaseService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService


    ) { }

    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.loadTable();
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
                that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                    this.dataRow = resp.data.data;
                    console.log('111', this.dataRow.length)
                    this.pages.current_page = resp.data.current_page;
                    this.pages.last_page = resp.data.last_page;
                    this.pages.per_page = resp.data.per_page;
                    if (resp.currentPage > 1) {
                        this.pages.begin =
                            parseInt(resp.itemsPerPage) * (parseInt(resp.currentPage) - 1);
                    } else {
                        this.pages.begin = 0;
                    }

                    callback({
                        recordsTotal: resp.data.total,
                        recordsFiltered: resp.data.total,
                        data: [],
                    });
                    this._changeDetectorRef.markForCheck();
                });
            },
        };
    }

    // delete(id: any): void {
    //     this.flashMessage = null;      
    //     console.log('111', this.dataRow.length)       
    //     alert('delete');
    //             this._service.delete(id).subscribe({
    //                 next: (resp: any) => {
    //                     location.reload();
    //                 },
    //                 error: (err: any) => {
    //                     console.log(err.error.message);
    //                 },
    //             });          
    // }

    delete(id: any): void {
        this.flashMessage = null;

        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'ลบรายการที่เลือก',
            message: 'คุณต้องการลบรายการที่เลือกใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this._service.delete(id).subscribe({
                    next: (resp: any) => {
                        location.reload();
                    },
                    error: (err: any) => {
                        this._fuseConfirmationService.open({
                            title: 'กรุณาระบุข้อมูล',
                            message: err.error.message,
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'ยืนยัน',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                        console.log(err.error.message);
                    },
                });
            }
        });
    }

    

    gotoAaddriver() {
        this.router.navigate(['/database/form']);
    }
    changes = new Subject<void>();

    seemore() {
        this.router.navigate(['admin/tasks/product/form']);
    }
    // changes = new Subject<void>();

    openDialogUploadcsv(): void {
        const dialogRef = this.dialog.open(DialogUploadcsv, {
            data: {},
        });

    }

    editElement(id: string) {
        console.log('edit', id);
        this._router.navigate(['database/edit'], { queryParams: { id: id } });
    }

    pdfname() {
        this._router.navigate(['https://influencermarketinghub.com/ebooks/Influencer_Marketing_Benchmark_Report_2023.pdf']);
    }


    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.
    firstPageLabel = `First page`;
    itemsPerPageLabel = `รายการต่อหน้า:`;
    lastPageLabel = `Last page`;

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

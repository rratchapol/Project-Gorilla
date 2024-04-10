import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
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
import { FormsModule } from '@angular/forms';
import { DialogUploadcsv } from '../dialoguploadcsv/dialoguploadcsv';
import { DialogFixdriver } from '../dialogfixdriver/dialogfixdriver';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@Component({
    selector: 'app-matching-list',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
        MatCardModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,],
    templateUrl: './matching-list.component.html',
    styleUrl: './matching-list.component.scss'
    , providers: [{ provide: MatPaginatorIntl, useClass: MatchingListComponent }],


})
@Injectable()

export class MatchingListComponent implements OnInit {

    constructor(public dialog: MatDialog) { }
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
    openDialogUploadcsv(): void {
        const dialogRef = this.dialog.open(DialogUploadcsv, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
    openDialogfixdriver(): void {
        const dialogRef = this.dialog.open(DialogFixdriver, {
            data: {},
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }
    changes = new Subject<void>();

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

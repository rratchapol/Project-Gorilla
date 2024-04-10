import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import {
    MatDialog,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseAlertComponent } from "../../../../../@fuse/components/alert/alert.component";
@Component({
    selector: 'app-matching-list',
    standalone: true,
    templateUrl: './dialoguploadcsv.html',
    styleUrl: './dialoguploadcsv.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule,
        FormsModule, MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose, FuseAlertComponent]
})
export class DialogUploadcsv implements OnInit {
    onClick: any;
    constructor(public dialog: MatDialog) { }
    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
    onFileChange($event: any) {

    }


}

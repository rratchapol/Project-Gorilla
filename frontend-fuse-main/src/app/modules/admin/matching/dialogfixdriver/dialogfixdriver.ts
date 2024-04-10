import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseAlertComponent } from "../../../../../@fuse/components/alert/alert.component";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-matching-list',
    standalone: true,
    templateUrl: './dialogfixdriver.html',
    styleUrl: './dialogfixdriver.scss',
    imports: [CommonModule, DataTablesModule, MatIconModule, MatFormFieldModule,
        FormsModule, MatToolbarModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose, FuseAlertComponent, MatSelectModule,
        ReactiveFormsModule]
})
export class DialogFixdriver implements OnInit {
    onClick: any;
    data: FormData
    item: any;
    formGroup: FormGroup;
    constructor(public dialog: MatDialog,
        private FormBuilder: FormBuilder) {
        this.formGroup = this.FormBuilder.group({
            // define your form controls here
            driver: [''],
            id: [''],
        });
    }
    dtOptions: DataTables.Settings = {};


    ngOnInit(): void {


        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }

    OnChanges() {
        this.item = this.formGroup.value.driver;
    }
    onFileChange($event: any) {

    }


}

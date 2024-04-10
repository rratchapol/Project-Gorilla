import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DataTableDirective } from 'angular-datatables';
import { SelectService } from '../select.service';

@Component({
    selector: 'app-branch-dialog',
    templateUrl: './branch-dialog.component.html',
    styleUrls: ['./branch-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatRadioModule,
        CommonModule,
    ],
})
export class BranchDialogComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    addForm: FormGroup;
    isLoading: boolean = false;
    positions: any[];

    flashMessage: 'success' | 'error' | null = null;
    constructor(
        private dialogRef: MatDialogRef<BranchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private _service: SelectService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef

    ) 
    {
        
    }

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            name: ['', Validators.required],
        });

    }


    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
    onSaveClick(): void {
        this.flashMessage = null;

        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            "title": "เพิ่มข้อมูล",
            "message": "คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ",
            "icon": {
                "show": false,
                "name": "heroicons_outline:exclamation",
                "color": "warning"
            },
            "actions": {
                "confirm": {
                    "show": true,
                    "label": "ยืนยัน",
                    "color": "primary"
                },
                "cancel": {
                    "show": true,
                    "label": "ยกเลิก"
                }
            },
            "dismissible": true
        });

        // Subscribe to the confirmation dialog closed action
        // confirmation.afterClosed().subscribe((result) => {
        //     if (result === 'confirmed') {
        //         const updatedData = this.addForm.value;
        //         this._service.create(updatedData).subscribe({
        //             next: (resp: any) => {
        //                 this.showFlashMessage('success');
        //                 this.dialogRef.close(resp);
        //             },
        //             error: (err: any) => {
        //                 this.addForm.enable();
        //                 this._fuseConfirmationService.open({
        //                     "title": "กรุณาระบุข้อมูล",
        //                     "message": err.error.message,
        //                     "icon": {
        //                         "show": true,
        //                         "name": "heroicons_outline:exclamation",
        //                         "color": "warning"
        //                     },
        //                     "actions": {
        //                         "confirm": {
        //                             "show": false,
        //                             "label": "ยืนยัน",
        //                             "color": "primary"
        //                         },
        //                         "cancel": {
        //                             "show": false,
        //                             "label": "ยกเลิก",

        //                         }
        //                     },
        //                     "dismissible": true
        //                 });
        //             }
        //         })
        //     }
        // })


        // แสดง Snackbar ข้อความ "complete"

    }



    onCancelClick(): void {

        this.dialogRef.close();
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

}

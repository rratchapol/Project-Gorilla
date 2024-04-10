import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, Inject, inject, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogFixdriver } from '../dialogdeletecustomer/dialogdeletecustomer';
@Component({
    selector: 'app-driver-form',
    standalone: true,
    imports: [
        MatToolbarModule, MatCardModule, CommonModule, MatIconModule, FormsModule, MatFormFieldModule, NgClass, MatInputModule, TextFieldModule, ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule, MatRadioModule
    ],
    templateUrl: './driver-form.component.html',
    styleUrl: './driver-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverFormComponent implements OnInit {

    id: any;

    // formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    // selectedValue: number = 1;

    form: FormGroup;

    private activateRoute = inject(ActivatedRoute);

    get ACTION(): 'CREATE' | 'UPDATE' {
        return !!this.id ? 'UPDATE' : 'CREATE';
    }

    constructor
        (
            private cdr: ChangeDetectorRef,
            private snackBar: MatSnackBar,
            private _formBuilder: FormBuilder,
            public dialog: MatDialog,
            private router: Router,
        ) {
        this.id = this.activateRoute.snapshot.params?.id;
    }

    companys = [
        { "id": 1, "name": "Dolores" },
        { "id": 2, "name": "Nichol" },
        { "id": 3, "name": "Cullin" },
        { "id": 4, "name": "Ric" },
        { "id": 5, "name": "Dean" },
        { "id": 6, "name": "Had" },
        { "id": 7, "name": "Trevor" },
        { "id": 8, "name": "Harlen" },
        { "id": 9, "name": "Barnabe" },
        { "id": 10, "name": "Selene" }
    ]

    customers = [
        { "id": 1, "name": "ฐิติมา" },
        { "id": 2, "name": "สุภัชยา" },
        { "id": 3, "name": "อาลาดิน" },
        { "id": 4, "name": "กรราชรร" },
        { "id": 5, "name": "มุกทองเพชร" },
        { "id": 6, "name": "อัตกร" },
        { "id": 7, "name": "ปัตถวิกร" },
        { "id": 8, "name": "นานา" },
        { "id": 9, "name": "โฆษณะ" },
        { "id": 10, "name": "มาตรัก" }
    ]

    datadriver =
        {
            "id": 1,
            "employeeNo": "ASAP001",
            "employeephone": "095-874-0032",
            "employeename": "อาลาดิน ",
            "employeesurename": " สุเบนโต",
            "employeetypedriver": 2,
            "employeecompany": 1,
            "customer": 6,
            "remark": "adnfkksndklvad",
        }



    Submit() {
        console.log('คลิก')
        // this.dialog.open(DriverComponent, {
        //     data: {
        //       animal: 'panda',
        //     },
        //   });
        this.snackBar.open('บันทึกเสร็จสิ้นเเล้ว', 'Close', {
            duration: 2000, // Duration in milliseconds
            horizontalPosition: 'center', // Positioning horizontally
            verticalPosition: 'bottom', // Positioning vertically
        });
    }

    // onRadioChange(event: any) {
    //     this.selectedValue = event.value;

    //     if (this.selectedValue === 1) {

    //     } else if (this.selectedValue === 2) {

    //     } else if (this.selectedValue === 3) {
    //         this.cdr.detectChanges();
    //     }
    // }
    backto() {
        this.router.navigate(['/driver']);
    }
    opendialogdeletecustomer() {
        const DialogRef = this.dialog.open(DialogFixdriver, {
            data: {}
        });
    }

    ngOnInit(): void {
        console.log(this.id)
        console.log(this.ACTION);

        this.form = this._formBuilder.group({
            employeeNo: ['', Validators.required],
            employeephone: ['', Validators.required],
            employeename: ['', Validators.required],
            employeesurename: ['', Validators.required],
            employeetypedriver: [''],
            employeecompany: [''],
            customer: [''],
            remark: ['']
        })
        if (this.ACTION == 'UPDATE') {
            this.form.patchValue({
                employeeNo: this.datadriver.employeeNo,
                employeephone: this.datadriver.employeephone,
                employeename: this.datadriver.employeename,
                employeesurename: this.datadriver.employeesurename,
                employeetypedriver: this.datadriver.employeetypedriver,
                employeecompany: this.datadriver.employeecompany,
                customer: this.datadriver.customer,
                remark: this.datadriver.remark,
            });
        }
    }

}



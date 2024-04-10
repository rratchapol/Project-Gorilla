import { MatSnackBar } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogFixdriver } from '../../driver/dialogdeletecustomer/dialogdeletecustomer';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-admin-form',
    standalone: true,
    imports: [
        CommonModule, MatToolbarModule, MatIconModule, FormsModule,
        MatFormFieldModule, NgClass, MatInputModule, TextFieldModule,
        ReactiveFormsModule, MatButtonToggleModule, MatButtonModule,
        MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule,
        MatRadioModule,
    ],
    templateUrl: './admin-form.component.html',
    styleUrl: './admin-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFormComponent {

    fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    // selectedValue: number = 1;

    form: FormGroup;

    private activateRoute = inject(ActivatedRoute);
    id: any;

    get ACTION(): 'CREATE' | 'UPDATE' {
        return !!this.id ? 'UPDATE' : 'CREATE';
    }
    constructor
        (
            private snackBar: MatSnackBar,
            private _formBuilder: FormBuilder,
            public dialog: MatDialog,
            private router: Router,
        ) {
        this.id = this.activateRoute.snapshot.params?.id;
    }

    dataManagement =
        {
            "id": 1,
            "employeename": "อาลาดิน ",
            "employeesurename": " สุเบนโต",
            "employeephone": "095-874-0032",
            "employeeEmail": "falsestateaccount@yahu.com",
            "typeofwork": 1,
            "department": 2,
        }
    typeofworks = [
        { "id": 1, "name": "admin" },
        { "id": 2, "name": "employee" },
        { "id": 3, "name": "employee02" },
    ]
    departments = [
        { "id": 1, "name": "ฝ่ายจัดหาบุคลากร" },
        { "id": 2, "name": "ฝ่ายบัญชี" },
        { "id": 3, "name": "ฝ่ายIT" },
        { "id": 4, "name": "ฝ่ายจัดซื้อ" },
        { "id": 5, "name": "ฝ่ายบริการลูกค้า" },
    ]

    backto() {
        this.router.navigate(['/admin']);
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
    opendialogdeletecustomer() {
        const DialogRef = this.dialog.open(DialogFixdriver, {
            data: {}
        });
    }
    test($event: Event) {
        console.log(this.dataManagement)
    }
    // onRadioChange(event: any) {
    //     this.selectedValue = event.value;

    //     if (this.selectedValue === 1) {

    //     } else if (this.selectedValue === 2) {

    //     } else if (this.selectedValue === 3) {
    //         // this.cdr.detectChanges();
    //     }
    // }
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            employeename: ['', Validators.required],
            employeesurename: ['', Validators.required],
            employeephone: ['',],
            employeeEmail: ['', Validators.required],
            typeofwork: [1,],
            department: ['',],
        })
        if (this.ACTION == 'UPDATE') {
            this.form.patchValue({
                employeename: this.dataManagement.employeename,
                employeesurename: this.dataManagement.employeesurename,
                employeephone: this.dataManagement.employeephone,
                employeeEmail: this.dataManagement.employeeEmail,
                typeofworks: this.dataManagement.typeofwork,
                department: this.dataManagement.department,
            })
        }
    }

}

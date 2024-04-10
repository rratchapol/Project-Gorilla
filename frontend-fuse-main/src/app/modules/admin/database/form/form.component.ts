import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NewChatComponent } from 'app/modules/admin/apps/chat/new-chat/new-chat.component';
import { ProfileComponent } from 'app/modules/admin/apps/chat/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'database-form',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        NgIf,
        NewChatComponent,
        ProfileComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        NgFor,
        NgClass,
        RouterLink,
        RouterOutlet,
        MatToolbarModule,
        MatDatepickerModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
})
export class FormComponent implements OnInit, OnDestroy {
    form: FormControl = new FormControl('', [Validators.required]);
    formFieldHelpers: any;
    shortcutForm: UntypedFormGroup;

    EmployeeArray : any[] = [];
    isResultLoaded = false;
    isUpdateFormActive = false;
  
    formData: FormGroup;
    formData2: FormGroup;
    // fullname: string ="";
    // gender: string ="";
    // email: string ="";
    // phone: Number =0;
    // career: string ="";
    // line_id: string ="";
    // content_style: string ="";
    // birthday: string ="";
  
    currentEmployeeID = "";

    @Output() deleteClicked = new EventEmitter<void>();
    private http: any;
    flashMessage: null;
    private _fuseConfirmationService: any;
    formValue: any;
    

    constructor(
        // private MatDialogModule:MatDialogModule,
        private toastr: ToastrService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private _fb: FormBuilder,
        private _service: DatabaseService,
        private fuseConfirmationService: FuseConfirmationService,
        http: HttpClient // Remove the duplicate declaration of 'http' variable
        

    ) { 
    }
    onInit(): void {
        this.formData = this._formBuilder.group({
            fullname: '',
            gender: '',
            email: '',
            phone: 0,
            career: '',
            line_id: '',
            content_style: '',
            birthday: '',
        });
    }
    
    ngOnInit(): void {
        this.shortcutForm = this._formBuilder.group({
            fullname: ['', Validators.required],
            phone: ['', Validators.required],
            career: ['', Validators.required],
            email: ['', Validators.required], 
            line_id: ['', Validators.required],
            gender: ['', Validators.required],
            content_style: ['', Validators.required],
            birthday: ['', Validators.required],
            
            returns_item: this._fb.array([])
        });
    }

    ngOnDestroy(): void {
       /////Unsubscribe from all subscriptions
    }

    gotolist() {
        alert("return to list")
        this.router.navigate(['/database/list']);
        // this.router.navigate(['/database/form']);
    }
    
 
    // create(): void {
    //     console.log(this.shortcutForm.value);
    //     console.log(this.shortcutForm);
        
    //     this.flashMessage = null;
    
    //     if (this._service) {
    //         let formValue = this.shortcutForm.value;
    //         console.log(formValue);
    //         this._service.create(formValue).subscribe({
    //             next: () => {
    //                 this.router.navigateByUrl('database/list').then(() => {  
    //                     alert('ok.');    
    //                 });
    //             },
    //             error: (error) => {
    //                 console.error('Error creating database entry:', error);
    //             }
    //         });
    //     } else {
    //         console.error('DatabaseService is not initialized.');
    //     }
    // }

    create(): void {
        this.flashMessage = null;
        this.flashMessage = null;
        const confirmation = this.fuseConfirmationService.open({
            title: 'สร้างรายการใหม่',
            message: 'คุณต้องการสร้างรายการใหม่ใช่หรือไม่ ',
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
                let formValue = this.shortcutForm.value;


                this._service.create(formValue).subscribe({
                    next: () => {
                        this.router
                            .navigateByUrl('database/list')
                            .then(() => { });
                    },
                    error: (err: any) => {
                        this.fuseConfirmationService.open({
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
                        // console.log(err.error.message);
                    },
                });
            }
        });
    }

    save(): void {
         this.shortcutForm.markAllAsTouched();

     // Check if the form is valid
     if (this.shortcutForm.valid) {
         // Proceed with the sign-up action
         // For example, you can call your sign-up service here
         console.log('Form is valid. Proceed with sign-up action.');
     } else {
         // If the form is invalid, do something (e.g., display validation errors)
         console.log('Form is invalid. Display validation errors.');
     }
    }
    

    gotoAaddriver() {
        this.router.navigate(['']);
    }
  

    removeUserApprove(i: number): void {
        this.returns_item.removeAt(i);
    }

    addApprover(data?: any) {
        const a = this._fb.group({
            item_id: [null],
            name: [null],
            qty: [null],
            price_per_unit: [null],
        });

        if (data) {
            a.patchValue({
                ...data,
            });
        }
        console.log(this.returns_item);

        this.returns_item.push(a);
    }

        deleteElement() {
            // ส่งอีเวนต์ deleteClicked เมื่อปุ่มถูกคลิก
            this.deleteClicked.emit();
          }

          get returns_item() {
            return this.shortcutForm.get("returns_item") as FormArray;
        }

}

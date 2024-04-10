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
import { Service } from './page.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NgxDropzoneModule } from 'ngx-dropzone';


@Component({
    selector: 'admin-fill-out',
    templateUrl: './fill-out.component.html',
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
        NgxDropzoneModule,
        
    ],
})
export class FillOutComponent implements OnInit {
    form: FormControl = new FormControl('', [Validators.required]);
    formFieldHelpers: any;
    addForm: FormGroup;
    shortcutForm: UntypedFormGroup;
    flashMessage: 'success' | 'error' | null = null;
    @Output() deleteClicked = new EventEmitter<void>();
    location: any;


    constructor(
        // private MatDialogModule:MatDialogModule,
        private toastr: ToastrService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private _fb: FormBuilder,
        private _router: Router,
        private _service: Service,
        private _fuseConfirmationService: FuseConfirmationService,



    ) {
    }
    // ngOnDestroy(): void {
    //     throw new Error('Method not implemented.');
    // }

    onSaveClick(): void {
        this.flashMessage = null;
        if (this.addForm.value!) {
            this.addForm.enable();
            this._fuseConfirmationService.open({
                "title": "กรุณาระบุข้อมูล",
                "message": "กรุณาระบุข้อมูลให้ครบถ้วน",
                "icon": {
                    "show": true,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": false,
                        "label": "ยืนยัน",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": false,
                        "label": "ยกเลิก",

                    }
                },
                "dismissible": true
            });

            return;
        }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            "title": "ยืนยันข้อมูล",
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


    ngOnInit(): void {
        this.getlocationid()
        this.shortcutForm = this._formBuilder.group({
            fullname: ['', Validators.required],
            phone: ['', Validators.required],
            occupation: ['', Validators.required],
            email: ['', Validators.required],
            id: ['', Validators.required],
            content: ['', Validators.required],
            returns_item: this._fb.array([])
        });
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
    
    // save(): void {
    //     this.shortcutForm.markAllAsTouched();
    //     if (this.shortcutForm.valid) {
    //         console.log('Form is valid. Proceed with sign-up action.');
    //     } else {
    //         console.log('Form is invalid. Display validation errors.');
    //     }
    // }
    save(){
        this._router.navigate(['database/list'])
    }
    
    backTo(){
        this._router.navigate(['database/list'])
    }

    getlocationid() {
        this._service.getlocationid().subscribe((resp:any)=>{
            this.location=resp.data;
    })
    }
    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);

        // this.addForm.patchValue({
        //     image: this.files[0]
        // })

        var reader = new FileReader();
        reader.readAsDataURL( this.files[0]);
        reader.onload=(e: any)=>
        this.url_logo=e.target.result;
        const file =  this.files[0];
       
    }
}

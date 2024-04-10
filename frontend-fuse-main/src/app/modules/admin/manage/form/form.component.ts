import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass, Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Service } from '../page.service';
import { tap } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'manage-form',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    
    imports: [
        CommonModule,
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
        DataTablesModule
    ],
})

export class FormComponent implements OnInit, AfterViewInit {
    [x: string]: any;
    isLoading: boolean = false;
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    form: FormGroup;
    ItemType: any[]=[]
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    flashMessage: 'success' | 'error' | null = null;
    addForm: FormGroup;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: Service,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _route: ActivatedRoute,
        private _routeback: Location,
    ) {
        this.form = this._fb.group({
            item_type_id: '',
            vendor_id: '',
            location_id: '',
            unit_id: '',
            item_id: '',
            name: '',
            description: '',
            brand: '',
            unit_cost: '',
            unit_price: '',
            set_type: '',
            image: '',
        });
        this.addForm = this._fb.group({
            item_type_id: '',
            vendor_id: '',
            location_id: '',
            unit_id: '',
            item_id: '',
            name: '',
            description: '',
            brand: '',
            unit_cost: '',
            unit_price: '',
            set_type: 'normal',
            image: '',

        });
    }

    ngOnInit() {
    this.getitemtype()
    this.getvendor()
    this.getlocationid()
    this.getunit()

    // this.addForm = this.formBuilder.group({
    //     name: ['', Validators.required],
        
    // });
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    onSaveClick(): void {
        this.flashMessage = null;
        console.log(this.addForm.value );
       
        

        
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

        

        // confirmation.afterClosed().subscribe((result) => {
        //     if (result === 'confirmed') {
        //         const updatedData = this.addForm.value;
        //         this._service.create(updatedData).subscribe({
        //             next: (resp: any) => {
        //                 this.showFlashMessage('success');
        //                 // this.dialogRef.close(resp);
        //                 // this.dialogRef.close(resp);
        //                 // this.rerender()
        //                 // this.route.navigate(['/admin/product/list'])
        //                 this.location.back();

        //             },
        //             error: (err: any) => {
        //                 console.error(err);
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

    }
    onCancelClick(): void {
        // ตรวจสอบว่า _router มีค่าหรือไม่ก่อนเรียกใช้งาน
        this._routeback.back();
    }
    // onFileSelected(event: any) {
    //     const selectedFile = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('image', selectedFile);
    //     formData.append('path', "images/item/");
    
    //     this._service.uploadimages(formData).subscribe({
    //         next: (resp: any) => {
    //             console.log(resp);
    //             // อัพเดทค่าของ addForm.value.image ด้วยค่าที่ได้จาก response
    //             this.addForm.value.image = resp.data;
    //             console.log(this.addForm.value.image);
    
    //             // คุณอาจต้องตรวจสอบว่า addForm ถูกอัพเดทถูกต้องหรือไม่
    //             console.log(this.addForm.value);
    
               
                
    //         },
    //     });
    // }
    // getitemtype() {
    //     this._service.getItemType().subscribe((resp:any)=>{
    //     this.ItemType=resp.data;
        
        
    //     })
    // }

    // getlocationid() {
    //     this._service.getlocationid().subscribe((resp:any)=>{
    //         this.location=resp.data;
    // })
    // }

    // getvendor() {
    //     this._service.getvendor().subscribe((resp:any)=>{
    //         this.Vendors=resp.data;
    // })
    // }

    // getunit() {
    //     this._service.getunit().subscribe((resp:any)=>{
    //         this.Unit=resp.data;
    // })
    // }
   


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
    rerender(): void {
        if (this.dtElement && this.dtElement.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.ajax.reload();
            });
        } else {
            // console.error("Data table instance is not available.");
            // Provide fallback behavior or notify the user
        }
    }

    
}


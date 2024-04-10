import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass, Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Service } from '../page.service';
import { DataTablesModule } from 'angular-datatables';;
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'product-edit',
    templateUrl: './edit.component.html',
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

export class EditComponent implements OnInit, AfterViewInit {
    @Output() saveClicked: EventEmitter<any> = new EventEmitter();
    isLoading: boolean = false;
    form: FormGroup;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    id: string;
    dtOptions: DataTables.Settings = {};
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ItemType: any;
    location: any;
    Vendors: any;
    Unit: any;
    addForm: FormGroup;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: Service,
        private _fb: FormBuilder,
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
            image: '',
            unit_cost: '',
            unit_price: '',
            set_type: 'normal',
        });
    }

    ngOnInit() {
        // this.getitemtype()

        // this.id = this._route.snapshot.paramMap.get('id');
        // this._service.getCustomerId(this.id).subscribe((resp: any) => {
        //     this.form.patchValue({
        //         ...resp.data
           
        //        });

        //     this.form = this._fb.group({
        //         item_type_id: resp.data.item_type.id,
        //         vendor_id: resp.data.vendor_id,
        //         location_id: resp.data.location.id,
        //         unit_id: resp.data.unit_id,
        //         item_id: resp.data.item_id,
        //         name: resp.data.name,
        //         description: resp.data.description,
        //         brand: resp.data.brand,
        //         image: resp.data.image,
        //         unit_cost: resp.data.unit_cost,
        //         unit_price: resp.data.unit_price,
        //         set_type: 'normal',



        //     });
        //     console.log("son",this.form.value);

        // });
        
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    onSaveClick(): void {
        // this._service.update(this.form.value, this.id).subscribe((resp: any) => {
        //     this._routeback.back();

        // });
    }
    onCancelClick(): void {
        this._routeback.back();
    }

    getitemtype() {
        // this._service.getItemType().subscribe((resp: any) => {
        //     this.ItemType = resp.data;

        // })
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
}



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
import { DataTableDirective } from 'angular-datatables';
import {MatExpansionModule} from '@angular/material/expansion';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'tasks-form',
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
        MatExpansionModule
    ],
})
export class FormComponent implements OnInit, OnDestroy {
addApprover1() {
throw new Error('Method not implemented.');
}
    panelOpenState = false;
    step = 0;

    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
  
    prevStep() {
      this.step--;
    }
    form: FormControl = new FormControl('', [Validators.required]);
    formFieldHelpers: any;
    Form: FormGroup;
    dtOptions: DataTables.Settings = {};
    dtElement!: DataTableDirective;
    shortcutForm: UntypedFormGroup;
    @Output() deleteClicked = new EventEmitter<void>();
    startDate = new Date(1990, 0, 1);
    flashMessage: 'success' | 'error' | null = null;


    /**
     * Constructor
     */
    constructor(
        // private MatDialogModule:MatDialogModule,
        private toastr: ToastrService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,


    ) {

    }
    ngOnDestroy(): void {
     
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.Form = this._formBuilder.group({
            product: ['', Validators.required],
            phone: ['', Validators.required],
            datestart: ['', Validators.required],
            dateend: ['', Validators.required],
            returns_item: this._fb.array([]),
            returns_itemm: this._fb.array([]),
            
        });
    
    }
    gotoAaddriver() {
        this._router.navigate(['']);
    }
   
    removeUserApprove(i: number): void {
        this.returns_item.removeAt(i);
        
    }
    removeUserApprover(i: number): void {
        this.returns_itemm.removeAt(i);
        
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

    addriverr(data?: any) {
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
        console.log(this.returns_itemm);

        this.returns_itemm.push(a);
    }

    deleteElement() {
        // ส่งอีเวนต์ deleteClicked เมื่อปุ่มถูกคลิก
        this.deleteClicked.emit();
    }

    get returns_item() {
        return this.Form.get("returns_item") as FormArray;
    }
    get returns_itemm() {
        return this.Form.get("returns_itemm") as FormArray;
    }
    onSaveClick(): void {
        this.flashMessage = null;
       
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

    }

    backTo(){
        this._router.navigate(['tasks/list'])
    }

    save(){
        this._router.navigate(['tasks/list'])
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
     
   
}

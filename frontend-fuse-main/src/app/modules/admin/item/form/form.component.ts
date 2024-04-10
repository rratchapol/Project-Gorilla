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
        ReactiveFormsModule
    ],
})
export class FormComponent implements OnInit, OnDestroy {
    form: FormControl = new FormControl('', [Validators.required]);
    formFieldHelpers: any;
    Form: FormGroup;
    dtOptions: DataTables.Settings = {};
    dtElement!: DataTableDirective;
    shortcutForm: UntypedFormGroup;
    @Output() deleteClicked = new EventEmitter<void>();
    startDate = new Date(1990, 0, 1);


    /**
     * Constructor
     */
    constructor(
        // private MatDialogModule:MatDialogModule,
        private toastr: ToastrService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _fb: FormBuilder,


    ) {

    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
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
            returns_item: this._fb.array([])
        });
    
    }
    gotoAaddriver() {
        this._router.navigate(['']);
    }
  

    removeUserApprove(i: number): void {
        this.returns_item.removeAt(i);
    }

    addApprover(data?: any) {
        const a = this._fb.group({
            productname: [null],
            human: [null],
            description: [null],
        });

        if (data) {
            a.patchValue({
                ...data,
            });
        }
        console.log(this.returns_item);

        this.returns_item.push(a);
    }
    save(): void {
        this.Form.markAllAsTouched();

    // Check if the form is valid
    if (this.Form.valid) {
        // Proceed with the sign-up action
        // For example, you can call your sign-up service here
        console.log('Form is valid. Proceed with sign-up action.');
    } else {
        // If the form is invalid, do something (e.g., display validation errors)
        console.log('Form is invalid. Display validation errors.');
    }
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 10,
            serverSide: true,
            processing: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json",
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                // that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                //     this.dataRow = resp.data.data;
                //     console.log('111',this.dataRow)
                //     this.pages.current_page = resp.current_page;
                //     this.pages.last_page = resp.last_page;
                //     this.pages.per_page = resp.per_page;
                //     if (resp.currentPage > 1) {
                //         this.pages.begin =
                //             parseInt(resp.itemsPerPage) * (parseInt(resp.currentPage) - 1);
                //     } else {
                //         this.pages.begin = 0;
                //     }

                //     callback({
                //         recordsTotal: resp.data.total,
                //         recordsFiltered: resp.data.total,
                //         data: [],
                //     });
                //     this._changeDetectorRef.markForCheck();
                // });
            },
            columns: [
                { data: 'name' },
                { data: 'gender' },
                { data: 'phone' },
                { data: 'occupation' },
                { data: 'email' },
                { data: 'id' },
                { data: 'lifeStyle' },
            ],
        };
    }

    backTo() {
        this._router.navigate(['admin/employee/list'])
        this.rerender()
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

    deleteElement() {
        // ส่งอีเวนต์ deleteClicked เมื่อปุ่มถูกคลิก
        this.deleteClicked.emit();
      }

      get returns_item() {
        return this.shortcutForm.get("returns_item") as FormArray;
    }
    
}

import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'rxjs';
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
import { FormArray, FormGroup, FormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { DialogUploadcsv } from '../../matching/dialoguploadcsv/dialoguploadcsv';
import { TasksService } from '../tasks.service';
import { InventoryProduct } from '../tasks.types';
import {MatExpansionModule} from '@angular/material/expansion';
// import { DialogUploadcsv } from '../../matching/dialoguploadcsv/dialoguploadcsv';

@Component({

    selector: 'list',
    standalone: true,
    imports: [CommonModule, DataTablesModule, MatButtonToggleModule,
        DataTablesModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatPaginatorModule,

        MatCardModule,
        MatTabsModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        RouterLink,
        MatToolbarModule,
        MatExpansionModule
    
    ],
    templateUrl: './list.component.html',
    providers: [{ provide: MatPaginatorIntl, useClass: ListComponent }],
})
export class ListComponent {
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
    EmployeeForm: FormGroup;
    shortcutForm: UntypedFormGroup;
    public dataRow: any[];
    toggle: boolean = false
    flashMessage: 'success' | 'error' | null = null;
    selectedProductForm: UntypedFormGroup;
    selectedProduct: InventoryProduct | null = null;
    
id: any;
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: TasksService,
        private _router: Router,
        private _formBuilder: UntypedFormBuilder,

    ) { }

    dtOptions: DataTables.Settings = {};

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };

        {
            // Create the selected product form
            this.selectedProductForm = this._formBuilder.group({
                id               : [''],
                category         : [''],
                name             : [''],
                description      : [''],
                tags             : [[]],
                sku              : [''],
                barcode          : [''],
                brand            : [''],
                vendor           : [''],
                stock            : [''],
                reserved         : [''],
                cost             : [''],
                basePrice        : [''],
                taxPercent       : [''],
                price            : [''],
                weight           : [''],
                thumbnail        : [''],
                images           : [[]],
                currentImageIndex: [0], // Image index that is currently being viewed
                active           : [false],
            });
    }
    }
    toggleDetails(): void{
        this.toggle = !this.toggle
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
                { data: 'tasks' },
                { data: 'product' },
                { data: 'start_at' },
                { data: 'finish_at' },
            ],
        };
    }
    closeDetails(): void
    {
        this.selectedProduct = null;
    }

    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             //    console.log(result,'result')
    //         }
    //     });
    // }
    
    gotoAaddriver() {
        this.router.navigate(['/tasks/form']);
    }
    onsaveclick() {
        this.router.navigate(['/item/list']);
    }
    ohno() {
        this.router.navigate(['/select/list']);
    }
    changes = new Subject<void>();

    seemore() {
        this.router.navigate(['/tasks/product/form']);
    }
    // changes = new Subject<void>();

    openDialogUploadcsv(): void {
        const dialogRef = this.dialog.open(DialogUploadcsv, {
            data: {},
        });

    }

    get returns_item() {
        return this.shortcutForm.get("returns_item") as FormArray;
    }

    editElement() {
        
        this._router.navigate(['admin/employee/edit']);
    }
    updateSelectedProduct(): void
    {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();

        // Remove the currentImageIndex field
        delete product.currentImageIndex;

        // Update the product on the server
        this._service.updateProduct(product.id, product).subscribe(() =>
        {
            // Show a success message
            this.showFlashMessage('success');
        });
    }
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() =>
        {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.


    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `Page 1 of 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Page ${page + 1} of ${amountPages}`;
    }

    goTo(){
        this._router.navigate(['select/list'])
    }
}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
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
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Service } from '../page.service';
import { tap } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { EditComponent } from '../edit/edit.component';


@Component({
    selector: 'manage-list',
    templateUrl: './list.component.html',
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

export class ListComponent implements OnInit, AfterViewInit {
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    public dataRow: any[];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: Service,
        private _router: Router
       
    ) {

    }

    ngOnInit() {
        // this.loadTable();
        // this._service.getPosition().subscribe((resp: any) => {
        //     this.positions = resp.data
        // })
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    add(){
        this._router.navigate(['/admin/product/form'])
        this.rerender()
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
                // dataTablesParameters.status = null;
                dataTablesParameters.item_type_id = null;
                dataTablesParameters.set_type = "normal";
                // that._service.getPage(dataTablesParameters).subscribe((resp: any) => {
                //     this.dataRow = resp.data.data;
                //     this.pages.current_page = resp.data.current_page;
                //     this.pages.last_page = resp.data.last_page;
                //     this.pages.per_page = resp.data.per_page;
                    
                //     if (resp.data.current_page > 1) {
                //         this.pages.begin =
                //             parseInt(resp.data.per_page) * (parseInt(resp.data.current_page) - 1);
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
                { data: 'age' },
                { data: 'accupation' },
                { data: 'Lifestyle' },
                { data: 'namefb' },
                { data: 'follower' },
            ],
        };
    }

    // deleteElement(item: any): void {
    //     this._service.deleteCustomer(item.id).subscribe((resp: any) => {          
    //     });  
    //     this.rerender()
    //   }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }

    editElement(item: any) {
        this._router.navigate(['admin/manage/edit/' +item.id]);
        this.rerender()
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }




}



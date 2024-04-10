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
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../timeline.service';
// import { DatabaseService } from './database.service';

@Component({
    selector: 'timeline-edit',
    templateUrl: './edit.component.html',
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
export class EditComponent implements OnInit, OnDestroy {
    form: FormControl = new FormControl('', [Validators.required]);
    formFieldHelpers: any;
    shortcutForm: UntypedFormGroup;
    @Output() deleteClicked = new EventEmitter<void>();
    

    constructor(
        // private MatDialogModule:MatDialogModule,
        private toastr: ToastrService,
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private _service: DatabaseService,
        private _fb: FormBuilder,



    ) {
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
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
    
    ngOnInit(): void {
        this.shortcutForm = this._formBuilder.group({
            name: ['', Validators.required],
            human: ['', Validators.required],
            kpi: ['', Validators.required],
            dateprofile: ['', Validators.required],
            datedrft: ['', Validators.required],
            datework: ['', Validators.required],
            description: ['', Validators.required],
            
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

}

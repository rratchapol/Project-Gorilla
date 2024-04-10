
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit, ChangeDetectorRef , Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [ MatTableModule, MatToolbarModule, DataTablesModule, MatCardModule, CommonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule, MatRadioModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss',
})
export class DriverDetailComponent {
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
      this.dtOptions = {
          pagingType: 'full_numbers'
      };
  }
}

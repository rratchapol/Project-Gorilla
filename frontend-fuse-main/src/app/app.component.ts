import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent {
    myForm: FormGroup;
    
  
    constructor(private formBuilder: FormBuilder) {
      this.myForm = this.formBuilder.group({
        // account = new FormControl(null, Validators.required);
      });
    }
  
    onSubmit() {
      if (this.myForm.valid) {
        // Form submission logic
      }
    }
  }

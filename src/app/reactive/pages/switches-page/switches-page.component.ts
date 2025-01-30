import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public person = {
    gender: 'F',
    wantNotifications: false,
  }


  public myForm: FormGroup

  constructor (private fb: FormBuilder ){
    this.myForm = this.fb.group({
      gender: ['M', Validators.required ],
      wantNotifications: [ true, Validators.required ],
      termsAndConditions: [ false, Validators.requiredTrue],
    })
  }
  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField( field: string): boolean| null{
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave() {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
  }


}

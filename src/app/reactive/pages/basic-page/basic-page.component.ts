import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {
  public myForm: FormGroup = new FormGroup ({
    name: new FormControl ('', [ Validators.required, Validators.minLength(3) ] ),
    price: new FormControl ('0', [ Validators.required, Validators.min(0)] ),
    inStorage: new FormControl('0', [ Validators.required, Validators.min(0)]),
  })

  public onSave(){
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price:0, inStorage:0});

  }
}

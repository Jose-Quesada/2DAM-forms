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

  isValidField( field: string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string): string | null {
    if (!this.myForm.controls[field] ) return null;
    //si el formulario no tiene ese campo no regreso nada

    const errors = this.myForm.controls[field].errors || {};
    //si el campo contiene errores se almacenan, en otro caso objeto vacío

    for (const key of Object.keys(errors)) {
      //recorro los distintos "keys" del objeto errors
      switch ( key ){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          //return `Mínimo 3 caracteres`;
          return `Mínimo ${errors['minlength'].requiredLength } caracteres`;
      }

    }
    return 'null';

  }


}

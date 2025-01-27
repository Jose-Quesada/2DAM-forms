import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public newFavorite: FormControl = new FormControl('',Validators.required)


  public myForm: FormGroup;

//TODO revisar la inicialización fuera del constructor
  constructor ( private fb:FormBuilder ) {
     this.myForm=this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      favoritesGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Half Life', Validators.required],
      ])
    })

  }

  onSubmit(): void{
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();

  }

  get favoriteGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  isValidField( field: string):boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ){
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  onDeleteFavorite( index:number ):void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites():void{
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required)
    );

    this.newFavorite.reset();


  }



}

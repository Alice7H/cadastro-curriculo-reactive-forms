import { DestroyRef, Directive, HostListener, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[appInputValidation]',
})
export class InputValidationDirective {
  private readonly _ngControl = inject(NgControl, {self: true});
  private readonly _destroyRef = inject(DestroyRef);

  @Input() errorMessage = 'Campo inválido.';

  ngOnInit(){
    console.log('onInit error message: ', this.errorMessage);
    this._ngControl.statusChanges?.pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe(()=> {
      console.log('status mudou!');
      this.updateStatus();
    })
  }

  @HostListener('blur')
  onBlur(){
    console.log('Ocorreu um blur');
    this.updateStatus();
  }

  updateStatus() {
    const control = this._ngControl.control;
    if(!control) return;

    const isInvalid = control.invalid && control.touched;
    if(isInvalid){
      console.log('invalido');
    } else {
      console.log('válido');
    }
  }
}
import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[appInputValidation]',
})
export class InputValidationDirective {
  @Input() errorMessage = 'Campo inválido.';

  ngOnInit(){
    console.log('onInit error message: ', this.errorMessage);
  }

  @HostListener('blur')
  onBlur(){
    console.log('Ocorreu um blur');
  }
}
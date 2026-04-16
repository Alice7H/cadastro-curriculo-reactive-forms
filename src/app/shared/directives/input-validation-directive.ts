import { DestroyRef, Directive, ElementRef, HostListener, inject, Input, Renderer2 } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[appInputValidation]',
})
export class InputValidationDirective {
  private readonly _ngControl = inject(NgControl, {self: true});
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

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
      this.setInvalidStyles();
    } else {
      this.setValidStyles();
    }
  }
 
  setInvalidStyles() {
    const element = this._elementRef.nativeElement;

    this._renderer2.removeClass(element, 'border-zinc-800');
    this._renderer2.removeClass(element, 'focus:border-violet-500');
    this._renderer2.removeClass(element, 'focus:ring-violet-500');

    this._renderer2.addClass(element, 'border-red-500');
    this._renderer2.addClass(element, 'focus:border-red-500');
    this._renderer2.addClass(element, 'focus:ring-red-500');
  }

  setValidStyles() {
    const element = this._elementRef.nativeElement;

    this._renderer2.removeClass(element, 'border-red-500');
    this._renderer2.removeClass(element, 'focus:border-red-500');
    this._renderer2.removeClass(element, 'focus:ring-red-500');

    this._renderer2.addClass(element, 'border-zinc-800');
    this._renderer2.addClass(element, 'focus:border-violet-500');
    this._renderer2.addClass(element, 'focus:ring-violet-500');
  }

}
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import type { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[catalogQuery][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SearchQueryValidatorDirective),
    multi: true,
  }],
})
export class SearchQueryValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const length = (control.value ?? '').trim().length;
    return length === 1 ? { catalogQuery: { minLength: 2 } } : null;
  }
}

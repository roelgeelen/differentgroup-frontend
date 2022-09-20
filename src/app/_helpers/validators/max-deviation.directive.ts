import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import {MaxDeviation} from "./max-deviation.validator";

@Directive({
  selector: '[maxDeviation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxDeviationDirective, multi: true }]
})
export class MaxDeviationDirective implements Validator {
  @Input('maxDeviation') maxDeviation: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    // @ts-ignore
    return MaxDeviation(this.maxDeviation[0], this.maxDeviation[1], this.maxDeviation[2], this.maxDeviation[3])(formGroup);
  }
}

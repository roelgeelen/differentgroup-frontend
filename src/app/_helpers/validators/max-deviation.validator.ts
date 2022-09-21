import {FormGroup, ValidatorFn} from '@angular/forms';

// custom validator to check that two fields match
export function maxDeviation(controlName: string, deviation: string, deviationControlName: string, deviationControlName2?: string): ValidatorFn {
  // @ts-ignore
  return (formGroup: FormGroup) => {
    console.log(formGroup.controls)
    const control = formGroup.controls[controlName];
    let controlValue = formGroup.controls[controlName].value;
    let deviationControl = formGroup.controls[deviationControlName].value;
    let deviationControl2 = 0;
    if (deviationControlName2 !== undefined) {
      deviationControl2 = formGroup.controls[deviationControlName2].value;
    }

    // return null if controls haven't initialised yet
    if (!control || !deviationControl) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (control.errors) {
      return null;
    }

    let value = deviationControl + (deviationControl - deviationControl2);
console.log(value);
    // set error on matchingControl if validation fails
    if (control.value !== value) {
      control.setErrors({ mustMatch: true });
    } else {
      control.setErrors(null);
    }
  }
}

import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MaxDeviation(controlName: string, deviation: string, deviationControlName: string, deviationControlName2?: string) {
  // @ts-ignore
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const deviationControl = formGroup.controls[deviationControlName];
    if (deviationControlName2 !== undefined) {
      const deviationControl2 = formGroup.controls[deviationControlName2];
    }

    // return null if controls haven't initialised yet
    if (!control || !deviationControl) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (control.errors) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

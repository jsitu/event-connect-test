import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  // tslint:disable-next-line:member-ordering
  phoneNumMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // Custom form validator for phone number
  validatePhone(control: FormControl): {[s: string]: boolean} {
    if (control.value) {
      const phone = control.value.replace(' ', '').replace('(', '').replace(')', '-').split('-');
      const areaCode = phone[0];
      const num1 = phone[1];
      const num2 = phone[2];
      if (isNaN(areaCode) || areaCode.length < 3 ||
          isNaN(num1) || num1.length < 3 ||
          isNaN(num2) || num2.length < 4) { return {'phoneNumIsInvalid': true}; }
    }

    return null;
  }

}

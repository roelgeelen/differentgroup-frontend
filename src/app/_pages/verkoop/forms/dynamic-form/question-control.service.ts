import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TabBase} from "./model/tab-base";

@Injectable()
export class QuestionControlService {
  constructor() {
  }

  toFormGroup(tabs: TabBase[]) {
    const group: any = {};
    tabs.forEach(tab => {
      tab.questions.forEach(question => {
        if (question.controlType == 'text') {
          question.fields.forEach(field => {
            group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
              : new FormControl(field.value || '');
          })
        } else {
          group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '');
        }
      });
    })
    group['deal_id'] = new FormControl('');
    group['adviseur'] = new FormControl('');
    group['dealname'] = new FormControl('');
    return new FormGroup(group);
  }
}

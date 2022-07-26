import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
            group[field.key] = new FormControl(field.value || '', field.validators);
          })
        } else {
          group[question.key] = new FormControl(question.value || '', question.validators);
        }
      });
    })
    group['deal_id'] = new FormControl('');
    group['adviseur'] = new FormControl('');
    group['title'] = new FormControl('');
    group['dealname'] = new FormControl('');
    return new FormGroup(group);
  }
}

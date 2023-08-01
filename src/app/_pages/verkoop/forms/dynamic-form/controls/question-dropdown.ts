import { QuestionBase } from '../model/question-base';

export class DropdownQuestion extends QuestionBase<string> {
  override controlType = 'dropdown';
}

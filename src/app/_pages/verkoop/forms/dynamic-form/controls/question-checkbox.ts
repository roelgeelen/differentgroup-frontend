import { QuestionBase } from '../model/question-base';

export class CheckboxQuestion extends QuestionBase<string> {
  override controlType = 'checkbox';
}

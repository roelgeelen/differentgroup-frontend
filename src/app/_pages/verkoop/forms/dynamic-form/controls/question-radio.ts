import { QuestionBase } from '../model/question-base';

export class RadioQuestion extends QuestionBase<string> {
  override controlType = 'radio';
}

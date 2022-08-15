import { QuestionBase } from '../model/question-base';

export class TableQuestion extends QuestionBase<string> {
  override controlType = 'table';
}

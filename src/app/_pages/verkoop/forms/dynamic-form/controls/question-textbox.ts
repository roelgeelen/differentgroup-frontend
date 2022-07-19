import { QuestionBase } from '../model/question-base';

export class TextQuestion extends QuestionBase<string> {
  override controlType = 'text';
}

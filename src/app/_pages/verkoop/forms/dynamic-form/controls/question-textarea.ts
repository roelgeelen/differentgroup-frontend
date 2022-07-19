import { QuestionBase } from '../model/question-base';

export class TextareaQuestion extends QuestionBase<string> {
  override controlType = 'textarea';
}

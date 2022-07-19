import { QuestionBase } from '../model/question-base';

export class UploadQuestion extends QuestionBase<string> {
  override controlType = 'upload';
}

import { QuestionBase } from '../model/question-base';

export class CalculationQuestion extends QuestionBase<string> {
  override controlType = 'calc';
}

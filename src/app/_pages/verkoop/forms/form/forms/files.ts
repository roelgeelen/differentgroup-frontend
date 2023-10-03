import {QuestionBase} from "../../dynamic-form/model/question-base";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";

export const algemeen: QuestionBase<string>[] = [
  new UploadQuestion({
    key: 'prodte',
    label: 'Productie tekening',
    type: 'file'
  }),
  new UploadQuestion({
    key: 'inmeet',
    label: 'Inmeet document',
    type: 'file',
  }),
  new UploadQuestion({
    key: 'bst1',
    label: 'Situatie foto 1',
    type: 'image',
  }),
  new UploadQuestion({
    key: 'bst2',
    label: 'Situatie foto 2',
    type: 'image',
  }),
  new UploadQuestion({
    key: 'bst3',
    label: 'Situatie foto 3',
    type: 'image',
  }),
  new UploadQuestion({
    key: 'bst4',
    label: 'Situatie foto 4',
    type: 'image',
  }),
  new UploadQuestion({
    key: 'bst5',
    label: 'Situatie foto 5',
    type: 'image',
  }),
];

export const files: TabBase[] = [
  {
    label: "Algemeen",
    questions: algemeen
  },
]

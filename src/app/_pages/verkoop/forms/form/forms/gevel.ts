import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";
import {TableQuestion} from "../../dynamic-form/controls/question-table";
export const gevelbekleding: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'aanbrengen_gevelbekleding',
    label: 'Aanbrengen overige gevelbekleding',
    options: [
      {value: 'N.v.t.'},
      {value: 'Gevelbekleding los geleverd (montage door klant)', article: {sku:'SDH407', order:100}},
      {value: 'Gevelbekleding gemonteerd door Different Doors (zie gele arcering)', article: {sku:'SDH402', order:100}},
      {value: 'Gevelbekleding door klant (geen levering Different Doors)'},
    ],
    other: true,
    value: 'N.v.t.',
    custom: ''
  }),
  new TableQuestion({
    key: 'gevel_afmetingen',
    label: 'Afmetingen (in mm)',
    fields: [
      {key: 'title', label: 'Gevel', type: 'text'},
      {key: 'breedte', label: 'Breedte', type: 'number'},
      {key: 'hoogte', label: 'Hoogte', type: 'number'},
      {key: 'isEdit', label: '', type: 'isEdit'},
    ],
    value: [{title: 'Gevel 1', breedte: '', hoogte: ''}],
    dependent: [
      {
        field: 'aanbrengen_gevelbekleding',
        values: ['Gevelbekleding geproduceerd en gemonteerd door Different Doors (zie gele arcering)', 'Gevelbekleding los geleverd (montage door klant), enkel de stalen zethoeken worden door Different Doors bekleed', 'Gevelbekleding los geleverd (montage door klant)']
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Aantal m2:',
    value: '(this.form.controls[\'gevel_afmetingen\'].value.reduce((sum, current) => sum + parseInt(current.breedte), 0) / 1000) * (this.form.controls[\'gevel_afmetingen\'].value.reduce((sum, current) => sum + parseInt(current.hoogte), 0) / 1000)',
    dependent: [
      {
        field: 'aanbrengen_gevelbekleding',
        values: ['Gevelbekleding geproduceerd en gemonteerd door Different Doors (zie gele arcering)', 'Gevelbekleding los geleverd (montage door klant), enkel de stalen zethoeken worden door Different Doors bekleed', 'Gevelbekleding los geleverd (montage door klant)']
      }
    ]
  })
];

export const montage: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'hulpmiddelen',
    label: 'Hulpmiddelen',
    options: [
      {value: 'N.v.t.'},
      {value: 'Hoogwerker door DD', article: {sku:'SDH603', order:100}},
      {value: 'Verticaal transport door DD', article: {sku:'SDH604', order:100}},
      {value: 'Steiger door DD', article: {sku:'SDH605', order:100}},
      {value: 'Verticaal transport door klant'},
      {value: 'Steiger door klant'},
    ],
    value: ['N.v.t.']
  }),
  new TextareaQuestion({
    key: 'indicatie_montage_uren',
    label: 'Indicatie montage uren'
  })
]
export const overige: QuestionBase<string>[] = [
  new TextareaQuestion({
    key: 'overige_opmerkingen_klant',
    label: 'Overige opmerkingen (klant)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_intern',
    label: 'Interne opmerkingen'
  }),
];
export const media: QuestionBase<string>[] = [
  new UploadQuestion({
    key: 'fs1',
    label: 'Foto / schets (voor klant)',
    type: 'image'
  }),
  new UploadQuestion({
    key: 'fs2',
    label: 'Foto / schets 2 (voor klant)',
    type: 'image'
  }),
];

export const gevel: TabBase[] = [
  {
    label: "Gevelbekleding",
    questions: gevelbekleding
  },
  {
    label: 'Montage',
    questions: montage
  },
  {
    label: 'Overige',
    questions: overige
  },
  {
    label: 'Foto\'s',
    questions: media
  },
]

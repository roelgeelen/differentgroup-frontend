import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";

export const algemeen: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'loopdeur_voordeur',
    label: 'Type voordeur',
    options: [
      {value: 'Verticale delen', article: 'VDH001'},
      {value: 'Horizontale delen', article: 'VDH002'},
      {value: 'Verticale latten', article: 'VDH003'},
    ]
  }),
  new RadioQuestion({
    key: 'model',
    label: 'Model',
    options: [
      {value: 'Geïntegreerd in de gevel'},
      {value: 'Met kozijn'},
      {value: 'Blind kozijn'},
      {value: 'Bestaand kozijn'},
      {value: 'Pivoterende deur', article: 'HPT001'},
    ]
  }),
  new TextQuestion({
    label: 'Afmetingen (in mm)',
    fields: [
      {
        key: 'breedte',
        label: 'Breedte',
        type: 'number'
      },
      {
        key: 'hoogte',
        label: 'Hoogte',
        type: 'number'
      }
    ]
  }),
  new UploadQuestion({
    key: 'fs1',
    label: 'Schets loopdeur'
  }),
];
export const buiten: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'electrisch_motorslot',
    label: 'Electrisch motorslot',
    options: [
      {value: 'Ja'},
      {value: 'Nee'},
    ]
  }),
  new RadioQuestion({
    key: 'kleur_kozijn',
    label: 'Kleur kozijn (tweemaal gegrond)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Transparant'},
      {value: 'Op kleur'},
    ]
  }),
  new TextQuestion({
    label: 'Op kleur',
    fields: [
      {
        key: 'kleur_kozijn_ral',
        label: 'RAL',
        type: 'text'
      }
    ],
    dependent: [
      {
        field: 'kleur_kozijn',
        values: ['Op kleur']
      }
    ]
  }),
]
export const binnen: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'binnen_afwerking',
    label: 'Binnen afwerking (tweemaal gegrond)',
    options: [
      {value: 'Vlakke plaat transparant behandeld'},
      {value: 'Vlakke plaat op RAL'},
      {value: 'Bekleed zoals de buitenkant'},
    ]
  }),
  new TextQuestion({
    label: 'Vlakke plaat op RAL',
    fields: [
      {
        key: 'vlakke_plaat_ral',
        label: 'RAL',
        type: 'text'
      }
    ],
    dependent: [
      {
        field: 'binnen_afwerking',
        values: ['Vlakke plaat op RAL']
      }
    ]
  }),
]
export const deur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'cilinder',
    label: 'Cilinder',
    options: [
      {value: 'N.v.t.'},
      {value: 'Niet zichtbaar'},
      {value: 'In het hout frezen'},
      {value: 'Doorsteken i.v.m. beslag'},
    ]
  }),
  new RadioQuestion({
    key: 'krukset_deurbeslag',
    label: 'Deur beslag',
    options: [
      {value: 'N.v.t.'},
      {value: 'Ja'},
      {value: 'Door klant'},
    ],
    value: 'N.v.t.'
  }),
  new RadioQuestion({
    key: 'deurgreep',
    label: 'Deurgreep voordeur',
    image: 'assets/forms/sdh/Deurset.png',
    options: [
      {value: '1. Ronde RVS greep T-vorm met rond beslag', article: 'VDH404'},
      {value: '2. Vierkante RVS greep U-vorm met vierkant beslag', article: 'VDH402'},
      {value: '3. Vierkante RVS greep T-vorm met vierkant beslag', article: 'VDH400'},
      {value: '4. Ronde zwarte greep T-vorm met rond beslag zwart', article: 'VDH405'},
      {value: '5. Vierkante Zwarte greep U-vorm met vierkant beslag zwart', article: 'VDH403'},
      {value: '6. Vierkante Zwarte  greep T-vorm met vierkant beslag zwart', article: 'VDH401'},
      {value: '7. Houten greep Different Doors met RVS rond beslag', article: 'VDH406'},
      {value: 'Aangeleverd door klant'},
      {value: 'Niet opgenomen in offerte'},
    ],
    dependent: [
      {
        field: 'krukset_deurbeslag',
        values: ['Ja']
      }
    ]
  }),
]
export const glas: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'glassectie',
    label: 'Glassectie (van binnenuit gezien)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Glas links naast de deur'},
      {value: 'Glas rechts naast de deur'},
      {value: 'Glas in de deur'},
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'type_glas',
    label: 'Type glas',
    options: [
      {value: 'HR++ helder glas'},
      {value: 'HR++ melk glas'},
      {value: 'Glas door klant'},
    ],
    other: true,
    custom: '',
    dependent: [
      {
        field: 'glassectie',
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur']
      }
    ]
  }),
  new UploadQuestion({
    key: 'fg1',
    label: 'Schets glas',
    dependent: [
      {
        field: 'glassectie',
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur']
      }
    ]
  })
];

export const overige: QuestionBase<string>[] = [
  new TextareaQuestion({
    key: 'overige_opmerkingen_klant',
    label: 'Overige opmerkingen (klant)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_intern',
    label: 'Overige opmerkingen (intern)'
  })
]

export const vdh: TabBase[] = [
  {
    label: "Algemeen",
    questions: algemeen
  },
  {
    label: "Buitenzijde",
    questions: buiten
  },
  {
    label: "Binnenzijde",
    questions: binnen
  },
  {
    label: "Deur",
    questions: deur
  },
  {
    label: "Glas",
    questions: glas
  },
  {
    label: 'Overige',
    questions: overige
  },
]

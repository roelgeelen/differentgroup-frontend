import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {Validators} from "@angular/forms";

export const algemeen: QuestionBase<string>[] = [
  new TextQuestion({
    label: 'Afwijkend montage adres',
    fields: [
      {
        key: 'montage_straat',
        label: 'Straat + huisnummer',
        type: 'text'
      },
      {
        key: 'montage_postcode',
        label: 'Postcode',
        type: 'text',
      },
      {
        key: 'montage_plaats',
        label: 'Plaats',
        type: 'text'
      }
    ]
  }),
  new CheckboxQuestion({
    key: 'begeleiding_project',
    label: 'Begeleiding project',
    options: [
      {value: 'Uitvoerder'},
      {value: 'Projectleider'}
    ]
  }),
  new TextQuestion({
    label: 'Uitvoerder',
    fields: [
      {
        key: 'uitvoerder_naam',
        label: 'Naam',
        type: 'text'
      },
      {
        key: 'uitvoerder_telefoon',
        label: 'Telefoon',
        type: 'number',
      },
      {
        key: 'uitvoerder_email',
        label: 'E-mail',
        type: 'email',
        validators: [Validators.email]
      }
    ],
    dependent: [
      {
        field: 'begeleiding_project',
        values: ['Uitvoerder']
      }
    ]
  }),
  new TextQuestion({
    label: 'Projectleider',
    fields: [
      {
        key: 'projectleider_naam',
        label: 'Naam',
        type: 'text'
      },
      {
        key: 'projectleider_telefoon',
        label: 'Telefoon',
        type: 'number'
      },
      {
        key: 'projectleider_email',
        label: 'E-mail',
        type: 'email',
        validators: [Validators.email]
      }
    ],
    dependent: [
      {
        field: 'begeleiding_project',
        values: ['Projectleider']
      }
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
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'sluitkommen',
    label: 'Bestaande sluitkommen en scharnieren dicht zetten',
    options: [
      {value: 'Ja', article: {sku: 'VDH102', order:100}},
      {value: 'Nee'},
    ],
    dependent: [
      {
        field: 'model',
        values: ['Bestaand kozijn']
      }
    ]
  }),
  new TextQuestion({
    label: 'Afmetingen (in mm)',
    fields: [
      {
        key: 'breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.required]
      },
      {
        key: 'hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.required]
      }
    ]
  }),
  new UploadQuestion({
    key: 'fs1',
    label: 'Schets loopdeur',
    type: 'image'
  }),
];
export const buiten: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'houtsoort',
    label: 'Houtsoort',
    options: [
      {value: 'Red cedar'},
      {value: 'Eiken'},
      {value: 'Afrormosia'},
      {value: 'Mahonie'},
      {value: 'Accoya'},
      {value: 'Meranti'},
      {value: 'Fraké'},
      {value: 'Aangeleverde delen'}
    ],
    other: true,
    custom: ' '
  }),
  new RadioQuestion({
    key: 'loopdeur_voordeur',
    label: 'Type loopdeur',
    options: [
      {value: 'Verticale delen', article: {sku: 'LDH001', order:100}},
      {value: 'Horizontale delen', article: {sku: 'LDH002', order:100}},
      {value: 'Verticale latten', article: {sku: 'LDH003', order:100}},
      {value: 'Overige', article: {sku: 'LDH004', order:100}},
    ],
    validators: [Validators.required]
  }),
  new TextQuestion({
    label: 'Type loopdeur omschrijving',
    fields: [
      {key: 'type_overige_omschr', label: 'Omschrijving', type: 'text'}
    ],
    dependent: [
      {field: 'loopdeur_voordeur', values: ['Overige']}
    ]
  }),
  new RadioQuestion({
    key: 'electrisch_motorslot',
    label: 'Electrisch motorslot',
    options: [
      {value: 'Ja', article: {sku: 'SDH210', order:100}},
      {value: 'Nee'},
    ]
  }),
  // new RadioQuestion({
  //   key: 'inclusief_besturing',
  //   label: 'Inclusief besturing',
  //   options: [
  //     {value: 'Ja', article: {sku: 'SDH214', order:100}},
  //     {value: 'Nee'},
  //   ],
  //   value: 'Nee',
  //   dependent: [
  //     {field:'electrisch_motorslot', values: ['Ja']}
  //   ]
  // }),
  new TextQuestion({
    label: 'Hoogte kabel doorvoer',
    fields: [
      {
        key: 'hoogte_kabel_doorvoer',
        label: 'Hoogte',
        type: 'number'
      }
    ],
    dependent: [
      {field:'electrisch_motorslot', values: ['Ja']}
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
  new RadioQuestion({
    key: 'behandeling',
    label: 'Behandeling',
    options: [
      {value: 'Onbehandeld'},
      {value: 'Transparant (Tweemaal gegrond)'},
      {value: 'Aangeleverde delen behandeld door klant'},
      {value: 'Dekkend (Tweemaal gegrond)'},
    ]
  }),
  new RadioQuestion({
    key: 'transparant_kleurcode',
    label: 'Kleurcode DD',
    options: [
      {value: 'VBH001'},
      {value: 'VBH002'},
      {value: 'VBH003'},
      {value: 'VBH004'},
      {value: 'VBH005'},
      {value: 'VBH006'},
      {value: 'VBH007'},
      {value: 'VBH008'},
    ],
    dependent: [
      {
        field: 'behandeling',
        values: ['Transparant (Tweemaal gegrond)']
      }
    ],
    other: true,
    custom: ''
  }),
  new TextQuestion({
    label: 'Dekkend (tweemaal gegrond)',
    fields: [
      {
        key: 'dekkend_ral',
        label: 'RAL',
        type: 'text'
      }
    ],
    dependent: [
      {
        field: 'behandeling',
        values: ['Dekkend (Tweemaal gegrond)']
      }
    ]
  }),
  new RadioQuestion({
    key: 'afgelakt',
    label: 'Afgelakt',
    options: [
      {value: 'Ja'},
      {value: 'Nee'},
    ],
    value: 'Nee',
    dependent: [
      {
        field: 'behandeling',
        values: ['Dekkend (Tweemaal gegrond)']
      }
    ]
  })
]
export const binnen: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'binnen_afwerking',
    label: 'Binnen afwerking (tweemaal gegrond)',
    options: [
      {value: 'Vlakke plaat transparant behandeld'},
      {value: 'Vlakke plaat op RAL'},
      {value: 'Bekleed zoals de buitenkant', article: {sku: 'VDH600', order:100}},
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
    key: 'draairichting',
    label: 'Draairichting (van buiten gezien)',
    options: [
      {value: 'Naar buiten'},
      {value: 'Naar binnen'},
    ]
  }),
  new RadioQuestion({
    key: 'scharnierzijde',
    label: 'Scharnierzijde  (van buiten gezien)',
    options: [
      {value: 'Linkerzijde '},
      {value: 'Rechterzijde'}
    ]
  }),
  new RadioQuestion({
    key: 'type_dorpel',
    label: 'Type dorpel (Ondersabelen door klant na montage)',
    options: [
      {value: 'N.v.t.'},
      {value: 'DTS'},
      {value: 'Natuursteen'},
      {value: 'Valdorpel (let op: dicht niet volledig af)'},
      {value: 'Bestaande dorpel aanpassen'},
      {value: 'Door klant'}
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
    label: 'Deurgreep loopdeur',
    image: 'assets/forms/sdh/deurbeslag.png',
    options: [
      {value: '1. SKG*** veiligheid set Rond RVS', article: {sku: 'VDH300', order:100}},
      {value: '2. SKG*** veiligheid set Vierkant RVS', article: {sku: 'VDH302', order:100}},
      {value: '3. SKG*** veiligheid set Rond Zwart', article: {sku: 'VDH301', order:100}},
      {value: '4. SKG*** veiligheid set Vierkant Zwart', article: {sku: 'VDH303', order:100}},
      {value: 'Veiligheid-shuifrozet met kerntrek Ovaal RVS', article: {sku: 'VDH304', order:100}},
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
    key: 'cilinder_type',
    label: 'Type',
    options: [
      {value: 'Standaard'},
      {value: 'Draaiknop'},
    ],
    dependent: [
      {
        field: 'cilinder',
        values: ['Niet zichtbaar', 'In het hout frezen', 'Doorsteken i.v.m. beslag']
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
      {value: 'Glas boven de deur'},
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
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur', 'Glas boven de deur']
      }
    ]
  }),
  new UploadQuestion({
    key: 'fg1',
    label: 'Schets glas',
    type: 'image',
    dependent: [
      {
        field: 'glassectie',
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur', 'Glas boven de deur']
      }
    ]
  })
];
export const montage: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'bestaande_deur',
    label: 'Bestaande deur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Demontage DD'},
      {value: 'Afvoer DD'},
      {value: 'Demontage door klant'},
      {value: 'Afvoer door klant'}
    ]
  }),
  new RadioQuestion({
    key: 'bouwkundig_aanpassingen',
    label: 'Bouwkundige aanpassingen',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door klant volgens details DD'}
    ],
    value: 'Door klant volgens details DD'
  }),
  new TextareaQuestion({
    key: 'indicatie_montage_uren',
    label: 'Indicatie montage uren'
  })
]

export const afwerking: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    options: [
      {value: 'N.v.t.'},
      {value: 'Klant kiest voor geen binnenaftimmering'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)'},
      {value: 'Multipaint volledig (exclusief schilderen)'},
      {value: 'Afwerking door aannemer'},
    ],
    value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)'
  }),
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
  new UploadQuestion({
    key: 'inmeet',
    label: 'Inmeet bon',
    type: 'file'
  })
]
export const inmeten: QuestionBase<string>[] = [
  new TextareaQuestion({
    key: 'vrije_ruimte_onder_pijl',
    label: 'Vrije ruimte onder pijl'
  }),
]
export const ldh: TabBase[] = [
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
    label: "Montage",
    questions: montage
  },
  {
    label: "Afwerking",
    questions: afwerking
  },
  {
    label: 'Overige',
    questions: overige
  },
  {
    label: 'Inmeten',
    questions: inmeten
  },
]

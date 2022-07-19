import {QuestionBase} from "../dynamic-form/model/question-base";
import {RadioQuestion} from "../dynamic-form/controls/question-radio";
import {TabBase} from "../dynamic-form/model/tab-base";
import {TextQuestion} from "../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../dynamic-form/controls/question-upload";

export const algemeen: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'definitieve_bestelmaat',
    label: 'Definitieve bestelmaat',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ]
  }),
  new TextQuestion({
    label: 'Afmetingen',
    fields: [
      {
        key: 'hoogte',
        label: 'Hoogte',
        type: 'number'
      },
      {
        key: 'breedte',
        label: 'Breedte',
        type: 'number'
      }
    ]
  }),
  new RadioQuestion({
    key: 'verdeling_symmetrisch',
    label: 'Verdeling symmetrisch',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ]
  }),
  new TextQuestion({
    label: 'Verdeling (van buiten gezien)',
    dependent: {
      field: 'verdeling_symmetrisch',
      values: ['Nee']
    },
    fields: [
      {
        key: 'links',
        label: 'Links',
        type: 'number'
      },
      {
        key: 'rechts',
        label: 'Rechts',
        type: 'number'
      }
    ]
  })
];

export const buitenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'model',
    label: 'Model',
    image: 'assets/forms/odo/69c3bd73-a00d-48cf-a637-51b1efd1aa9a.png',
    options: [
      {value: 'Verticaal'},
      {value: 'Horizontaal'},
      {value: 'Volledig vlakke plaat - ODO300'}
    ]
  }),
  new RadioQuestion({
    key: 'profilering',
    label: 'Profilering',
    image: 'assets/forms/odo/0740c7ed-e7d1-404d-8d12-984b5e8cc979.png',
    dependent: {
      field: 'model',
      values: ['Verticaal', 'Horizontaal']
    },
    options: [
      {value: 'Smal (plancha)'},
      {value: 'Midden (ligna)'},
      {value: 'Vlak (plano)'}
    ]
  }),
  new RadioQuestion({
    key: 'uitstraling',
    label: 'Uitstraling',
    image: 'assets/forms/odo/92adc622-e173-4baf-8dba-38acdd8816fd.png',
    dependent: {
      field: 'model',
      values: ['Verticaal', 'Horizontaal']
    },
    options: [
      {value: 'Houtnerf (woodgrain)'},
      {value: 'Glad (satin)'}
    ]
  }),
  new TextQuestion({
    label: 'Kleuren',
    image: 'assets/forms/odo/2022-05-17%2016_23_28-.png',
    dependent: {
      field: 'model',
      values: ['Verticaal', 'Horizontaal']
    },
    fields: [
      {
        key: 'deur_ral',
        label: 'Deur RAL in structuurlak',
        type: 'text'
      },
      {
        key: 'kozijn_ral',
        label: 'Kozijn RAL',
        type: 'text'
      },
      {
        key: 'scharnier_ral',
        label: 'Scharnieren RAL',
        type: 'text'
      }
    ]
  })
];

export const binnenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'paneel',
    label: 'Paneel',
    image: 'assets/forms/odo/56020ab6-c695-4125-b0ba-bd97f79e4204.png',
    options: [
      {value: 'Standaard stucco'},
      {value: 'Volledig vlakke plaat - ODO301'},
      {value: 'Standaard volledig vlak (enkel indien model volledig vlak)'}
    ]
  }),
  new RadioQuestion({
    key: 'kleuropties',
    label: 'Kleuropties (RAL)',
    options: [
      {value: '9016 (standaard)'}
    ],
    other: true,
    custom: ''
  })
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
    key: 'actieve_deur',
    label: 'Actieve deur (van buiten gezien)',
    options: [
      {value: 'Rechts'},
      {value: 'Links'},
    ]
  }),
  new RadioQuestion({
    key: 'krukset_deurbeslag',
    label: 'Krukset deurbeslag',
    options: [
      {value: 'Klink aluminium (standaard)'},
      {value: 'Knop aluminium (standaard)'},
      {value: 'Klink zwart - ODO304'},
      {value: 'Knop zwart - ODO306'},
      {value: 'Klink RVS - ODO303'},
      {value: 'Knop RVS - ODO305'}
    ]
  }),
  new CheckboxQuestion({
    key: 'cilinder',
    label: 'Cilinder',
    options: [
      {value: 'Cilinder leveren (incl. drie sleutels)'},
      {value: 'Extra sleutel - ODO308'},
      {value: 'Gelijksluitend (bij meedere deuren) - ODO307'},
      {value: 'Draaiknopcilinder'},
      {value: 'Aangeleverd door klant (cilindermaat 40/45 binnen/buitenzijde)'}
    ],
    other: true
  })
]
export const glas: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie',
    image: 'assets/forms/odo/b2ba7637-14df-4f41-9a56-f6580bfa9f33.png',
    options: [
      {value: 'N.v.t.'},
      {value: 'Horizontaal - HR++ helder glas - ODO200'},
      {value: 'Horizontaal - HR++ melk glas - ODO201'},
      {value: 'Verticaal - HR++ helder glas - ODO202'},
      {value: 'Verticaal - HR++ melk glas - ODO203'},
    ]
  }),
  new TextQuestion({
    label: 'Horizontaal - Netto glasmaat hoogte',
    fields: [
      {
        key: 'netto_glasmaat',
        label: 'Hoogte',
        type: 'number'
      }
    ],
    dependent: {
      field: 'glassectie',
      values: ['Horizontaal - HR++ helder glas - ODO200', 'Horizontaal - HR++ melk glas - ODO201']
    }
  }),
  new TextQuestion({
    label: 'Verticaal - Netto glasmaat breedte',
    fields: [
      {
        key: 'netto_glasmaat',
        label: 'Breedte',
        type: 'number'
      }
    ],
    dependent: {
      field: 'glassectie',
      values: ['Verticaal - HR++ helder glas - ODO202', 'Verticaal - HR++ melk glas - ODO203']
    }
  }),
  new RadioQuestion({
    key: 'glassectie_in_vleugel',
    label: 'Glassectie in vleugel',
    options: [
      {value: 'Beide'},
      {value: 'Actieve deur'},
      {value: 'Passieve deur'}
    ],
    dependent: {
      field: 'glassectie',
      values: ['Horizontaal - HR++ helder glas - ODO200', 'Horizontaal - HR++ melk glas - ODO201', 'Verticaal - HR++ helder glas - ODO202', 'Verticaal - HR++ melk glas - ODO203']
    }
  })
]
export const montage: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'montage',
    label: 'Montage',
    options: [
      {value: 'Binnenzijde gelijk met binnenmuur'}
    ],
    other: true,
    custom: ''
  }),
  new CheckboxQuestion({
    key: 'bestaande_deur',
    label: 'Bestaande deur',
    options: [
      {value: 'Demontage DD - ODO401'},
      {value: 'Afvoer DD - ODO402'},
      {value: 'Demontage door klant'},
      {value: 'Afvoer door klant'}
    ]
  }),
  new RadioQuestion({
    key: 'type_deur',
    label: 'Type deur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Sectionaaldeur'},
      {value: 'Kanteldeur'},
      {value: 'Houten kozijn en deuren\n'},
      {value: 'Rolluik'}
    ]
  })
]
export const afwerking: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'vloeraanpassing',
    label: 'Vloeraanpassing',
    options: [
      {value: 'N.v.t.'},
      {value: 'Uithakken vloer - ODO403'},
      {value: 'Aansmeren vloer - ODO404'}
    ]
  }),
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    image: 'assets/forms/odo/79cc52f6-13ec-4fc4-bd46-1d63942001c1.png',
    options: [
      {value: 'Klant kiest voor geen binnenaftimmering\n'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed) - ODO405'},
      {value: 'Multipaint volledig (exclusief schilderen) - ODO406'},
    ]
  }),
  new RadioQuestion({
    key: 'bouwkundig_aanpassingen',
    label: 'Bouwkundig aanpassingen',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door klant volgens details DD'}
    ]
  })
]
export const overige: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'indicatie_van_montage_uren',
    label: 'Indicatie van montage uren',
    options: [
      {value: 'Plaatsen nieuwe deur - 2 uur'},
      {value: 'Demontage kanteldeur - 0.5 uur'},
      {value: 'Demontage houten openslaande deuren - 1 uur'},
      {value: 'Aansmeren vloer - 0.5 uur'},
      {value: 'Aftimmeren binnenzijde lijstje rondom - 0.5 uur'},
      {value: 'Aftimmeren binnenzijde compleet - 2 uur'},
      {value: 'Aftimmeren buitenzijde - 1 uur'}
    ]
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_klant',
    label: 'Overige opmerkingen (klant)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_intern',
    label: 'Overige opmerkingen (intern)'
  }),
  new TextareaQuestion({
    key: 'materiaal_te_bestellen_door_werkvoorbereiding',
    label: 'Materiaal te bestellen door werkvoorbereiding'
  })
]
export const media: QuestionBase<string>[] = [
  new UploadQuestion({
    key: 'schets',
    label: 'Foto / schets (voor klant)'
  }),
  new UploadQuestion({
    key: 'foto_buitenzijde',
    label: 'Foto buitenzijde deur'
  }),
  new UploadQuestion({
    key: 'foto_binnenzijde',
    label: 'Foto binnenzijde deur'
  })
]
export const tabs: TabBase[] = [
  {
    label: "Algemeen",
    questions: algemeen
  },
  {
    label: "Buitenzijde",
    questions: buitenzijde
  },
  {
    label: "Binnenzijde",
    questions: binnenzijde
  },
  {
    label: "Deur",
    questions: deur
  },
  {
    label: 'Glas',
    questions: glas
  },
  {
    label: 'Montage',
    questions: montage
  },
  {
    label: 'Afwerking',
    questions: afwerking
  },
  {
    label: 'Overige',
    questions: overige
  },
  {
    label: 'Foto\'s',
    questions: media
  }
]

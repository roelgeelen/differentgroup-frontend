import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {Validators} from "@angular/forms";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";

export const algemeen: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'deur_reeds_ingemeten',
    label: 'Deur reeds ingemeten',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    validators: [Validators.required]
  }),
  new TextQuestion({
    label: 'Strakke maat tussen metselwerk',
    image: 'assets/forms/odhd/Strakke-maat-tussen-metselwerk.png',
    fields: [
      {
        key: 'maat_tussen_metselwerk',
        label: 'tussen metselwerk',
        type: 'number',
        validators: [Validators.required]
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Berekening breedte: strakke maat tussen metselwerk - 5mm speling links - 5 mm rechts = ',
    value:'this.form.controls[\'maat_tussen_metselwerk\'].value - 10'
  }),
  new TextQuestion({
    label: 'Strakke maat tussen latei en afgewerkte binnenvloer',
    image: 'assets/forms/odhd/Strakke-maat-tussen-latei.png',
    fields: [
      {
        key: 'maat_tussen_latei',
        label: 'tussen latei en afgewerkte binnenvloer',
        type: 'number',
        validators: [Validators.required]
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Berekening hoogte: strakke maat tussen latei en binnenvloer - 10mm speling boven - 10mm dorpel boven pijl + 52mm dikte onderdorpel = ',
    value:'parseInt(this.form.controls[\'maat_tussen_latei\'].value) + 32'
  }),
  new RadioQuestion({
    key: 'model',
    label: 'Model',
    image: 'assets/forms/odhd/odhd-models.jpg',
    options: [
      {value: 'A', article: 'ODH001'},
      {value: 'B', article: 'ODH002'},
      {value: 'C', article: 'ODH003'},
      {value: 'D', article: 'ODH004'},
      {value: 'E', article: 'ODH005'},
      {value: 'F', article: 'ODH006'},
      {value: 'G', article: 'ODH007'},
      {value: 'H', article: 'ODH008'},
      {value: 'I', article: 'ODH009'},
      {value: 'Overig'},
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'verdeling_symmetrisch',
    label: 'Verdeling symmetrisch',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    value: 'Ja'
  }),
  new TextQuestion({
    label: 'Verdeling (van buiten gezien inclusief kozijn)',
    dependent: [{
      field: 'verdeling_symmetrisch',
      values: ['Nee']
    }],
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
    key: 'profilering',
    label: 'Profilering',
    options: [
      {value: 'N.v.t.'},
      {value: 'Horizontale belijning'},
      {value: 'Verticale belijning'}
    ]
  }),
  new RadioQuestion({
    key: 'type_profilering',
    label: 'Type',
    dependent: [
      {field: 'profilering', values: ['Horizontale belijning', 'Verticale belijning']}
    ],
    options: [
      {value: 'U'},
      {value: 'V'},
    ]
  }),
  new TextQuestion({
    label: 'Afstand belijning (in mm)',
    dependent: [
      {field: 'profilering', values: ['Horizontale belijning', 'Verticale belijning']}
    ],
    fields: [
      {
        key: 'afstand_belijning',
        label: 'Afstand',
        type: 'number'
      }
    ]
  }),
  new TextQuestion({
    label: 'Kleuropties (Tweemaal gegrond)',
    fields: [
      {
        key: 'deur_ral',
        label: 'Deur RAL',
        type: 'text'
      },
      {
        key: 'kozijn_ral',
        label: 'Kozijn RAL',
        type: 'text'
      }
    ]
  }),
  new RadioQuestion({
    key: 'aflakken_op_locatie',
    label: 'Aflakken op locatie (door professionele schilder)',
    options: [
      {value: 'Klant lakt de deur zelf af binnen drie maanden na montage'},
      {value: 'Ja', article: 'ODH200'},
      {value: 'Nee'},
    ]
  }),
];
export const binnenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'uitstraling_binnenzijde',
    label: 'Uitstraling binnenzijde',
    options: [
      {value: 'Standaard'},
      {value: 'Horizontale belijning'},
      {value: 'Verticale belijning'},
    ]
  }),
  new TextQuestion({
    label: 'Kleuropties (Tweemaal gegrond)',
    fields: [
      {
        key: 'deur_ral_binnen',
        label: 'Deur RAL',
        type: 'text'
      },
      {
        key: 'kozijn_ral_binnen',
        label: 'Kozijn RAL',
        type: 'text'
      }
    ]
  }),
];
export const deur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'draairichting',
    label: 'Draairichting (van buiten gezien)',
    options: [
      {value: 'Naar buiten'},
      {value: 'Naar binnen'},
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'actieve_deur',
    label: 'Actieve deur (vanaf buitenaanzicht)',
    options: [
      {value: 'Rechts'},
      {value: 'Links'}
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'krukset_deurbeslag',
    label: 'Krukset deurbeslag',
    options: [
      {value: 'Klink aluminium'},
      {value: 'Knop aluminium'},
      {value: 'Klink zwart'},
      {value: 'Knop zwart'},
      {value: 'Klink RVS'},
      {value: 'Knop RVS'},
      {value: 'Door klant (Minimaal 8 weken voor gewenste montageweek)'},
    ]
  }),
  new RadioQuestion({
    key: 'isolatie',
    label: 'Isolatie',
    options: [
      {value: 'Ja'},
      {value: 'Nee (Let op: bij het verwarmen van de ruimte kan er condens ontstaan op de deur)'},
      {value: 'N.v.t. (Alu stabiel deuren zijn standaard geïsoleerd)'},
    ]
  }),
  new RadioQuestion({
    key: 'omklapvoetjes',
    label: 'Omklapvoetjes',
    options: [
      {value: 'Ja'},
      {value: 'Nee'},
    ]
  }),
  new CheckboxQuestion({
    key: 'cilinder',
    label: 'Cilinder',
    options: [
      {value: 'Door DD (incl. drie sleutels)'},
      {value: 'Gelijksluitend (bij meedere deuren)'},
      {value: 'Draaiknopcilinder'},
      {value: 'Aangeleverd door klant (Cilindermaat: 30/45 (buitenzijde/binnenzijde)'},
      {value: 'Extra cilinder', article: 'ODH300'}
    ],
    value: ['Door DD (incl. drie sleutels)']
  })
];
export const glas: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie',
    options: [
      {value: 'N.v.t.'},
      {value: 'HR++ helder glas'},
      {value: 'HR++ melk glas'},
    ],
    value: 'N.v.t.'
  }),
  new RadioQuestion({
    key: 'glassectie_in_vleugel',
    label: 'Glas in vleugel',
    options: [
      {value: 'Beide'},
      {value: 'Actieve deur'},
      {value: 'Passieve deur'}
    ],
    dependent: [{
      field: 'glassectie',
      values: ['HR++ helder glas', 'HR++ melk glas']
    }]
  }),
  new TextQuestion({
    label: 'Horizontaal - Netto glasmaat breedte (in mm)',
    fields: [
      {
        key: 'netto_glasmaat',
        label: 'Breedte',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas']
      },
      {
        field: 'model',
        values: ['E', 'G', 'Overig']
      }
    ]
  }),
  new TextQuestion({
    label: 'Verticaal - Netto glasmaat hoogte (in mm)',
    fields: [
      {
        key: 'netto_glasmaat',
        label: 'Hoogte',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas']
      },
      {
        field: 'model',
        values: ['A', 'D', 'I', 'Overig']
      }
    ]
  }),
  new RadioQuestion({
    key: 'glasverdeling',
    label: 'Glasverdeling',
    options: [
      {value: 'N.v.t.'},
      {value: 'Aantal roedes'},
    ],
    dependent: [{
      field: 'glassectie',
      values: ['HR++ helder glas', 'HR++ melk glas']
    }],
    other: true,
    custom: ''
  }),
  new TextQuestion({
    label: 'Aantal roedes',
    fields: [
      {
        key: 'aantal_roedes',
        label: 'Aantal',
        type: 'number'
      },
    ],
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas']
      },
      {
      field: 'glasverdeling',
      values: ['Aantal roedes']
    }
    ]
  })
];
export const montage: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'montage',
    label: 'Montage',
    options: [
      {value: 'In de dag'},
      {value: 'Achter de dag'}
    ]
  }),
  new CheckboxQuestion({
    key: 'bestaande_deur',
    label: 'Bestaande deur',
    options: [
      {value: 'Demontage DD', article: 'ODH101'},
      {value: 'Afvoer DD', article: 'ODH102'},
      {value: 'Demontage door klant'},
      {value: 'Afvoer door klant'}
    ],
    value: ['Demontage DD', 'Afvoer DD']
  }),
  new RadioQuestion({
    key: 'type_deur',
    label: 'Type deur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Sectionaaldeur'},
      {value: 'Kanteldeur'},
      {value: 'Houten kozijn en deuren'},
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
      {value: 'Uithakken vloer', article: 'ODH103'},
      {value: 'Aansmeren vloer', article: 'ODH104'}
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    options: [
      {value: 'Klant kiest voor geen binnenaftimmering'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)', article: 'ODH105'},
      {value: 'Multipaint volledig (exclusief schilderen)', article: 'ODH106'},
    ],
    value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)'
  }),
  new RadioQuestion({
    key: 'bouwkundig_aanpassingen',
    label: 'Bouwkundig aanpassingen',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door klant volgens details DD'}
    ],
    value: 'N.v.t.'
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
      {value: 'Aftimmeren buitenzijde - 1 uur'},
      {value: 'Uithakken vloer - 1 uur'}
    ],
    value: ['Plaatsen nieuwe deur - 2 uur']
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_klant',
    label: 'Overige opmerkingen (klant)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_intern',
    label: 'Overige opmerkingen (intern)'
  })
];
export const media: QuestionBase<string>[] = [
  new UploadQuestion({
    key: 'schets',
    label: 'Foto / schets (voor klant)'
  }),
  new UploadQuestion({
    key: 'schets_2',
    label: 'Foto / schets 2 (voor klant)'
  }),
  new UploadQuestion({
    key: 'buiten',
    label: 'Foto buitenzijde deur'
  }),
  new UploadQuestion({
    key: 'binnen',
    label: 'Foto binnenzijde deur'
  })
]
export const odhd: TabBase[] = [
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
    label: "Glas",
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

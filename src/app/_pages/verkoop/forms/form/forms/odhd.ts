import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {Validators} from "@angular/forms";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";

export const sales: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'type_woning',
    label: 'Type woning',
    options: [
      {value: '2-onder-1-kap/geschakelde woning'},
      {value: 'Vrijstaande woning'},
      {value: 'Rijtjeswoning', duration: 30},
      {value: 'Drive-in-woning'},
      {value: 'Overig'}
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'beide_personen_aanwezig_bij_gesprek_',
    label: 'Beide bewoners bij gesprek aanwezig?',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'situatie',
    label: 'Situatie',
    options: [
      {value: 'Nieuwbouw'},
      {value: 'Vervangen oude garagedeur'}
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'garage_aangrenzend_aan_woning',
    label: 'Garage aangrenzend aan woning',
    options: [
      {value: 'Ja'},
      {value: 'Nee, losstaande garage'}
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'leeftijdsschatting',
    label: 'Leeftijdsschatting',
    options: [
      {value: '< 30'},
      {value: '30-40'},
      {value: '40-50'},
      {value: '50-60'},
      {value: '60-70'},
      {value: '70 >'},
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'thuiswonende_kinderen',
    label: 'Thuiswonende kinderen?',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
]
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
    value: 'this.form.controls[\'maat_tussen_metselwerk\'].value - 10'
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
    value: 'parseInt(this.form.controls[\'maat_tussen_latei\'].value) + 32'
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
      {value: 'J', article: 'ODH010'},
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
  new RadioQuestion({
    label: 'Kleuropties deur binnen- en buitenzijde (Tweemaal gegrond)',
    key: 'deur_ral',
    options: [
      {value: '9010'},
      {value: '7016'},
      {value: '9005'},
      {value: '6009'}
    ],
    dependent: [
      {
        field: 'model',
        values: ['D', 'E', 'F', 'G']
      }
    ]
  }),
  new RadioQuestion({
    label: 'Kleuropties deur binnen- en buitenzijde (Tweemaal gegrond)',
    key: 'deur_ral',
    options: [
      {value: '9010'},
      {value: '7016', article: 'ODH203'},
      {value: '9005', article: 'ODH203'},
      {value: '6009', article: 'ODH203'}
    ],
    dependent: [
      {
        field: 'model',
        values: ['A', 'B', 'C', 'H', 'I', 'J']
      }
    ]
  }),
  new RadioQuestion({
    label: 'Kleuropties kozijn (Tweemaal gegrond)',
    key: 'kleur_kozijn_ral',
    options: [
      {value: '9010'},
      {value: '7016'},
      {value: '9005'},
      {value: '6009'}
    ]
  }),
  new RadioQuestion({
    key: 'aflakken',
    label: 'Deur afgelakt leveren in gekozen kleur',
    options: [
      {value: 'Klant lakt de deur zelf af binnen drie maanden na montage'},
      {value: 'Ja', article: 'ODH200'},
      {value: 'Nee'},
    ],
    dependent: [
      {
        field: 'model',
        values: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'Overig']
      }
    ]
  }),
  new RadioQuestion({
    key: 'aflakken',
    label: 'Deur afgelakt leveren in gekozen kleur',
    options: [
      {value: 'Klant lakt de deur zelf af binnen drie maanden na montage'},
      {value: 'Ja ', article: 'ODH204'},
      {value: 'Nee'},
    ],
    dependent: [
      {
        field: 'model',
        values: ['E']
      }
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
  })
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
      {value: 'Klink zwart', article: 'ODH201'},
      {value: 'Knop zwart', article: 'ODH201'},
      {value: 'Door klant (Minimaal 8 weken voor gewenste montageweek)'},
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
    ],
    value: 'N.v.t.',
    dependent: [
      {
        field: 'model',
        values: ['B', 'C', 'F', 'H', 'J']
      }
    ]
  }),
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie',
    options: [
      {value: 'N.v.t.'},
      {value: 'HR++ helder glas'},
      {value: 'HR++ melk glas', article: 'ODH202'},
    ],
    value: 'N.v.t.',
    dependent: [
      {
        field: 'model',
        values: ['A', 'D', 'E', 'G', 'I', 'Overig']
      }
    ]
  }),
  new RadioQuestion({
    key: 'glassectie_in_vleugel',
    label: 'Glas in vleugel',
    options: [
      {value: 'Beide'},
      {value: 'Actieve deur'},
      {value: 'Passieve deur'}
    ],
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas']
      },
      {
        field: 'model',
        values: ['A', 'D', 'E', 'G', 'I', 'Overig']
      }
    ]
  }),
  new TextQuestion({
    label: 'Horizontaal - Netto glasmaat breedte (in mm)',
    fields: [
      {
        key: 'netto_glasmaat',
        label: 'Breedte',
        type: 'number'
      },
      {
        key: 'netto_glasmaat_info',
        label: 'Opmerking',
        type: 'text'
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
      },
      {
        key: 'netto_glasmaat_info',
        label: 'Opmerking',
        type: 'text'
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
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas']
      },
      {
        field: 'model',
        values: ['A', 'D', 'E', 'G', 'I', 'Overig']
      }
    ],
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
      },
      {
        field: 'model',
        values: ['A', 'D', 'E', 'G', 'I', 'Overig']
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
      {value: 'Kanteldeur', duration: 30},
      {value: 'Houten kozijn en deuren', duration: 60},
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
      {value: 'Uithakken vloer', article: 'ODH103', duration: 60},
      {value: 'Aansmeren vloer', article: 'ODH104', duration: 30}
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    options: [
      {value: 'Klant kiest voor geen binnenaftimmering'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)', article: 'ODH105', duration: 30},
      {value: 'Multipaint volledig (exclusief schilderen)', article: 'ODH106', duration: 120},
    ],
    value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)'
  }),
  new RadioQuestion({
    key: 'aftimmering_buitenzijde',
    label: 'Aftimmering buitenzijde',
    options: [
      {value: 'Klant kiest voor geen buitenaftimmering'},
      {value: 'Aftimmeren buitenzijde (zie foto)', article: 'ODO408', duration: 60},
    ]
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
  new TextQuestion({
    label: 'Extra montage tijd',
    fields: [
      {
        key: 'extra_duration', //
        label: 'Extra tijd (in minuten)',
        type: 'number',
      },
      {
        key: 'extra_duration_opmerking', //
        label: 'Omschrijving',
        type: 'text'
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Totaal aantal montage tijd:',
    value: '(Math.floor(this.totalDuration / 60)) + "u " + (Math.floor(this.totalDuration % 60))+"m"'
  }),
  // new CheckboxQuestion({
  //   key: 'indicatie_van_montage_uren',
  //   label: 'Indicatie van montage uren',
  //   options: [
  //     {value: 'Plaatsen nieuwe deur - 2 uur'},
  //     {value: 'Demontage kanteldeur - 0.5 uur'},
  //     {value: 'Demontage houten openslaande deuren - 1 uur'},
  //     {value: 'Aansmeren vloer - 0.5 uur'},
  //     {value: 'Aftimmeren binnenzijde lijstje rondom - 0.5 uur'},
  //     {value: 'Aftimmeren binnenzijde compleet - 2 uur'},
  //     {value: 'Aftimmeren buitenzijde - 1 uur'},
  //     {value: 'Uithakken vloer - 1 uur'}
  //   ],
  //   value: ['Plaatsen nieuwe deur - 2 uur']
  // }),
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
    label: 'Materiaal te bestellen door werkvoorbereiding',
    toDeal: true
  })
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
  new UploadQuestion({
    key: 'fb1',
    label: 'Foto buitenzijde deur (monteurs)',
    type: 'image'
  }),
  new UploadQuestion({
    key: 'fb2',
    label: 'Foto binnenzijde deur (monteurs)',
    type: 'image'
  }),
  new UploadQuestion({
    key: 'fb3',
    label: 'Foto positie in de dag (monteurs)',
    type: 'image'
  })
]
export const odhd: TabBase[] = [
  {
    label: "Sales vragen",
    questions: sales
  },
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

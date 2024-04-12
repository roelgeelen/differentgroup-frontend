import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {Validators} from "@angular/forms";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";
import {DropdownQuestion} from "../../dynamic-form/controls/question-dropdown";

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
  new DropdownQuestion({
    key: 'hoe_heeft_u_voor_het_eerst_over_ons_gehoord_',
    label: 'Hoe heeft u voor het eerst over ons gehoord?',
    options: [
      {value: 'Aanbevolen door een vriend, familielid, buurman, collega ect.'},
      {value: 'Via een zoekmachine'},
      {value: 'Via sociale media'},
      {value: 'Door het lezen van een online artikel of blogpost'},
      {value: 'Online advertentie'},
      {value: 'Via architect, aannemer, bouwbegeleider'},
      {value: 'Via een evenement of beurs'},
      {value: 'Via lokale bekendheid'},
      {value: 'Via radio of tv'},
      {value: 'Via de bedrijfsbus'},
      {value: 'Via een publicatie in een magazine/krant'},
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
]
export const algemeen: QuestionBase<string>[] = [
  new RadioQuestion({
    key:'afwijkend_adres',
    label:'Afwijkend montage adres',
    options: [
      {value: 'Ja'},
      {value: 'Nee'},
      {value: 'Zie andere bon'},
    ],
    validators: [Validators.required]
  }),
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
    ],
    dependent: [
      {
        field: 'afwijkend_adres',
        values: ['Ja']
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
        type: 'tel',
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
        type: 'tel'
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
      {value: 'A', article: {sku: 'ODH001', order:100}},
      {value: 'B', article: {sku: 'ODH002', order:100}},
      {value: 'C', article: {sku: 'ODH003', order:100}},
      {value: 'D', article: {sku: 'ODH004', order:100}},
      {value: 'E', article: {sku: 'ODH005', order:100}},
      {value: 'F', article: {sku: 'ODH006', order:100}},
      {value: 'G', article: {sku: 'ODH007', order:100}},
      {value: 'H', article: {sku: 'ODH008', order:100}},
      {value: 'I', article: {sku: 'ODH009', order:100}},
      {value: 'J', article: {sku: 'ODH010', order:100}},
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
    ],
    dependent: [{
      field: 'verdeling_symmetrisch',
      values: ['Nee']
    }]
  })
];
export const buitenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'profilering',
    label: 'Profilering',
    options: [
      {value: 'N.v.t.'},
      {value: 'Horizontale belijning'},
      {value: 'Verticale belijning'},
      {value: 'Bossing paneel'}
    ]
  }),
  new RadioQuestion({
    key: 'type_profilering',
    label: 'Type',
    options: [
      {value: 'U'},
      {value: 'V'},
    ],
    dependent: [
      {field: 'profilering', values: ['Horizontale belijning', 'Verticale belijning']}
    ]
  }),
  new TextQuestion({
    label: 'Afstand belijning (in mm)',
    fields: [
      {
        key: 'afstand_belijning',
        label: 'Afstand',
        type: 'number'
      }
    ],
    dependent: [
      {field: 'profilering', values: ['Horizontale belijning', 'Verticale belijning']}
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
        values: ['C', 'E', 'F', 'G', 'Overig']
      }
    ]
  }),
  new RadioQuestion({
    label: 'Kleuropties deur binnen- en buitenzijde (Tweemaal gegrond)',
    key: 'deur_ral',
    options: [
      {value: '9010'},
      {value: '7016', article: {sku: 'ODH203', order:100}},
      {value: '9005', article: {sku: 'ODH203', order:100}},
      {value: '6009', article: {sku: 'ODH203', order:100}}
    ],
    dependent: [
      {
        field: 'model',
        values: ['A', 'B', 'D', 'H', 'I', 'J']
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
      {value: 'Ja', article: {sku: 'ODH200', order:100}},
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
      {value: 'Ja ', article: {sku: 'ODH204', order:100}},
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
      {value: 'Links'},
      {value: 'Rechts'}
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'krukset_deurbeslag',
    label: 'Krukset deurbeslag',
    options: [
      {value: 'Klink aluminium'},
      {value: 'Knop aluminium'},
      {value: 'Klink zwart', article: {sku: 'ODH201', order:100}},
      {value: 'Knop zwart', article: {sku: 'ODH201', order:100}},
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
      {value: 'Extra cilinder', article: {sku: 'ODH300', order:100}}
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
      {value: 'HR++ melk glas', article: {sku: 'ODH202', order:100}},
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
    label: 'Netto glasmaat breedte (in mm)',
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
    label: 'Netto glasmaat hoogte (in mm)',
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
  new TextareaQuestion({
    key: 'opmerkingen_montage',
    label: 'Opmerking montage'
  }),
  new CheckboxQuestion({
    key: 'bestaande_deur',
    label: 'Bestaande deur',
    options: [
      {value: 'Demontage DD', article: {sku: 'ODH101', order:100}, duration: 30},
      {value: 'Afvoer DD', article: {sku: 'ODH102', order:100}},
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
      {value: 'Houten kozijn en deuren', duration: 30},
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
      {value: 'Uithakken vloer', article: {sku: 'ODH103', order:100}, duration: 60},
      {value: 'Aansmeren vloer', article: {sku: 'ODH104', order:100}, duration: 30}
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    options: [
      {value: 'Klant kiest voor geen binnenaftimmering'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)', article: {sku: 'ODH105', order:100}, duration: 30},
      {value: 'Multipaint volledig (exclusief schilderen)', article: {sku: 'ODH106', order:100}, duration: 120},
    ],
    value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)'
  }),
  new RadioQuestion({
    key: 'aftimmering_buitenzijde',
    label: 'Aftimmering buitenzijde',
    options: [
      {value: 'N.v.t.'},
      {value: 'Klant kiest voor geen buitenaftimmering'},
      {value: 'Aftimmeren buitenzijde (zie foto)', article: {sku: 'ODO408', order:100}, duration: 60},
    ]
  }),
  new RadioQuestion({
    key: 'bouwkundig_aanpassingen',
    label: 'Bouwkundig aanpassingen',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door klant volgens details DD'},
      {value: 'Keperframe plaatsen', article: {sku:'ODO410', order:100}, duration: 30}
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
    label: 'Interne opmerkingen'
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

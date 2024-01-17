import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {Validators} from "@angular/forms";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";
import {DropdownQuestion} from "../../dynamic-form/controls/question-dropdown";

export const sales: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'type_woning',
    label: 'Type woning',
    options: [
      {value: '2-onder-1-kap/geschakelde woning'},
      {value: 'Vrijstaande woning'},
      {value: 'Rijtjeswoning'},
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
  new TextQuestion({
    label: 'Offerte afmetingen (in mm)',
    fields: [
      {
        key: 'offerte_breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.required, Validators.max(3005)]
      },
      {
        key: 'offerte_hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.required, Validators.max(2500)]
      }
    ]
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
        type: 'number',
        validators: [Validators.max(1500)]
      },
      {
        key: 'rechts',
        label: 'Rechts',
        type: 'number',
        validators: [Validators.max(1500)]
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
    key: 'model',
    label: 'Model',
    image: 'assets/forms/odo/69c3bd73-a00d-48cf-a637-51b1efd1aa9a.png',
    options: [
      {value: 'Horizontaal'},
      {value: 'Verticaal'},
      {value: 'Volledig vlakke plaat', article: {sku:'ODO300', order:100}}
    ]
  }),
  new RadioQuestion({
    key: 'profilering',
    label: 'Profilering',
    image: 'assets/forms/odo/0740c7ed-e7d1-404d-8d12-984b5e8cc979.png',
    dependent: [{
      field: 'model',
      values: ['Horizontaal']
    }],
    options: [
      {value: 'Smal (plancha)'},
      {value: 'Midden (ligna)'},
      {value: 'Vlak (plano)'}
    ]
  }),
  new RadioQuestion({
    key: 'profilering',
    label: 'Profilering',
    image: 'assets/forms/odo/0740c7ed-e7d1-404d-8d12-984b5e8cc979-vert.png',
    dependent: [{
      field: 'model',
      values: ['Verticaal']
    }],
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
    dependent: [{
      field: 'model',
      values: ['Verticaal', 'Horizontaal']
    }],
    options: [
      {value: 'Houtnerf (woodgrain)'},
      {value: 'Glad (satin)'}
    ]
  }),
  new RadioQuestion({
    key: 'deur_in_een_kleur',
    label: 'Gehele buitenzijde deur in één kleur',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ]
  }),
  new DropdownQuestion({
    key: 'deur_ral',
    label: 'Deur RAL in structuurlak',
    options: [
      {value: '2001', image: 'assets/forms/odo/colors/ral2001.jpg'},
      {value: '3000', image: 'assets/forms/odo/colors/ral3000.jpg'},
      {value: '3002', image: 'assets/forms/odo/colors/ral3002.jpg'},
      {value: '3003', image: 'assets/forms/odo/colors/ral3003.jpg'},
      {value: '3004', image: 'assets/forms/odo/colors/ral3004.jpg'},
      {value: '3005', image: 'assets/forms/odo/colors/ral3005.jpg'},
      {value: '3020', image: 'assets/forms/odo/colors/ral3020.jpg'},
      {value: '5009', image: 'assets/forms/odo/colors/ral5009.jpg'},
      {value: '5011', image: 'assets/forms/odo/colors/ral5011.jpg'},
      {value: '5015', image: 'assets/forms/odo/colors/ral5015.jpg'},
      {value: '6005', image: 'assets/forms/odo/colors/ral6005.jpg'},
      {value: '6009', image: 'assets/forms/odo/colors/ral6009.jpg'},
      {value: '7011', image: 'assets/forms/odo/colors/ral7011.jpg'},
      {value: '7012', image: 'assets/forms/odo/colors/ral7012.jpg'},
      {value: '7015', image: 'assets/forms/odo/colors/ral7015.jpg'},
      {value: '7016', image: 'assets/forms/odo/colors/ral7016.jpg'},
      {value: '7021', image: 'assets/forms/odo/colors/ral7021.jpg'},
      {value: '7030', image: 'assets/forms/odo/colors/ral7030.jpg'},
      {value: '7037', image: 'assets/forms/odo/colors/ral7037.jpg'},
      {value: '7038', image: 'assets/forms/odo/colors/ral7038.jpg'},
      {value: '7039', image: 'assets/forms/odo/colors/ral7039.jpg'},
      {value: '7040', image: 'assets/forms/odo/colors/ral7040.jpg'},
      {value: '7042', image: 'assets/forms/odo/colors/ral7042.jpg'},
      {value: '8014', image: 'assets/forms/odo/colors/ral8014.jpg'},
      {value: '8016', image: 'assets/forms/odo/colors/ral8016.jpg'},
      {value: '8017', image: 'assets/forms/odo/colors/ral8017.jpg'},
      {value: '8019', image: 'assets/forms/odo/colors/ral8019.jpg'},
      {value: '8022', image: 'assets/forms/odo/colors/ral8022.jpg'},
      {value: '9001', image: 'assets/forms/odo/colors/ral9001.jpg'},
      {value: '9002', image: 'assets/forms/odo/colors/ral9002.jpg'},
      {value: '9004', image: 'assets/forms/odo/colors/ral9004.jpg'},
      {value: '9005', image: 'assets/forms/odo/colors/ral9005.jpg'},
      {value: '9010', image: 'assets/forms/odo/colors/ral9010.jpg'},
      {value: '9016', image: 'assets/forms/odo/colors/ral9016.jpg'},
      {value: 'Q0.05.10', image: 'assets/forms/odo/colors/Q0.05.10.jpg'},
    ],
    validators: [Validators.required],
    dependent: [
      {
        field: 'deur_in_een_kleur',
        values: ['Ja']
      }
    ]
  }),
  new TextQuestion({
    label: 'Kleuren',
    image: 'assets/forms/odo/odo-kleuren-.png',
    fields: [
      {
        key: 'deur_ral',
        label: 'Deur RAL in structuurlak',
        type: 'text',
        validators: [Validators.required]
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
    ],
    dependent: [
      {
        field: 'deur_in_een_kleur',
        values: ['Nee']
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
      {value: 'Standaard stucco RAL9016'},
      {value: 'Volledig vlakke plaat', article: {sku:'ODO301', order:100}},
    ],
    value: 'Standaard stucco',
    dependent: [
      {
        field: 'model',
        values: ['Verticaal', 'Horizontaal']
      }
    ]
  }),
  new RadioQuestion({
    key: 'paneel',
    label: 'Paneel',
    options: [
      {value: 'Standaard volledig vlak (enkel indien model volledig vlak)'}
    ],
    value: 'Standaard volledig vlak (enkel indien model volledig vlak)',
    dependent: [
      {
        field: 'model',
        values: ['Volledig vlakke plaat']
      }
    ]
  }),
  new RadioQuestion({
    key: 'kleuropties',
    label: 'Kleuropties (RAL)',
    options: [
      {value: 'Gelijk aan kleur buitenzijde'},
    ],
    other: true,
    custom: '',
    value: '9016 (standaard)',
    dependent: [
      {
        field: 'model',
        values: ['Verticaal', 'Horizontaal']
      },
      {
        field: 'paneel',
        values: ['Volledig vlakke plaat']
      }
    ]
  }),
  new RadioQuestion({
    key: 'kleuropties',
    label: 'Kleuropties (RAL)',
    options: [
      {value: 'Zelfde als buitenzijde (standaard)'}
    ],
    other: true,
    custom: '',
    dependent: [
      {
        field: 'model',
        values: ['Volledig vlakke plaat']
      }
    ]
  })
]

export const deur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'actieve_deur',
    label: 'Actieve deur (van buiten gezien)',
    options: [
      {value: 'Links'},
      {value: 'Rechts'},
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'krukset_deurbeslag',
    label: 'Krukset deurbeslag',
    options: [
      {value: 'Klink aluminium (standaard)'},
      {value: 'Knop aluminium (standaard)'},
      {value: 'Klink zwart', article: {sku:'ODO304', order:100}},
      {value: 'Knop zwart', article: {sku:'ODO306', order:100}},
      {value: 'Klink RVS', article: {sku:'ODO303', order:100}},
      {value: 'Knop RVS', article: {sku:'ODO305', order:100}}
    ],
    value: 'Klink aluminium (standaard)'
  }),
  new CheckboxQuestion({
    key: 'cilinder',
    label: 'Cilinder (cilindermaat 40/40 binnen/buitenzijde)',
    options: [
      {value: 'Cilinder leveren door DD (incl. drie sleutels)'},
      {value: 'Extra sleutel', article: {sku:'ODO308', order:100}},
      {value: 'Gelijksluitend (bij meedere deuren)', article: {sku:'ODO307', order:100}},
      {value: 'Draaiknopcilinder'},
      {value: 'Aangeleverd door klant (40/40 binnen/buitenzijde)'}
    ],
    other: true,
    custom: ' ',
    value: ['Cilinder leveren door DD (incl. drie sleutels)']
  }),
  new TextQuestion({
    label: 'Extra sleutel',
    fields: [
      {
        key: 'extra_sleutel',
        label: 'Aantal',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'cilinder',
        values: ['Extra sleutel']
      }
    ]
  }),
]
export const glas: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'glassectie_in_vleugel',
    label: 'Glassectie in vleugel',
    options: [
      {value: 'N.v.t.'},
      {value: 'Beide'},
      {value: 'Actieve deur'},
      {value: 'Passieve deur'}
    ],
    value: "N.v.t."
  }),
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie beide',
    image: 'assets/forms/odo/b2ba7637-14df-4f41-9a56-f6580bfa9f33.png',
    options: [
      {value: '2 x horizontaal - HR++ helder glas', article: {sku:'ODO200', order:100}},
      {value: '2 x horizontaal - HR++ melk glas', article: {sku:'ODO201', order:100}},
      {value: '2 x verticaal - HR++ helder glas', article: {sku:'ODO202', order:100}},
      {value: '2 x verticaal - HR++ melk glas', article: {sku:'ODO203', order:100}},
    ],
    dependent: [
      {field: "glassectie_in_vleugel", values: ["Beide"]},
    ]
  }),
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie elke',
    image: 'assets/forms/odo/b2ba7637-14df-4f41-9a56-f6580bfa9f33.png',
    options: [
      {value: 'Horizontaal - HR++ helder glas', article: {sku:'ODO205', order:100}},
      {value: 'Horizontaal - HR++ melk glas', article: {sku:'ODO206', order:100}},
      {value: 'Verticaal - HR++ helder glas', article: {sku:'ODO207', order:100}},
      {value: 'Verticaal - HR++ melk glas', article: {sku:'ODO208', order:100}},
    ],
    dependent: [
      {field: "glassectie_in_vleugel", values: ["Actieve deur", "Passieve deur"]}
    ]
  }),
  new TextQuestion({
    label: 'Horizontaal - Netto glasmaat hoogte (in mm)',
    image: 'assets/forms/odo/glas-horizontaal.png',
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
    validators: [Validators.min(200)],
    dependent: [
      {
        field: 'glassectie',
        values: ['2 x horizontaal - HR++ helder glas', '2 x horizontaal - HR++ melk glas', 'Horizontaal - HR++ helder glas', 'Horizontaal - HR++ melk glas']
      },
      {field: "glassectie_in_vleugel", values: ["Beide", "Actieve deur", "Passieve deur"]}
    ]
  }),
  new TextQuestion({
    label: 'Verticaal - Netto glasmaat breedte (in mm)',
    image: 'assets/forms/odo/glas-verticaal.png',
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
    validators: [Validators.min(200)],
    dependent: [
      {
        field: 'glassectie',
        values: ['2 x verticaal - HR++ helder glas', '2 x verticaal - HR++ melk glas','Verticaal - HR++ helder glas', 'Verticaal - HR++ melk glas']
      },
      {field: "glassectie_in_vleugel", values: ["Beide", "Actieve deur", "Passieve deur"]}
    ]
  }),
  new RadioQuestion({
    key: 'glasverdeling',
    label: 'Glasverdeling',
    options: [
      {value: 'N.v.t.'},
      {value: 'Aantal roedes', article: {sku:'ODO204', order:100}},
    ],
    value: 'N.v.t.',
    dependent: [
      {field: "glassectie_in_vleugel", values: ["Beide", "Actieve deur", "Passieve deur"]}
    ],
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
      {field: "glassectie_in_vleugel", values: ["Beide", "Actieve deur", "Passieve deur"]},
      {
        field: 'glasverdeling',
        values: ['Aantal roedes']
      }
    ]
  })
]
export const montage: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'montage',
    label: 'Montage',
    options: [
      {value: 'Kozijn zo ver mogelijk in de dag monteren'}
    ],
    other: true,
    custom: '',
    value: 'Binnenzijde gelijk met binnenmuur'
  }),
  new CheckboxQuestion({
    key: 'bestaande_deur',
    label: 'Bestaande deur',
    options: [
      {value: 'Demontage DD', article: {sku:'ODO401', order:10}, duration: 30},
      {value: 'Afvoer DD', article: {sku:'ODO402', order:10}},
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
      {value: 'Uithakken vloer', article: {sku:'ODO403', order:10}, duration: 60},
      {value: 'Aansmeren vloer', article: {sku:'ODO404', order:100}, duration: 30},
      {value: 'Natuursteen/DTS dorpel plaatsen', article: {sku:'ODO407', order:10}, duration: 60}
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'aftimmering_binnenzijde',
    label: 'Aftimmering binnenzijde',
    image: 'assets/forms/odo/79cc52f6-13ec-4fc4-bd46-1d63942001c1.png',
    options: [
      {value: 'Klant kiest voor geen binnenaftimmering'},
      {value: 'Enkel tussen kozijn en muur afpurren'},
      {
        value: 'Multipaint d.m.v. lijstje rondom (exclusief schilderen, lijstje van max 80mm breed)',
        article: {sku:'ODO405', order:30},
        duration: 30
      },
      {value: 'Multipaint volledig (exclusief schilderen)', article: {sku:'ODO406', order:30}, duration: 120},
    ]
  }),
  new RadioQuestion({
    key: 'aftimmering_buitenzijde',
    label: 'Aftimmering buitenzijde',
    options: [
      {value: 'N.v.t.'},
      {value: 'Klant kiest voor geen buitenaftimmering'},
      {value: 'Aftimmeren buitenzijde (zie foto)', article: {sku:'ODO408', order:100}, duration: 60},
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
];
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
  //     {value: 'Natuursteen/DTS dorpel plaatsen - 1 uur', article: {sku:'ODO407'},
  //   ],
  //   value: ['Plaatsen nieuwe deur - 2 uur']
  // }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_klant',
    label: 'Overige opmerkingen (klant)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_leverancier',
    label: 'Overige opmerkingen (leverancier)'
  }),
  new TextareaQuestion({
    key: 'overige_opmerkingen_intern',
    label: 'Interne opmerkingen',
    toDeal: true
  }),
  new TextareaQuestion({
    key: 'materiaal_te_bestellen_door_werkvoorbereiding',
    label: 'Materiaal te bestellen door werkvoorbereiding',
    toDeal: true
  }),
];

export const inmeten: QuestionBase<string>[] = [
  new TextQuestion({
    label: 'Analoog afmetingen (in mm)',
    fields: [
      {
        key: 'analoog_breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.max(3005)]
      },
      {
        key: 'analoog_hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.max(2500)]
      }
    ]
  }),
  new TextQuestion({
    label: 'Digitaal afmetingen (in mm)',
    fields: [
      {
        key: 'digitaal_breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.max(3005)]
      },
      {
        key: 'digitaal_hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.max(2500)]
      }
    ]
  }),
  new TextQuestion({
    label: 'Bestel afmetingen (in mm)',
    fields: [
      {
        key: 'breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.max(3005)]
      },
      {
        key: 'hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.max(2500)]
      }
    ]
  }),
  new RadioQuestion({
    key: 'definitieve_bestelmaat',
    label: 'Definitieve bestelmaat',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'deur_bestellen',
    label: 'Deur bestellen',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ],
    toDeal: true,
    validators: [Validators.required]
  })
];
export const media: QuestionBase<string>[] = [
  new UploadQuestion({
    key: 'fs1',
    label: 'Foto / schets 1 (voor klant)',
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
];
export const odo: TabBase[] = [
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
    label: 'Inmeten',
    questions: inmeten
  },
  {
    label: 'Foto\'s',
    questions: media
  }
]

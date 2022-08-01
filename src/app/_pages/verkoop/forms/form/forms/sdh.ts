import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {Validators} from "@angular/forms";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";

export const algemeen: QuestionBase<string>[] = [
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
        type: 'email'
      }
    ]
  }),
  new RadioQuestion({
    key: 'type_sectionaaldeur',
    label: 'Type sectionaaldeur',
    options: [
      {value: 'Sectionaaldeur'},
      {value: 'Zijwaartse sectionaaldeur'}
    ]
  }),
  new RadioQuestion({
    key: 'draairichting_zijwaartse',
    label: 'Draairichting (van buiten uit gezien)',
    options: [
      {value:'Links'},
      {value:'Rechts'},
      {value:'Beide'},
    ],
    dependent: [
      {
        field: 'type_sectionaaldeur',
        values: ['Zijwaartse sectionaaldeur']
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
        validators: [Validators.required, Validators.max(6500)]
      },
      {
        key: 'hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.required, Validators.max(3000)]
      }
    ]
  }),
  new RadioQuestion({
    key: 'garagedeur',
    label: 'Garagedeur (Let op: bovenstaande maatvoering is niet de definitieve bestelmaat)',
    options: [
      {value: 'Offertemaatvoering'},
      {value: 'Definitieve maatvoering'},
    ]
  })
];

export const buitenzijde: QuestionBase<string>[] = [
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
    key: 'model',
    label: 'Model',
    options: [
      {value: 'Verticaal'},
      {value: 'Horizontaal'}
    ],
    other: true,
    custom: ' '
  }),
  new CheckboxQuestion({
    key: 'model_bekleding',
    label: 'Model bekleding',
    options: [
      {value: 'Slaglat'},
      {value: 'Weldorpel'},
      {value: 'Neutje'},
      {value: 'Delen (planken)'},
      {value: 'Latten'},
      {value: 'Trespa'},
      {value: 'Bossing'},
      {value: 'Aangeleverde delen'},
      {value: 'Sierlijsten'},
    ],
    other: true,
    custom: ' '
  }),
  new RadioQuestion({
    key: 'behandeling',//
    label: 'Behandeling',
    options: [
      {value: 'Onbehandeld'},
      {value: 'Transparant (Tweemaal gegrond)'},
      {value: 'Aangeleverde delen behandeld door klant'},
      {value: 'Dekkend'},
    ]
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
        values: ['Dekkend']
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
        values: ['Dekkend']
      }
    ]
  })
];

export const binnenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'deurblad',//
    label: 'Deurblad (Tweemaal gegrond)',
    options: [
      {value: 'Transparant'},
      {value: 'Op kleur'},
    ]
  }),
  new TextQuestion({
    label: 'Op kleur (deurblad)',
    fields: [
      {
        key: 'deurblad_ral',
        label: 'RAL',
        type: 'text'
      }
    ],
    dependent: [
      {
        field: 'deurblad',
        values: ['Op kleur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'rails',//
    label: 'Rails',
    options: [
      {value: 'Standaard gegalvaniseerd'},
      {value: 'Op kleur'},
    ],
    value: 'Standaard gegalvaniseerd'
  }),
  new TextQuestion({
    label: 'Op kleur (rails)',
    fields: [
      {
        key: 'rails_ral',
        label: 'RAL',
        type: 'text'
      }
    ],
    dependent: [
      {
        field: 'rails',
        values: ['Op kleur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'motor',
    label: 'Motor',
    options: [
      {value: 'N.v.t.'},
      {value: 'Plafond motor 230 V'},
      {value: 'Freq. gestuurde plafond motor 230 V (Blauwe CE stekker)'},
      {value: 'As motor 380 V'},
      {value: 'Freq. gestuurde as motor 230 V (Blauwe CE stekker)'},
    ]
  }),
  new RadioQuestion({
    key: 'stroom',
    label: 'Stroom',
    options: [
      {value: 'Door klant te voorzien'},
      {value: 'Aanwezig op de juiste plaats'},
    ],
    value: 'Door klant te voorzien'
  })
]

export const deur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'positie',
    label: 'Positie',
    options: [
      {value: 'Achter de dag'},
      {value: 'Gelijk met de wand'},
    ]
  }),
  new RadioQuestion({
    key: 'isolatie_in_de_deur',
    label: 'Isolatie in de deur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Ja'},
      {value: 'Nee'}
    ]
  }),
  new RadioQuestion({
    key: 'isoleren_van_gevel',
    label: 'Isoleren van gevel',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door Different Doors aanleveren + aanbrengen + uitstroken'},
      {value: 'Door klant aan te brengen'},
      {value: 'Door klant aan te leveren, door Different Doors aanbrengen'},
    ]
  }),
  new CheckboxQuestion({
    key: 'buiten_bediening',
    label: 'Buiten bediening',
    options: [
      {value: 'N.v.t.'},
      {value: 'Handzender'},
      {value: 'Draadloos codeklavier'},
      {value: 'Losse ontvanger'},
    ]
  }),
  new TextQuestion({
    label: 'Aantal handzenders',
    fields: [
      {
        key: 'aantal_handzenders',
        label: 'Aantal',
        type: 'number'
      }
    ]
  }),
  new RadioQuestion({
    key: 'binnen_bediening',
    label: 'Binnen bediening',
    options: [
      {value: 'N.v.t.'},
      {value: 'Draadloze drukknop'},
      {value: 'Op / Stop / Neer'},
      {value: 'Domotica of puls voorziening door de klant'},
    ]
  }),
  new TextQuestion({
    label: 'Draadloze drukknop',
    fields: [
      {
        key: 'draadloze_drukknop',
        label: 'Aantal',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'binnen_bediening',
        values: ['Draadloze drukknop']
      }
    ]
  }),
  new RadioQuestion({
    key: 'nooduitgang_aanwezig',
    label: 'Nooduitgang aanwezig',
    options: [
      {value: 'Ja'},
      {value: 'Nee'}
    ]
  }),
  new TextareaQuestion({
    key: 'nooduitgang_oplossing',
    label: 'Nooduitgang oplossing',
    dependent: [
      {
        field: 'nooduitgang_aanwezig',
        values: ['Nee']
      }
    ]
  }),
];
export const glas: QuestionBase<string>[] = [

];
export const gevelbekleding: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'aanbrengen_gevelbekleding',
    label: 'Aanbrengen gevelbekleding',
    options: [
      {value: 'N.v.t.'},
      {value: 'Door Different Doors (Zie arcering)', article: 'SDH***'},
      {value: 'Door de klant'},
    ]
  }),
  new TextQuestion({
    label: 'Afmetingen (in mm)', //berekening breede * hoogte m2
    fields: [
      {
        key: 'gevel_breedte',
        label: 'Breedte',
        type: 'number'
      },
      {
        key: 'gevel_hoogte',
        label: 'Hoogte',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'aanbrengen_gevelbekleding',
        values: ['Door Different Doors (Zie arcering)', 'Door de klant']
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Aantal m2:',
    value: '(this.form.controls[\'gevel_hoogte\'].value / 1000) * (this.form.controls[\'gevel_breedte\'].value / 1000)',
    dependent: [
      {
        field: 'aanbrengen_gevelbekleding',
        values: ['Door Different Doors (Zie arcering)', 'Door de klant']
      }
    ]
  })
];
export const loopdeur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'loopdeur_voordeur',
    label: 'Loopdeur / voordeur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Geïntegreerd in de gevel'},
      {value: 'Met kozijn'},
      {value: 'Blind kozijn'},
      {value: 'Bestaand kozijn'},
      {value: 'Pivoterende deur'},
    ],
    value: 'N.v.t.'
  }),
  new TextQuestion({
    label: 'Afmetingen (in mm)',
    fields: [
      {
        key: 'loopdeur_voordeur_breedte',
        label: 'Breedte',
        type: 'number',
        validators: [Validators.max(3000)]
      },
      {
        key: 'loopdeur_voordeur_hoogte',
        label: 'Hoogte',
        type: 'number',
        validators: [Validators.max(2500)]
      }
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'kleur_kozijn',
    label: 'Kleur kozijn (tweemaal gegrond)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Transparant'},
      {value: 'Op kleur'},
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
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
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      },
      {
        field: 'kleur_kozijn',
        values: ['Op kleur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'binnen_afwerking',
    label: 'Binnen afwerking (tweemaal gegrond)',
    options: [
      {value: 'Vlakke plaat transparant behandeld'},
      {value: 'Vlakke plaat op RAL'},
      {value: 'Bekleed zoals de buitenkant'},
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
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
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      },
      {
        field: 'binnen_afwerking',
        values: ['Vlakke plaat op RAL']
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
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'deur_beslag_voordeur',
    label: 'Deur beslag (voordeur)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Ja'},
      {value: 'Door klant'},
    ],
    value: 'N.v.t.',
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'deurgreep_voordeur',
    label: 'Deurgreep voordeur',
    image: 'assets/forms/sdh/Deurset.png',
    options: [
      {value: 'Vierkante RVS greep T-vorm met vierkant beslag', article: 'VDH400'},
      {value: 'Vierkante Zwarte  greep T-vorm met vierkant beslag zwart', article: 'VDH401'},
      {value: 'Vierkante RVS greep U-vorm met vierkant beslag', article: 'VDH402'},
      {value: 'Vierkante Zwarte greep U-vorm met vierkant beslag zwart', article: 'VDH403'},
      {value: 'Ronde RVS greep T-vorm met rond beslag', article: 'VDH404'},
      {value: 'Ronde zwarte greep T-vorm met rond beslag zwart', article: 'VDH405'},
      {value: 'Houten greep Different Doors met RVS rond beslag', article: 'VDH406'},
      {value: 'Aangeleverd door klant'},
      {value: 'Niet opgenomen in offerte'},
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      },
      {
        field: 'deur_beslag_voordeur',
        values: ['Ja']
      }
    ]
  }),
  new RadioQuestion({
    key: 'deur_beslag_loopdeur',//
    label: 'Deur beslag (loopdeur)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Ja'},
      {value: 'Door klant'},
    ],
    value: 'N.v.t.',
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'deurgreep_loopdeur',
    label: 'Deurgreep loopdeur',
    image: 'assets/forms/sdh/deurbeslag.png',
    options: [
      {value: 'SKG*** veiligheid set Rond RVS', article: 'VDH300'},
      {value: 'SKG*** veiligheid set Rond Zwart', article: 'VDH301'},
      {value: 'SKG*** veiligheid set Vierkant RVS', article: 'VDH302'},
      {value: 'SKG*** veiligheid set Vierkant Zwart', article: 'VDH303'},
      {value: 'Veiligheid-shuifrozet met kerntrek Ovaal RVS', article: 'VDH304'},
      {value: 'Aangeleverd door klant'},
      {value: 'Niet opgenomen in offerte'},
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      },
      {
        field: 'deur_beslag_loopdeur',
        values: ['Ja']
      }
    ]
  })
]
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
    ],
    value: ['Demontage DD', 'Afvoer DD']
  }),
  new RadioQuestion({
    key: 'type_deur',
    label: 'Type deur',
    options: [
      {value: 'Sectionaaldeur'},
      {value: 'Kanteldeur'},
      {value: 'Houten kozijn en deuren'},
      {value: 'Rolluik'}
    ],
    dependent: [
      {
        field: 'bestaande_deur',
        values: ['Demontage DD', 'Afvoer DD', 'Demontage door klant', 'Afvoer door klant']
      }
    ]
  }),
  new RadioQuestion({
    key: 'bouwkundig_aanpassingen',
    label: 'Bouwkundig aanpassingen',
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
export const overige: QuestionBase<string>[] = [
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
    key: 'buiten',
    label: 'Foto buitenzijde deur'
  }),
  new UploadQuestion({
    key: 'binnen',
    label: 'Foto binnenzijde deur'
  })
];
export const sdh: TabBase[] = [
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
    label: "Gevelbekleding",
    questions: gevelbekleding
  },
  {
    label: 'Loopdeur/voordeur',
    questions: loopdeur
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
  }
]

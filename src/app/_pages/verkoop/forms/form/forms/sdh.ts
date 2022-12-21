import {QuestionBase} from "../../dynamic-form/model/question-base";
import {RadioQuestion} from "../../dynamic-form/controls/question-radio";
import {TabBase} from "../../dynamic-form/model/tab-base";
import {TextQuestion} from "../../dynamic-form/controls/question-textbox";
import {CheckboxQuestion} from "../../dynamic-form/controls/question-checkbox";
import {TextareaQuestion} from "../../dynamic-form/controls/question-textarea";
import {UploadQuestion} from "../../dynamic-form/controls/question-upload";
import {Validators} from "@angular/forms";
import {CalculationQuestion} from "../../dynamic-form/controls/question-calc";
import {TableQuestion} from "../../dynamic-form/controls/question-table";

export const sales: QuestionBase<string>[] = [
  new CheckboxQuestion({
    key: 'wie_is_er_bij_het_gesprek_aanwezig',
    label: 'Wie is er bij het gesprek aanwezig?',
    options: [
      {value: 'Eindklant'},
      {value: 'Aannemer/bouwbegeleider'},
      {value: 'Architect'},
    ],
    toDeal: true,
    validators: [Validators.required]
  }),
  new RadioQuestion({
    key: 'geschatte_woningwaarde',
    label: 'Geschatte woningwaarde',
    options: [
      {value: '250 duizend – 500 duizend'},
      {value: '500 duizend – 1 miljoen'},
      {value: '> 1 miljoen'},
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
    key: 'wanneer_gaat_het_project_spelen_',
    label: 'Gewenste levertijd',
    options: [
      {value: 'Binnen 3 maanden'},
      {value: '3 tot 6 maanden'},
      {value: 'Langer dan 6 maanden'},
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
      {value: 'Niet bekend'},
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
        type: 'email'
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
    label: 'Verwachte leverweek',
    fields: [
      {
        key: 'verwachte_leverweek_klant',
        label: 'Week',
        type: 'number'
      },
      {
        key: 'verwachte_leverjaar_klant',
        label: 'Jaar',
        type: 'number'
      }
    ],
    toDeal: true
  }),
  new RadioQuestion({
    key: 'fase_project',
    label: 'Fase project',
    options: [
      {value: 'Bestaande bouw'},
      {value: 'Ontwerp'},
      {value: 'Bouw gestart'},
      {value: 'Ruwbouw klaar'},
    ],
    toDeal: true
  }),
  new CheckboxQuestion({
    key: 'status_project',
    label: 'Status project',
    options: [
      {value: 'Klaar om in te meten'},
      {value: 'Deur kan er al in'},
    ],
    toDeal: true
  }),
  new RadioQuestion({
    key: 'type_sectionaaldeur',
    label: 'Type sectionaaldeur',
    options: [
      {value: 'Sectionaaldeur'},
      {value: 'Zijwaartse sectionaaldeur', article: 'SDH300'}
    ]
  }),
  new RadioQuestion({
    key: 'draairichting_zijwaartse',
    label: 'Draairichting (van buiten uit gezien)',
    options: [
      {value: 'Links'},
      {value: 'Rechts'},
      {value: 'Beide', article: 'SDH300'},
    ],
    dependent: [
      {
        field: 'type_sectionaaldeur',
        values: ['Zijwaartse sectionaaldeur']
      }
    ]
  }),
  new TableQuestion({
    key: 'deur_afmetingen',
    label: 'Afmetingen (in mm)',
    fields: [
      {key: 'title', label: 'Garagedeur', type: 'text'},
      {key: 'breedte', label: 'Breedte', type: 'number'},
      {key: 'hoogte', label: 'Hoogte', type: 'number'},
      {key: 'isEdit', label: '', type: 'isEdit'},
    ],
    value: [{title: 'Garagedeur', breedte: '', hoogte: ''}]
  })
];

export const buitenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'houtsoort',
    label: 'Houtsoort',
    options: [
      {value: 'Red cedar', article: 'SDH400'},
      {value: 'Eiken', article: 'SDH400'},
      {value: 'Afrormosia', article: 'SDH400'},
      {value: 'Mahonie', article: 'SDH400'},
      {value: 'Accoya', article: 'SDH400'},
      {value: 'Meranti', article: 'SDH400'},
      {value: 'Fraké', article: 'SDH400'},
      {value: 'Aangeleverde delen'}
    ],
    other: true,
    toDeal: true,
    custom: ''
  }),
  new RadioQuestion({
    key: 'model',
    label: 'Model',
    options: [
      {value: 'Verticaal'},
      {value: 'Horizontaal'}
    ],
    other: true,
    custom: ''
  }),
  new RadioQuestion({
    key: 'stuiknaden',
    label: 'Stuiknaden',
    options: [
      {value: 'N.v.t.'},
      {value: 'Ja'},
      {value: 'Nee'},
    ]
  }),
  new CheckboxQuestion({
    key: 'model_bekleding',
    label: 'Model bekleding',
    options: [
      {value: 'Delen (planken)'},
      {value: 'Latten'},
      {value: 'Aangeleverde delen of latten'},
      {value: 'Trespa'},
      {value: 'Bossing'},
      {value: 'Sierlijsten'},
      {value: 'Slaglat', article: 'SDH403'},
      {value: 'Weldorpel', article: 'SDH404'},
      {value: 'Neutje', article: 'SDH405'},
    ],
    other: true,
    custom: ''
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
];

export const binnenzijde: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'deurblad',
    label: 'Binnenzijde deurblad (Tweemaal gegrond)',
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
    key: 'rails',
    label: 'Rails',
    options: [
      {value: 'Standaard gegalvaniseerd'},
    ],
    value: 'Standaard gegalvaniseerd',
    dependent:[
      {
        field: 'type_sectionaaldeur',
        values: ['Zijwaartse sectionaaldeur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'rails',
    label: 'Rails',
    options: [
      {value: 'Standaard gegalvaniseerd'},
      {value: 'Op kleur', article: 'SDH100'},
    ],
    value: 'Standaard gegalvaniseerd',
    dependent:[
      {
        field: 'type_sectionaaldeur',
        values: ['Sectionaaldeur']
      }
    ]
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
      {value: 'Plafond motor 230 V', article: 'SDH200'},
      {value: 'Freq. gestuurde plafond motor 230 V (Blauwe CE stekker)', article: 'SDH212'},
      {value: 'As motor 380 V', article: 'SDH201'},
      {value: 'Freq. gestuurde as motor 230 V (Blauwe CE stekker)', article: 'SDH201'},
    ]
  }),
  new RadioQuestion({
    key: 'stroom',
    label: 'Stroom',
    options: [
      {value: 'Door klant te voorzien', article: 'SDH207'},
      {value: 'Aanwezig op de juiste plaats', article: 'SDH207'},
    ],
    value: 'Door klant te voorzien',
    dependent:[
      {
        field: 'motor',
        values: ['Plafond motor 230 V']
      }
    ]
  }),
  new RadioQuestion({
    key: 'stroom',
    label: 'Stroom',
    options: [
      {value: 'Door klant te voorzien'},
      {value: 'Aanwezig op de juiste plaats'},
    ],
    value: 'Door klant te voorzien',
    dependent:[
      {
        field: 'motor',
        values: ['Freq. gestuurde plafond motor 230 V (Blauwe CE stekker)', 'As motor 380 V', 'Freq. gestuurde as motor 230 V (Blauwe CE stekker)']
      }
    ]
  })
]

export const deur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'positie',
    label: 'Positie',
    options: [
      {value: 'Achter de dag'},
      {value: 'Gelijk met de wand', article: 'SDH301'},
    ]
  }),
  new CheckboxQuestion({
    key: 'gelijk_met_de_wand',
    label: 'Gelijk met de wand (van binnenuit gezien)',
    options: [
      {value: 'Links'},
      {value: 'Boven'},
      {value: 'Rechts'},
    ],
    dependent: [
      {
        field: 'positie',
        values: ['Gelijk met de wand']
      }
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
      {value: 'Handzender', article: 'SDH202'},
      {value: 'Draadloos codeklavier', article: 'SDH205'},
      {value: 'Losse ontvanger', article: 'SDH204'},
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
    ],
    dependent: [
      {
        field: 'buiten_bediening',
        values: ['Handzender']
      }
    ]
  }),
  new TextQuestion({
    label: 'Aantal draadloos codeklavier',
    fields: [
      {
        key: 'aantal_draadloos_codeklavier',
        label: 'Aantal',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'buiten_bediening',
        values: ['Draadloos codeklavier']
      }
    ]
  }),
  new TextQuestion({
    label: 'Aantal losse ontvanger',
    fields: [
      {
        key: 'aantal_losse_ontvanger',
        label: 'Aantal',
        type: 'number'
      }
    ],
    dependent: [
      {
        field: 'buiten_bediening',
        values: ['Losse ontvanger']
      }
    ]
  }),
  new CheckboxQuestion({
    key: 'binnen_bediening',
    label: 'Binnen bediening',
    options: [
      {value: 'Draadloze drukknop', article: 'SDH203'},
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
  new RadioQuestion({
    key: 'glassectie',
    label: 'Glassectie',
    options: [
      {value: 'N.v.t.'},
      {value: 'HR++ helder glas'},
      {value: 'HR++ melk glas'},
    ],
    value: 'N.v.t.',
    other: true,
    custom: ''
  }),
  new UploadQuestion({
    key: 'fg1',
    label: 'Schets glas',
    dependent: [
      {
        field: 'glassectie',
        values: ['HR++ helder glas', 'HR++ melk glas', 'Overig']
      }
    ]
  })
];
export const gevelbekleding: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'aanbrengen_gevelbekleding',
    label: 'Aanbrengen gevelbekleding',
    options: [
      {value: 'N.v.t.'},
      {value: 'Different Doors monteert het hout op de kappen (overige gevel door klant)'},
      {value: 'Door Different Doors (Zie gele arcering in foto)', article: 'SDH402'},
      {value: 'Door klant maar productie door Different Doors', article: 'SDH402'},
      {value: 'Door de klant', article: 'SDH401'},
    ]
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
        values: ['Door Different Doors (Zie arcering)', 'Door klant maar productie door Different Doors']
      }
    ]
  }),
  new CalculationQuestion({
    label: 'Aantal m2:',
    value: '(this.form.controls[\'gevel_afmetingen\'].value.reduce((sum, current) => sum + parseInt(current.breedte), 0) / 1000) * (this.form.controls[\'gevel_afmetingen\'].value.reduce((sum, current) => sum + parseInt(current.hoogte), 0) / 1000)',
    dependent: [
      {
        field: 'aanbrengen_gevelbekleding',
        values: ['Door Different Doors (Zie arcering)', 'Door klant maar productie door Different Doors']
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
      {value: 'Demontage DD', article: 'SDH601'},
      {value: 'Afvoer DD', article: 'SDH602'},
      {value: 'Demontage door klant'},
      {value: 'Afvoer door klant'}
    ],
    value: ['N.v.t.']
  }),
  new RadioQuestion({
    key: 'type_deur',
    label: 'Type bestaande deur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Sectionaaldeur'},
      {value: 'Kanteldeur'},
      {value: 'Houten kozijn en deuren'},
      {value: 'Rolluik'}
    ],
    value: 'N.v.t.'
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
    key: 'fs1',
    label: 'Foto / schets (voor klant)'
  }),
  new UploadQuestion({
    key: 'fs2',
    label: 'Foto / schets 2 (voor klant)'
  }),
  new UploadQuestion({
    key: 'fb1',
    label: 'Foto overig'
  }),
  new UploadQuestion({
    key: 'fb2',
    label: 'Foto overig'
  })
];
export const sdh: TabBase[] = [
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
  }
]

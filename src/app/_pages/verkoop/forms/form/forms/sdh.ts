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

export const algemeen: QuestionBase<string>[] = [
  new TextQuestion({
    label: 'Montage adres',
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
      {value: 'Zijwaartse sectionaaldeur', article: 'SDH300'}
    ]
  }),
  new RadioQuestion({
    key: 'draairichting_zijwaartse',
    label: 'Draairichting (van buiten uit gezien)',
    options: [
      {value:'Links'},
      {value:'Rechts'},
      {value:'Beide', article: 'SDH300'},
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
      {key: 'title', label: 'Sectionaaldeur', type: 'text'},
      {key: 'breedte', label: 'Breedte', type: 'number'},
      {key: 'hoogte', label: 'Hoogte', type: 'number'},
      {key: 'isEdit', label: '', type: 'isEdit'},
    ],
    value: [{title: 'Sectionaaldeur 1', breedte: '', hoogte: ''}]
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
    key: 'deurblad',//
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
      {value: 'Op kleur', article: 'SDH100'},
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
      {value: 'Plafond motor 230 V', article: 'SDH200'},
      {value: 'Freq. gestuurde plafond motor 230 V (Blauwe CE stekker)', article: 'SDH201'},
      {value: 'As motor 380 V', article: 'SDH201'},
      {value: 'Freq. gestuurde as motor 230 V (Blauwe CE stekker)', article: 'SDH201'},
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
  new RadioQuestion({
    key: 'binnen_bediening',
    label: 'Binnen bediening',
    options: [
      {value: 'N.v.t.'},
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
      {value: 'Overig'},
    ],
    value: 'N.v.t.'
  }),
  new UploadQuestion({
    key: 'foto_sg',
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
      {value: 'Door Different Doors (Zie arcering)', article: 'SDH402'},
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
export const loopdeur: QuestionBase<string>[] = [
  new RadioQuestion({
    key: 'loopdeur_voordeur',//3 loopdeuren en 1 voordeur
    label: 'Loopdeur of voordeur',
    options: [
      {value: 'N.v.t.'},
      {value: 'Geïntegreerd in de gevel'},
      {value: 'Met kozijn'},
      {value: 'Blind kozijn'},
      {value: 'Bestaand kozijn'},
      {value: 'Pivoterende deur', article: 'HPT001'},
    ],
    value: 'N.v.t.'
  }),
  new RadioQuestion({
    key: 'loopdeur_of_voordeur',
    label: 'Loopdeur of voordeur',
    options: [
      {value: 'Loopdeur'},
      {value: 'Voordeur'},
    ],
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
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
  new UploadQuestion({
    key: 'foto_ld',
    label: 'Schets loopdeur',
    dependent: [
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new RadioQuestion({
    key: 'electrisch_motorslot',
    label: 'Electrisch motorslot',
    options: [
      {value: 'Ja'},
      {value: 'Nee'},
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
    key: 'deur_beslag_loopdeur',
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
  }),
  new RadioQuestion({
    key: 'loopdeur_voordeur_glassectie',
    label: 'Glassectie (van binnenuit gezien)',
    options: [
      {value: 'N.v.t.'},
      {value: 'Glas links naast de deur'},
      {value: 'Glas rechts naast de deur'},
      {value: 'Glas in de deur'},
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
        field: 'loopdeur_voordeur_glassectie',
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur']
      },
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
      }
    ]
  }),
  new UploadQuestion({
    key: 'foto_slg',
    label: 'Schets glas',
    dependent: [
      {
        field: 'loopdeur_voordeur_glassectie',
        values: ['Glas links naast de deur', 'Glas rechts naast de deur', 'Glas in de deur']
      },
      {
        field: 'loopdeur_voordeur',
        values: ['Geïntegreerd in de gevel', 'Met kozijn', 'Blind kozijn', 'Bestaand kozijn', 'Pivoterende deur']
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
      {value: 'Demontage DD', article: 'SDH601'},
      {value: 'Afvoer DD', article: 'SDH602'},
      {value: 'Demontage door klant'},
      {value: 'Afvoer door klant'}
    ]
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

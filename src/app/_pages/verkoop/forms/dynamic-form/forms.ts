import {FormsEnum} from "./model/formsEnum";
import {odo} from "../form/forms/odo";
import {odhd} from "../form/forms/odhd";
import {FormPage} from "./model/formPage";
import {sdh} from "../form/forms/sdh";
import {vdh} from "../form/forms/vdh";
import {ldh} from "../form/forms/ldh";
import {hpt} from "../form/forms/hpt";
import {odht} from "../form/forms/odht";

export const forms: {[key in FormsEnum]: FormPage} = {
  odo: {
    title: 'Onderhoudsarme openslaande garagedeur',
    type: FormsEnum.odo,
    articles: [{sku:'ODO400', order:110}],
    duration: 120,
    form: odo
  },
  odhd: {
    title: 'Houten openslaande deur',
    type: FormsEnum.odhd,
    articles: [{sku:'ODH100', order:100}],
    duration: 120,
    form: odhd
  },
  sdh: {
    title: 'Houten sectionaaldeur',
    type: FormsEnum.sdh,
    articles: [{sku:'SDH600', order:100}],
    duration: 0,
    form: sdh
  },
  hpt: {
    title: 'Houten pivoterende deur',
    type: FormsEnum.hpt,
    articles: [],
    duration: 0,
    form: hpt
  },
  vdh: {
    title: 'Houten voordeur',
    type: FormsEnum.vdh,
    articles: [],
    duration: 0,
    form: vdh
  },
  ldh: {
    title: 'Houten loopdeur',
    type: FormsEnum.ldh,
    articles: [],
    duration: 0,
    form: ldh
  },
  odht: {
    title: 'Houten openslaande deur transparant',
    type: FormsEnum.odht,
    articles: [],
    duration: 0,
    form: odht
  }
}

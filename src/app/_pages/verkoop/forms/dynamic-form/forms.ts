import {FormsEnum} from "./model/formsEnum";
import {odo} from "../form/forms/odo";
import {odhd} from "../form/forms/odhd";
import {FormPage} from "./model/formPage";
import {sdh} from "../form/forms/sdh";
import {vdh} from "../form/forms/vdh";
import {ldh} from "../form/forms/ldh";
import {hpt} from "../form/forms/hpt";
import {odht} from "../form/forms/odht";
import {files} from "../form/forms/files";
import {gevel} from "../form/forms/gevel";

export const forms: {[key in FormsEnum]: FormPage} = {
  odo: {
    title: 'Onderhoudsarme openslaande garagedeur',
    type: FormsEnum.odo,
    articles: [{sku:'ODO400', order:110}],
    duration: 120,
    customer: true,
    form: odo
  },
  odhd: {
    title: 'Houten openslaande deur',
    type: FormsEnum.odhd,
    articles: [{sku:'ODH100', order:100}],
    duration: 120,
    customer: true,
    form: odhd
  },
  sdh: {
    title: 'Houten sectionaaldeur',
    type: FormsEnum.sdh,
    articles: [{sku:'SDH600', order:100}],
    duration: 0,
    customer: true,
    form: sdh
  },
  hpt: {
    title: 'Houten pivoterende deur',
    type: FormsEnum.hpt,
    articles: [{sku:'SDH600', order:100}],
    duration: 0,
    customer: true,
    form: hpt
  },
  vdh: {
    title: 'Houten voordeur',
    type: FormsEnum.vdh,
    articles: [],
    duration: 0,
    customer: true,
    form: vdh
  },
  ldh: {
    title: 'Houten loopdeur',
    type: FormsEnum.ldh,
    articles: [],
    duration: 0,
    customer: true,
    form: ldh
  },
  odht: {
    title: 'Houten openslaande deur transparant',
    type: FormsEnum.odht,
    articles: [],
    duration: 0,
    customer: true,
    form: odht
  },
  files: {
    title: 'Bestanden',
    type: FormsEnum.files,
    articles: [],
    duration: 0,
    customer: false,
    form: files
  },
  gevel: {
    title: 'Gevelbekleding',
    type: FormsEnum.gevel,
    articles: [],
    duration: 0,
    customer: true,
    form: gevel
  }
}

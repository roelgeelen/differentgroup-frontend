import {FormsEnum} from "../dynamic-form/model/formsEnum";
import {odo} from "./forms/odo";
import {odhd} from "./forms/odhd";
import {FormPage} from "../dynamic-form/model/formPage";
import {sdh} from "./forms/sdh";

export const forms: {[key in FormsEnum]: FormPage} = {
  odo: {
    title: 'Onderhoudsarme openslaande garagedeur',
    type: FormsEnum.odo,
    articles: ['ODO400'],
    form: odo
  },
  odhd: {
    title: 'Houten openslaande deur',
    type: FormsEnum.odhd,
    articles: ['ODH100'],
    form: odhd
  },
  sdh: {
    title: 'Houten sectionaaldeur',
    type: FormsEnum.sdh,
    articles: ['SDH600'],
    form: sdh
  }
}

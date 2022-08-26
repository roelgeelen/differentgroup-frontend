import {FormsEnum} from "./model/formsEnum";
import {odo} from "../form/forms/odo";
import {odhd} from "../form/forms/odhd";
import {FormPage} from "./model/formPage";
import {sdh} from "../form/forms/sdh";

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
    articles: ['SDH600', 'SDH500'],
    form: sdh
  }
}

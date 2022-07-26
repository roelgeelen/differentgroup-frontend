import {TabBase} from "./tab-base";
import {FormsEnum} from "./formsEnum";

export class FormPage {
  title: string;
  type: FormsEnum;
  articles: string[];
  form: TabBase[];
}

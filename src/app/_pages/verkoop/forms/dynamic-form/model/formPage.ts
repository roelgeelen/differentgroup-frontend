import {TabBase} from "./tab-base";
import {FormsEnum} from "./formsEnum";
import {Article} from "./article";

export class FormPage {
  title: string;
  type: FormsEnum;
  articles: Article[];
  duration: number;
  form: TabBase[];
}

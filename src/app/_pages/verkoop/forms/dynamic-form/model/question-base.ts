export class QuestionBase<T> {
  value: any;
  key: string;
  image: string;
  label: string;
  required: boolean;
  controlType: string;
  type: string;
  options: { value: string }[];
  dependent: { field: string; values: string[]; }|undefined;
  fields: { value?: T | undefined; key: string; label: string; required?: boolean; type: string }[];
  other: boolean;
  custom: string;

  constructor(options: {
    value?: any;
    key?: string;
    image?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { value: string }[];
    dependent?: { field: string; values: string[] };
    fields?: { key: string; label: string; value?: any | undefined; required?: boolean; type: string }[];
    other?: boolean;
    custom? : string;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.image = options.image || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.dependent = options.dependent || undefined;
    this.fields = options.fields || [];
    this.other = !!options.other;
    this.custom = options.custom || '';
  }
}

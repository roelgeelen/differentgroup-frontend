import {Propertie} from "./Propertie";

export class DealV1 {
  properties: Propertie[]

  constructor(name: string, value: string) {
    this.properties = [new Propertie(name, value)];
  }
}

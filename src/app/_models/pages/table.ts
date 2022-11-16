export class Table {

  constructor(name: string, deadline: string, city: string, description: string, shortDescription: string, internalWorkDescription: string) {
    this.name = name;
    this.deadline = deadline;
    this.city = city;
    this.description = description;
    this.shortDescription = shortDescription;
    this.internalWorkDescription = internalWorkDescription;
  }

  name: string;
  deadline: string;
  city: string;
  description: string;
  shortDescription: string;
  internalWorkDescription: string;
}

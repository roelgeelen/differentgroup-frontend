export class Table {

  constructor(name: string, deadline: string, city: string, description: string, shortDescription: string) {
    this.name = name;
    this.deadline = deadline;
    this.city = city;
    this.description = description;
    this.shortDescription = shortDescription;
  }

  name: string;
  deadline: string;
  city: string;
  description: string;
  shortDescription: string
}

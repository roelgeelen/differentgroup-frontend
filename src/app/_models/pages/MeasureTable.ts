export class MeasureTable {

  constructor(name: string, deadline: string, adviseur: string, city: string, description: string, shortDescription: string) {
    this.name = name;
    this.deadline = deadline;
    this.adviseur = adviseur;
    this.city = city;
    this.description = description;
    this.shortDescription = shortDescription;
  }

  name: string;
  deadline: string;
  adviseur: string;
  city: string;
  description: string;
  shortDescription: string;
}

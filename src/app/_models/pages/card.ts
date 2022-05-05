export class Card {


  constructor(title: string, img: string, content: string, link: string) {
    this.title = title;
    this.img = img;
    this.content = content;
    this.link = link;
  }

  title: string;
  img: string;
  content: string;
  link: string
}

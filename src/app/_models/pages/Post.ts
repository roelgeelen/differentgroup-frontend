export class Post {
  id: string;
  title: string = '';
  message: string = '';
  published: boolean = false;
  date: Date;
  image: {id: string, uuid: string, pic: Blob};
  loadedImage: any;
  url: string;
  file?: FormData;
}

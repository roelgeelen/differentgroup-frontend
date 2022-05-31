export class Post {
  id: string;
  title: string = '';
  message: string = '';
  date: Date;
  image: string;
  loadedImage: any;
  url: string;
  file?: FormData;
}

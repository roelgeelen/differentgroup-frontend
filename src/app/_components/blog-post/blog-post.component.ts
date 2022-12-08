import {Component, OnInit} from '@angular/core';
import {Post} from "../../_models/pages/Post";
import {ApiService} from "../../_services/api.service";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  posts: Post[];
  loading= false;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loading = true
    this.apiService.getPosts(0, 4).subscribe(p => {
      this.posts = p.content;
      console.log(p)
      this.posts.forEach((post) => {
        if (post.image != null) {
          this.apiService.getPicture(post.image.uuid).subscribe(pic => {
            if (pic.body?.size !== 0) {
              var picture: Blob | null = pic.body;
              // @ts-ignore
              post.loadedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(picture));
            }
          });
        }
      })
      this.loading = false;
    })
  }
}

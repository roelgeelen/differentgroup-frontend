import {Component, OnInit} from '@angular/core';
import {Post} from "../../_models/pages/Post";
import {ApiService} from "../../_services/api.service";
import {environment} from "../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  posts: Post[];
  apiUrl = environment.apiUrl;
  loading= false;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.loading = true
    this.apiService.getPosts().subscribe(p => {
      this.posts = p;
      this.posts.forEach((post) => {
        if (post.image != null) {
          this.apiService.getPostPicture(post.image).subscribe(pic => {
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

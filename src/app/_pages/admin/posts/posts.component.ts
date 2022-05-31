import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../_services/api.service";
import {Post} from "../../../_models/pages/Post";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading= false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getPosts().subscribe(p => {
      this.posts = p;
      this.loading = false;
    })
  }

  delete(post: Post) {
    this.apiService.deletePost(post.id).subscribe(r => {
      if (r.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.loading = true;
      } else if (r instanceof HttpResponse) {
        this.removeFromList(post)
        this.loading = false;
      }
    })
  }

  removeFromList(post: Post) {
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }

}

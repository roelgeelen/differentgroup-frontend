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
    this.apiService.getPosts(0, 10, true).subscribe(p => {
      this.posts = p.content;
      this.loading = false;
    })
  }
}

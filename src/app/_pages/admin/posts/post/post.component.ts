import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../_services/api.service";
import {Post} from "../../../../_models/pages/Post";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Editor, Toolbar} from "ngx-editor";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  selectedFiles: FileList | null;
  isImageInvalid = false;
  imageSrc: string;
  post: Post = new Post();
  progress: { percentage: number } = { percentage: 0 };
  uploading = false;
  queryParam: string | null;
  loading = false;
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.loading = true;
    this.route.paramMap.subscribe(queryParams => {
      if (queryParams.get('id') !== null) {
        this.queryParam = queryParams.get('id');
        this.apiService.getPost(queryParams.get('id')).subscribe(p => {
          // @ts-ignore
          this.post = p;
          if (this.post.image != null) {
            this.apiService.getPicture(this.post.image.uuid).subscribe(pic => {
              if (pic.body?.size !== 0) {
                var picture: Blob | null = pic.body;
                // @ts-ignore
                this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(picture));
              }
            });
          }
          this.loading = false;
        })
      } else {
        this.loading = false;
      }
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.isImageInvalid = false;
    // @ts-ignore
    if (this.selectedFiles.item(0).size > 5000000) {
      this.isImageInvalid = true;
      this.selectedFiles = null;
      this.imageSrc = '';
    } else {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        };
      }
    }
  }

  removeImage() {
    this.post.image.uuid = '';
    this.selectedFiles = null;
    this.imageSrc = '';
  }

  save() {
    this.uploading = true;
    this.progress.percentage = 0;
    var file = this.selectedFiles?.item(0) ? this.selectedFiles?.item(0) : null;
    if (this.queryParam) {
      // @ts-ignore
      this.apiService.updatePost(this.post, file).subscribe(r => {
        if (r.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress.percentage = Math.round(100 * r.loaded / r.total);
        } else if (r instanceof HttpResponse) {
          this.uploading = false
        }
      })
    } else {
      // @ts-ignore
      this.apiService.savePost(this.post, file).subscribe(r => {
        if (r.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress.percentage = Math.round(100 * r.loaded / r.total);
        } else if (r instanceof HttpResponse) {
          this.post = new Post();
          this.imageSrc = '';
          this.uploading = false
          this.apiService.postFirebaseNotification('Nieuw nieuws', 'Er is een nieuw bericht beschikbaar. Bekijk het nu!', 'news_created').subscribe();
        }
      })
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Editor, Toolbar} from "ngx-editor";
import {FirestoreConversation} from "../../../../../_models/hrm/FirestoreConversation";
import {ApiService} from "../../../../../_services/api.service";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {User} from "../../../../../_models/User";
import {Location} from "@angular/common";

const toolbarSettings: Toolbar = [
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['code', 'blockquote'],
  ['ordered_list', 'bullet_list'],
  [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
  ['link', 'image'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
];
@Component({
  selector: 'app-post',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  private currentUser: User;
  conversation: FirestoreConversation = new FirestoreConversation();
  queryParam: string;
  queryParamUserId: string;
  loading = false;
  isEditing = false;
  editor: Editor;
  editor2: Editor;
  toolbar: Toolbar = toolbarSettings;
  toolbar2: Toolbar = toolbarSettings;

  constructor(private apiService: ApiService, private route: ActivatedRoute,private authService: AuthenticationService, private location: Location,) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor2 = new Editor();
    this.loading = true;
    this.route.paramMap.subscribe(queryParams => {
      this.queryParamUserId = queryParams.get('userId')!;
      if (queryParams.get('id') !== null) {
        this.queryParam = queryParams.get('id')!;
        this.getConversation();
      } else {
        this.loading = false;
        this.isEditing = true;
      }
    });
  }

  getConversation() {
    this.loading = true;
    this.apiService.getUserConversation(this.queryParamUserId!, this.queryParam!).subscribe(c => {
      this.conversation = c;
      this.loading = false;
    })
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  save() {
    console.log(this.conversation.managerComment);
    this.loading = true;
    if (this.queryParam) {
      this.apiService.updateUserConversation(this.queryParamUserId!, this.queryParam!, this.conversation).subscribe(s => {
        this.getConversation()
        this.loading = false
        this.isEditing = false;
      }, error => {
        this.loading = false
      });
    } else {
      this.conversation.createdBy="users/"+this.currentUser.email;
      this.apiService.createUserConversation(this.queryParamUserId, this.conversation).subscribe(c => {
        this.conversation = c;
        this.location.replaceState(`/hrm/werknemers/${this.queryParamUserId}/ontwikkelingen/${this.conversation.id}/update`);
        this.queryParam = c.id
        this.isEditing=false;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    }

  }
}

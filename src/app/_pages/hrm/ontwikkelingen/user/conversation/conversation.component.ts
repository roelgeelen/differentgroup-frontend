import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Editor, Toolbar} from "ngx-editor";
import {FirestoreConversation} from "../../../../../_models/hrm/FirestoreConversation";
import {ApiService} from "../../../../../_services/api.service";
import {AuthenticationService} from "../../../../../_services/authentication.service";
import {User} from "../../../../../_models/User";
import {Location} from "@angular/common";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import Swal from "sweetalert2";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  currentUser: User;
  conversation: FirestoreConversation = new FirestoreConversation();
  queryParam: string;
  queryParamUserId: string;
  loading = false;
  isEditing = false;
  editor: Editor;
  editor2: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  error: string = '';

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private location: Location,) {
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
    if (this.conversation.title == '') {
      this.error = 'Titel is verplicht';
      return;
    }

    if (this.conversation.body == '') {
      this.error = 'Bericht is verplicht!'
      return;
    }
    this.loading = true;
    if (this.queryParam) {
      this.conversation.createdAt = null;
      this.apiService.updateUserConversation(this.queryParamUserId!, this.queryParam!, this.conversation).subscribe(s => {
        this.getConversation()
        this.loading = false;
        this.error = '';
        this.isEditing = false;
      }, error => {
        this.loading = false
      });
    } else {
      this.conversation.createdBy = "users/" + this.currentUser.email;
      this.apiService.createUserConversation(this.queryParamUserId, this.conversation).subscribe(c => {
        this.conversation = c;
        this.location.replaceState(`/hrm/werknemers/${this.queryParamUserId}/ontwikkelingen/${this.conversation.id}/update`);
        this.queryParam = c.id
        this.isEditing = false;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    }

  }

  publish($event: MatSlideToggleChange) {
    this.conversation.isPublished = $event.checked;
    if (this.conversation.isPublished) {
      Swal.fire({
        title: 'Weet je het zeker?',
        text: 'Wil je deze ontwikkeling publiceren?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2e3785',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ja, publiceren!',
        cancelButtonText: 'Annuleren',
      }).then((result) => {
        if (result.isConfirmed) {
          this.save();
          this.apiService.postFirebaseNotification('Nieuwe ontwikkeling', `${this.currentUser.name} heeft een nieuwe ontwikkeling voor je klaargezet.`, 'conversation_updates', '/profile/conversations', [this.queryParamUserId]).subscribe();
        }
      });
    } else {
      this.save();
    }
  }

  delete(conversation: FirestoreConversation) {
    Swal.fire({
      title: 'Weet je het zeker?',
      text: 'Wil je deze ontwikkeling permanent verwijderen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e3785',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, verwijderen!',
      cancelButtonText: 'Annuleren',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUserConversation(this.queryParamUserId, conversation.id).subscribe(r => {
          this.router.navigateByUrl('/hrm/werknemers/'+ this.queryParamUserId)
        })
      }
    });
  }

  mailTo() {
    Swal.fire({
      title: "Met wie wil je dit delen?",
      input: "email",
      inputPlaceholder: "Email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Email versturen",
      confirmButtonColor: '#2e3785',
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        if (!email.endsWith('differentdoors.nl'))
          Swal.showValidationMessage(`Email moet een Different Doors email zijn.`);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        this.apiService.postShareConversation(result.value.toString(), this.queryParamUserId, this.conversation).subscribe(() => {
          Swal.fire({
            icon: "success",
            title: "Email is verstuurd",
            confirmButtonColor: '#2e3785',
          });
        });

      }
    });
  }
}

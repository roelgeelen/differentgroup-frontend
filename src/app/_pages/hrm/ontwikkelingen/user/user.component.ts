import {Component, OnInit} from '@angular/core';
import {FirestoreUser} from "../../../../_models/hrm/FirestoreUser";
import {ApiService} from "../../../../_services/api.service";
import {ActivatedRoute} from "@angular/router";
import {FirestoreConversation} from "../../../../_models/hrm/FirestoreConversation";
import {map} from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    loading = false;
    loadingConversations = false;
    user: FirestoreUser;
    conversations: FirestoreConversation[] = [];
    addShared = false;
    value = '';
    userId: string;
    sharedError = '';

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loading = true;
        this.route.paramMap.subscribe(queryParams => {
            if (queryParams.get('userId') !== null) {
              this.userId = queryParams.get('userId')!;
                this.apiService.getUser(this.userId).subscribe((user) => {
                        this.user = user;
                        this.loading = false
                    }
                )
              this.getConversations();
            }
        });
    }

    protected readonly close = close;

    getConversations() {
      this.loadingConversations=true;
      this.apiService.getUserConversations(this.userId).subscribe((conversations) => {
          this.conversations = conversations;
          this.loadingConversations = false
        }
      )
    }

    closeAddShared() {
        this.value = '';
        this.addShared = false;
    }

    removeSharedUser(email: string) {
      this.user.additional_managers.splice(this.user.additional_managers.indexOf(email), 1);
      this.apiService.updateSharedUsers(this.userId, this.user.additional_managers).subscribe();
    }
    addShareWithUser(email: string) {
      if (email == '') {
        this.sharedError = 'Vul eerst een geldig email adres in!';
        return;
      }
      if (!email.endsWith('@differentdoors.nl')) {
        this.sharedError = 'Dit is geen geldige Different Doors email!';
        return;
      }
      if (this.user.additional_managers==null) {
        this.user.additional_managers =[];
      }
      this.user.additional_managers.push(email);
      this.closeAddShared();
      this.apiService.updateSharedUsers(this.userId, this.user.additional_managers).subscribe();
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
        this.apiService.deleteUserConversation(this.userId, conversation.id).subscribe(r => {
          this.getConversations();
        })
      }
    });
  }
}

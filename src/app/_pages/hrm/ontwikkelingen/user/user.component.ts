import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FirestoreUser} from "../../../../_models/hrm/FirestoreUser";
import {ApiService} from "../../../../_services/api.service";
import {ActivatedRoute} from "@angular/router";
import {FirestoreConversation} from "../../../../_models/hrm/FirestoreConversation";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {User} from "../../../../_models/User";
import {addDays} from "date-fns";
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats} from "@angular/material/core";

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS},
  ]
})
export class UserComponent implements OnInit {
  date: Date | null = addDays(new Date(), 1);
  searchText = '';
  currentUser: User;
  loading = false;
  loadingConversations = false;
  user: FirestoreUser;
  conversations: FirestoreConversation[] = [];
  addShared = false;
  value = '';
  userId: string;
  sharedError = '';

  constructor(private readonly adapter: DateAdapter<Date>, private apiService: ApiService, private route: ActivatedRoute, private authService: AuthenticationService,) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
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
    this.loadingConversations = true;
    this.apiService.getUserConversations(this.userId, this.date?.getFullYear() ?? 0).subscribe((conversations) => {
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
      this.sharedError = 'Vul eerst een geldige gebruiker in!';
      return;
    }
    if (this.user.additional_managers == null) {
      this.user.additional_managers = [];
    }
    this.user.additional_managers.push(email + '@differentdoors.nl');
    this.closeAddShared();
    this.apiService.updateSharedUsers(this.userId, this.user.additional_managers).subscribe();
  }

  chosenYearHandler(normalizedYear: Date, dp: any) {
    this.date = normalizedYear;
    dp.close();
    this.getConversations();
  }
}

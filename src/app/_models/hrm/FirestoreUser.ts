export class FirestoreUser {
  id: string;
  name: string;
  email: string;
  additional_managers: string[];
  last_login: string;
  tokens: string[];

  constructor() {
  }
}

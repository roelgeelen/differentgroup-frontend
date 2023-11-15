export class FirestoreUser {
  id: string;
  name: string;
  email: string;
  manager: string;
  additional_managers: string[];
  last_login: string;
  tokens: string[];
  totalOpen: number;

  constructor() {
  }
}

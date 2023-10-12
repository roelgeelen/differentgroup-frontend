export class FirestoreConversation {
  id: string;
  title: string;
  body: string = '';
  managerComment: string = '';
  comment: string;
  createdAt: string;
  createdBy: string;
  isApproved: boolean = false;
  isRead: boolean = false;

  constructor() {
  }
}

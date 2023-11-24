export class FirestoreConversation {
  id: string;
  title: string = '';
  body: string = '';
  managerComment: string = '';
  comment: string;
  createdAt: {nanos: number, seconds: number} |null;
  createdBy: string;
  isApproved: boolean = false;
  isRead: boolean = false;
  isPublished: boolean = false;
  isConfidential: boolean = false;

  constructor() {
  }
}

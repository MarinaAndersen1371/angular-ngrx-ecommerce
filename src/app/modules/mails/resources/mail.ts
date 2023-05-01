export interface Mail {
  id?: string;
  _id?: string;
  mailTarget: string;
  firstNameTarget: string;
  lastNameTarget: string;
  message: string;
  status?: boolean;
  subject?: string;
  open?: boolean;
  deletedIn?: boolean;
  deletedOut?: boolean;
  user: {
    id?: string;
    _id?: string;
    username?: string;
    firstName?: string;
    email?: string;
  };
}

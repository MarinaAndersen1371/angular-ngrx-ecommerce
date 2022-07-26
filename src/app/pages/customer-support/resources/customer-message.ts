export interface Ticket {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  message: string;
  status?: string;
  commentAdmin?: string;
  open?: boolean;
}

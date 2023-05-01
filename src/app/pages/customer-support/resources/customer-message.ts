export interface Ticket {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  message: string;
  status?: string;
  commentAdmin?: string;
  commentManager?: string;
  timeAdmin?: number;
  timeManager?: number;
  open?: boolean;
  lastModified?: string;
  modifiedBy?: string;
}

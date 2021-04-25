import { Role } from './role.model';

export class User {
  id: string;
  email: string;
  role?: Role;
  created_at?: Date;
  updated_at?: Date;
}

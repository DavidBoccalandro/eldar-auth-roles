export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

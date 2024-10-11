import { User } from '@app/shared/models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

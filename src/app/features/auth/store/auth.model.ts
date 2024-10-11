export interface AuthState {
  user: any | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

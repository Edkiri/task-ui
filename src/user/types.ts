export interface UserCredentialsParams {
  email: string;
  password: string;
  displayName: string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface User {
  displayName: string;
  id: number;
  avatarUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface GetUserQuery {
  q?: string;
  page?: number;
  size?: number;
}

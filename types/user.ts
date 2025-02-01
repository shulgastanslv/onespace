export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  storageLimit: number;
  timeLimit: number;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  role?: Role;
  storageLimit?: number;
  timeLimit?: number;
}

export interface UpdateUserDto {
  name?: string;
  role?: Role;
  storageLimit?: number;
  timeLimit?: number;
}

import { Vault } from "./vault";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  vaults?: Vault[];
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

export interface UpdateUserDto {
  name?: string;
  role?: Role;
}

export interface Vault {
  id: string;
  name: string;
  count: number;
  color: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVaultDTO {
  name: string;
  color: string;
  icon: string | null;
}
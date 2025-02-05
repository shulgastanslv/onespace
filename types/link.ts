export interface Link {
  id: string;
  title: string;
  description?: string | null;
  url: string;
  tags: string[];
  category?: string | null;
  vaultId: string;
  createdAt: Date;
  updatedAt: Date;
  isInTrash: boolean;
}
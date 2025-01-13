export interface Note {
  id: string;
  title: string;
  content: string;
  vaultId: string;
  isInTrash?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  vaultId: string;
} 
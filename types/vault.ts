import { Note } from "./note";
import { Link } from "./link";

export interface Vault {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isInTrash: boolean;
  notes?: Note[];
  links?: Link[];
}

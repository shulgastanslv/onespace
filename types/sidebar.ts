export enum SidebarItemType {
  VAULT,
  TRASH,
  FEEDBACK,
}

export interface BaseItem {
  id: string;
  name: string;
  icon?: string | null;
  count?: number;
  color?: string | null;
}

export interface VaultItem extends BaseItem {
  type: SidebarItemType.VAULT;
  isInTrash?: boolean;
}

export interface TrashItem extends BaseItem {
  type: SidebarItemType.TRASH;
}

export interface FeedbackItem extends BaseItem {
  type: SidebarItemType.FEEDBACK;
}

export type SidebarItem = VaultItem | TrashItem | FeedbackItem;

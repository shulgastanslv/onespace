export enum SidebarItemType {
  VAULT,
  TRASH,
}

export interface BaseItem {
  id: string;
  name: string;
  icon?: string | null;
  count: number;
  color?: string | null;
}

export interface VaultItem extends BaseItem {
  type: SidebarItemType.VAULT;
  isInTrash?: boolean;
}

export interface TrashItem extends BaseItem {
  type: SidebarItemType.TRASH;
}

export type SidebarItem = VaultItem | TrashItem;

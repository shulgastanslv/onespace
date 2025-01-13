'use client';
import { SidebarItem, SidebarItemType } from '@/types/sidebar';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { memo } from 'react';
import clsx from 'clsx';
import { emptyTrash, moveToTrash } from '@/services/vault';
import { deleteVault } from '@/services/vault';
import { getIconById } from '@/lib/constants/icons';
import { useRouter } from 'next/navigation';

const SidebarItemDropdown: React.FC<{
  type: SidebarItemType;
  onVaultsChange: () => void;
  itemId: string;
}> = ({ type, onVaultsChange, itemId }) => {

  const handleAction = async (action: string) => {
    switch (action) {
      case 'delete':
        await deleteVault(itemId);
        onVaultsChange();
        break;
      case 'trash':
        await moveToTrash(itemId);
        onVaultsChange();
        break;
      case 'empty':
        await emptyTrash();
        onVaultsChange();
        break;
    }
  };

  const renderDropdownItems = () => {
    switch (type) {
      case SidebarItemType.VAULT:
        return (
          <>
            <DropdownItem 
              key="trash" 
              color="danger"
              onPress={() => handleAction('trash')}
            >
              Move to Trash
            </DropdownItem>
            <DropdownItem 
              key="delete" 
              className="text-danger " 
              color="danger"
              onPress={() => handleAction('delete')}
            >
              <div className="flex items-center gap-2 justify-start">
                <TrashIcon size={16} />
                Delete
              </div>
            </DropdownItem>
          </>
        );
      case SidebarItemType.TRASH:
        return (
          <DropdownItem 
            key="empty"
            onPress={() => handleAction('empty')}
          >
            <div className="flex items-center gap-2 justify-start">
              Empty trash
            </div>
          </DropdownItem>
        );
      default:
        return null;
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          size="sm"
          variant="light"
          isIconOnly
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVerticalIcon size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>{renderDropdownItems()}</DropdownMenu>
    </Dropdown>
  );
};

interface SidebarItemProps {
  items: SidebarItem[];
  onVaultsChange: () => void;
  isExpanded: boolean;
}

export const SidebarItems = memo(function SidebarItems({
  items,
  onVaultsChange,
  isExpanded,
}: SidebarItemProps) {
  const router = useRouter();

  const handleItemClick = (item: SidebarItem) => {
    if (item.type === SidebarItemType.VAULT) {
      router.push(`/vault/${item.id}`);
    }
    if (item.type === SidebarItemType.TRASH) {
      router.push(`/trash`);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between py-2 px-3 dark:hover:bg-gray-50/10 hover:bg-gray-50 rounded-lg group transition-colors cursor-pointer"
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <span className={clsx(!isExpanded && 'mx-auto')}>
                {(() => {
                  const Icon = getIconById(item.icon);
                  return Icon ? <Icon size={16} style={{ color: item.color || '#fff' }} /> : null;
                })()}
              </span>
            )}
            {isExpanded && (
              <>
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-gray-500">({item.count})</span>
              </>
            )}
          </div>
          {isExpanded && <SidebarItemDropdown type={item.type} onVaultsChange={onVaultsChange} itemId={item.id} />}
        </div>
      ))}
    </div>
  );
});

'use client';
import { Button } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { SidebarItems } from './SidebarItems';
import { SidebarItemType } from '@/types/sidebar';
import { useState } from 'react';
import { CreateVaultModal } from '../vault/CreateVaultModal';
import { Vault } from '@/types/vault';

interface VaultsListProps {
  isExpanded: boolean;
  vaults: Vault[];
  onVaultsChange: () => Promise<void>;
}

export function VaultsList({
  isExpanded,
  vaults,
  onVaultsChange,
}: VaultsListProps) {
  const [isOpenCreateVaultModal, setIsOpenCreateVaultModal] = useState(false);

  const handleCreateVault = () => {
    setIsOpenCreateVaultModal(true);
  };

  const handleCreateVaultSuccess = async () => {
    setIsOpenCreateVaultModal(false);
    await onVaultsChange();
  };

  return (
    <>
      <CreateVaultModal
        isOpen={isOpenCreateVaultModal}
        onClose={() => setIsOpenCreateVaultModal(false)}
        onSuccess={handleCreateVaultSuccess}
      />
      <div className="flex items-center justify-between p-2 mb-1">
        {isExpanded && (
          <h2 className="text-sm font-medium text-gray-500">Vaults</h2>
        )}
        {isExpanded && (
          <Button
            size="sm"
            variant="light"
            isIconOnly
            onClick={handleCreateVault}
          >
            <PlusIcon size={16} />
          </Button>
        )}
      </div>
      {vaults.length > 0 ? (
        <SidebarItems
          onVaultsChange={onVaultsChange}
          isExpanded={isExpanded}
          items={vaults
            .filter((v) => !v.isInTrash)
            .map((v) => ({
              id: v.id,
              type: SidebarItemType.VAULT,
              name: v.name,
              count: v.count,
              icon: v.icon,
              color: v.color,
            }))}  
        />
      ) : (
        <div className="flex flex-col p-2">
          <p className="text-sm hover:scale-105 duration-300 hover:text-gray-500 cursor-pointer text-start">No vaults found</p>
        </div>
      )}
    </>
  );
}

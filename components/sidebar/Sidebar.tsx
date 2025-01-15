'use client';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { SidebarItem, SidebarItemType } from '@/types/sidebar';
import { SidebarItems } from './SidebarItems';
import { VaultsList } from './VaultsList';
import { Vault } from '@/types/vault';
import { getAllVaults } from '@/services/vault';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const router = useRouter();
  const [vaults, setVaults] = useState<Vault[]>([]);

  const refreshVaults = async () => {
    const vaults = await getAllVaults();
    setVaults(vaults);
  };

  useEffect(() => {
    refreshVaults();
  }, []);

  const trashCount = vaults.filter((v) => v.isInTrash).length;


  const items: SidebarItem[] = [
    {
      id: 'trash',
      type: SidebarItemType.TRASH,
      name: 'Trash',
      icon: 'trash',
      count: trashCount,
    },
  ];

 
  return (
    <>
      <motion.div
        className={`${
          isExpanded ? 'w-72' : 'w-20'
        } min-h-screen shadow-xl border-r mt-14 border-gray-200 flex flex-col relative `}
        animate={{ width: isExpanded ? 288 : 80 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          variant="light"
          isIconOnly
          className="absolute -right-4 top-3 shadow-md hover:shadow-lg z-[999] rounded-full w-6 h-6 "
        >
          {isExpanded ? (
            <ChevronLeftIcon size={14} />
          ) : (
            <ChevronRightIcon size={14} />
          )}
        </Button>
        <div className="flex flex-col p-5">
          <VaultsList
            isExpanded={isExpanded}
            vaults={vaults}
            onVaultsChange={refreshVaults}
          />
          <SidebarItems
            isExpanded={isExpanded}
            items={items}
            onVaultsChange={refreshVaults}
          />
          <div className="flex justify-center">
            {
              isExpanded ? (
                <Button size="sm" variant="light" className="p-5" onClick={() => {router.push('/auth/login')}}>
                  Logout
                </Button>
              ) : null
            }
          </div>
        </div>
      </motion.div>
    </>
  );
}

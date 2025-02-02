'use client';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Divider } from '@nextui-org/react';
import { SidebarItem, SidebarItemType } from '@/types/sidebar';
import { SidebarItems } from './SidebarItems';
import { VaultsList } from './VaultsList';
import { Vault } from '@/types/vault';
import { getAllVaults } from '@/services/vault';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [vaults, setVaults] = useState<Vault[]>([]);
  const session = useSession();

  const refreshVaults = async () => {
    const vaults = await getAllVaults(session.data?.user?.id!);
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
      color: 'primary',
      count: trashCount,
    },
    {
      id: 'feedback',
      type: SidebarItemType.FEEDBACK,
      name: 'Feedback',
      icon: 'feedback',
      color: 'primary',
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
          variant="shadow"
          isIconOnly
          className="absolute -right-4 bg-background border-gray-200 border top-3 shadow-md hover:shadow-lg rounded-full w-6 h-6 "
        >
          {isExpanded ? (
            <ChevronLeftIcon size={14} />
          ) : (
            <ChevronRightIcon size={14} />
          )}
        </Button>
        <div className="flex flex-col p-5">
          <div className="flex flex-col p-5">
            <VaultsList
              isExpanded={isExpanded}
              vaults={vaults}
              onVaultsChange={refreshVaults}
            />
            <Divider className="my-5 dark:border-gray-50/10" />
            <SidebarItems
              isExpanded={isExpanded}
              items={items}
              onVaultsChange={refreshVaults}
            />
            <Divider className="my-5 dark:border-gray-50/10" />
          </div>
        </div>
      </motion.div>
    </>
  );
}

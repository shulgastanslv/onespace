'use client';

import { useEffect, useState } from 'react';
import { Vault } from '@/types/vault';
import { getTrashVaults, restoreFromTrash } from '@/services/vault';
import { Button, Card, CardBody } from '@nextui-org/react';
import { getIconById } from '@/lib/constants/icons';
import { RefreshCwIcon, TrashIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function TrashPage() {
  const [trashedVaults, setTrashedVaults] = useState<Vault[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const fetchVaults = async () => {
    try {
      setIsLoading(true);
      
      if (!session?.user?.id) {
        toast.error('User not authorized');
        return;
      }

      const vaults = await getTrashVaults(session.user.id);
      setTrashedVaults(vaults || []);
    } catch (error) {
      toast.error('Error while loading trash vaults!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchVaults();
    }
  }, [status]);

  const handleRestore = async (vaultId: string) => {
    try {
      setIsLoading(true);
      
      if (!session?.user?.id) {
        toast.error('User not authorized');
        return;
      }

      const result = await restoreFromTrash(session.user.id, vaultId);
      
      if (result) {
        await fetchVaults();
        toast.success('Vault successfully restored');
      } else {
        toast.error('Failed to restore vault');
      }
    } catch (error) {
      toast.error('Error while restoring vault');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16 max-w-6xl">
      <div className="flex items-center justify-between mb-6 p-6 border-b border-gray-200 rounded-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Trash</h1>
          {trashedVaults != null && (
            <span className="text-gray-500 text-sm">
              {trashedVaults.length}{' '}
              {trashedVaults.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
        <Button
          variant="shadow"
          color="primary"
          size="sm"
          onClick={fetchVaults}
          isLoading={isLoading}
        >
          Refresh
        </Button>
      </div>
      {status === 'loading' ? (
        <div className="flex justify-center items-center py-16">
          <RefreshCwIcon size={48} className="animate-spin opacity-50" />
        </div>
      ) : trashedVaults?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <TrashIcon size={48} className="mb-4 opacity-50" />
          <p className="text-base">Trash is empty</p>
          <p className="text-sm mt-2">Deleted vaults will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trashedVaults != null && trashedVaults.map((vault) => (
            <Card
              key={vault.id}
              className="hover:shadow-lg transition-all duration-300 bg-background backdrop-blur-md border border-gray-200"
            >
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = getIconById(vault.icon || 'folder');
                      return Icon ? (
                        <Icon size={24} style={{ color: vault.color }} />
                      ) : null;
                    })()}
                    <div>
                      <h3 className="font-semibold">{vault.name}</h3>
                      <p className="text-sm text-gray-500">Deleted</p>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  color="default"
                  variant="light"
                  onClick={() => handleRestore(vault.id)}
                  className="w-full"
                >
                  Restore
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

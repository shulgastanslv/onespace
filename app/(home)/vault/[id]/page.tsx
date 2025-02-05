'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { LinkIcon, StickyNote } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Note } from '@/types/note';
import { Vault } from '@/types/vault';
import { Link } from '@/types/link';
import { getAllNotes } from '@/services/note';
import { getAllLinks } from '@/services/link';
import { getVault } from '@/services/vault';
import { getIconById } from '@/lib/constants/icons';
import { NotesList } from '@/components/note/NotesList';
import { CreateLinkModal } from '@/components/link/CreateLinkModal';
import { CreateNoteModal } from '@/components/note/CreateNoteModal';
import { LinksList } from '@/components/link/LinksList';
import React from 'react';

interface VaultPageProps {
  params: Promise<{ id: string }>;
}

export default function VaultPage(props: VaultPageProps) {
  // States
  const [state, setState] = useState({
    notes: [] as Note[],
    links: [] as Link[],
    vault: null as Vault | null,
    isLoading: true,
    isCreateModalOpen: false,
    isCreateLinkModalOpen: false,
  });

  // Hooks
  const params = React.use(props.params);
  const vaultId = params.id;
  const { data: sessionData, status } = useSession();
  const userId = sessionData?.user?.id;

  // Fetch data handler
  const fetchData = useCallback(async () => {
    if (!userId) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const [vaultData, notesData, linksData] = await Promise.all([
        getVault(userId, vaultId),
        getAllNotes(vaultId),
        getAllLinks(vaultId),
      ]);

      if (!vaultData) {
        toast.error('Vault not found');
        return;
      }

      setState(prev => ({
        ...prev,
        vault: vaultData as Vault,
        notes: notesData,
        links: linksData as Link[],
      }));
    } catch (error) {
      toast.error('Failed to load vault data');
      console.error('Error fetching vault data:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [userId, vaultId]);

  // Effects
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Modal handlers
  const handleModalToggle = (modalType: 'note' | 'link', isOpen: boolean) => {
    setState(prev => ({
      ...prev,
      [modalType === 'note' ? 'isCreateModalOpen' : 'isCreateLinkModalOpen']: isOpen,
    }));
  };

  // Render helpers
  const renderIcon = () => {
    if (!state.vault?.icon) return null;
    const Icon = getIconById(state.vault.icon);
    return Icon ? (
      <div className="p-2 bg-inherit rounded-lg">
        <Icon size={24} style={{ color: state.vault.color || '#000000' }} />
      </div>
    ) : null;
  };

  const renderEmptyState = (type: 'note' | 'link') => (
    <div className="text-center py-8">
      {type === 'note' ? (
        <StickyNote size={24} className="mx-auto mb-2 text-gray-400" />
      ) : (
        <LinkIcon size={24} className="mx-auto mb-2 text-gray-400" />
      )}
      <p className="text-gray-500">No {type}s yet</p>
      <Button
        color="primary"
        variant="light"
        size="sm"
        className="mt-2"
        onClick={() => handleModalToggle(type, true)}
      >
        {type === 'note' ? 'Create your first note' : 'Add your first link'}
      </Button>
    </div>
  );

  if (status === 'loading' || state.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="mt-4 text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!state.vault) return null;

  // Main render
  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6 mt-16">
        {/* Modals */}
        <CreateNoteModal
          isOpen={state.isCreateModalOpen}
          onClose={() => handleModalToggle('note', false)}
          onSuccess={fetchData}
          vaultId={vaultId}
        />
        <CreateLinkModal
          isOpen={state.isCreateLinkModalOpen}
          onClose={() => handleModalToggle('link', false)}
          onSuccess={fetchData}
          vaultId={vaultId}
        />

        {/* Header */}
        <div className="bg-transparent border-b border-default-200 rounded-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {renderIcon()}
              <div>
                <h1 className="text-2xl font-bold">{state.vault.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {state.notes.length} notes · {state.links.length} links
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                color="primary"
                variant="shadow"
                size="sm"
                onClick={() => handleModalToggle('note', true)}
                startContent={<StickyNote size={16} />}
              >
                Create note
              </Button>
              <Button
                color="primary"
                variant="shadow"
                size="sm"
                onClick={() => handleModalToggle('link', true)}
                startContent={<LinkIcon size={16} />}
              >
                Add link
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-transparent border-b border-default-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Notes</h2>
            {state.notes.length === 0 ? (
              renderEmptyState('note')
            ) : (
              <NotesList notes={state.notes} onNotesChange={fetchData} />
            )}
          </div>
          <div className="bg-transparent border-b border-default-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Links</h2>
            {state.links.length === 0 ? (
              renderEmptyState('link')
            ) : (
              <LinksList links={state.links} onLinksChange={fetchData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

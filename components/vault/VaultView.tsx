'use client';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { Note } from '@/types/note';
import { Vault } from '@/types/vault';
import { getAllNotes } from '@/services/note';
import { CreateNoteModal } from '../note/CreateNoteModal';
import { NotesList } from '@/components/note/NotesList';
import { Navbar } from '@/components/navbar/Navbar';
import { getIconById } from '@/lib/constants/icons';

interface VaultViewProps {
  vaultId: string;
}

export function VaultView({ vaultId }: VaultViewProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [vault, setVault] = useState<Vault | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchNotes = async () => {
    const fetchedNotes = await getAllNotes(vaultId);
    setNotes(fetchedNotes);
  };

  const fetchVault = async () => {
    const response = await fetch(`/api/vaults/${vaultId}`);
    const vault = await response.json();
    setVault(vault);
  };

  useEffect(() => {
    fetchVault();
    fetchNotes();
  }, [vaultId]);

  const handleCreateSuccess = () => {
    fetchNotes();
  };

  if (!vault) return null;

  return (
    <div>
      <Navbar />
      <div className="p-6 mt-16">
        <CreateNoteModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
          vaultId={vaultId}
        />
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold">{vault.name}</h1>
            {(() => {
              const Icon = getIconById(vault.icon!);
              return Icon ? (
                <Icon size={16} style={{ color: vault.color || '#000000' }} />
              ) : null;
            })()}
          </div>
          <Button
            color="primary"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            startContent={<PlusIcon size={16} />}
          >
            Create note
          </Button>
        </div>
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              There are no notes in this vault
            </p>
            <Button
              color="primary"
              variant="flat"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create first note
            </Button>
          </div>
        ) : (
          <NotesList notes={notes} onNotesChange={fetchNotes} />
        )}
      </div>
    </div>
  );
}

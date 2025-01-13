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
import { Link } from '@/types/link';
import { getAllLinks } from '@/services/link';
import { CreateLinkModal } from '../link/CreateLinkModal';
import { LinksList } from '../link/LinksList';

interface VaultViewProps {
  vaultId: string;
}

export function VaultView({ vaultId }: VaultViewProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [vault, setVault] = useState<Vault | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const fetchNotes = async () => {
    const fetchedNotes = await getAllNotes(vaultId);
    setNotes(fetchedNotes);
  };

  const fetchVault = async () => {
    const response = await fetch(`/api/vaults/${vaultId}`);
    const vault = await response.json();
    setVault(vault);
  };

  const fetchLinks = async () => {
    const fetchedLinks = await getAllLinks(vaultId);
    setLinks(fetchedLinks as Link[]);
  };

  useEffect(() => {
    fetchVault();
    fetchNotes();
    fetchLinks();
  }, [vaultId]);

  const handleCreateSuccess = () => {
    fetchNotes();
  };

  const handleCreateLinkSuccess = () => {
    fetchLinks();
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
        <CreateLinkModal
          isOpen={isCreateLinkModalOpen}
          onClose={() => setIsCreateLinkModalOpen(false)}
          onSuccess={handleCreateLinkSuccess}
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
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Notes</h2>
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
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col gap-4">
                  <NotesList notes={notes} onNotesChange={fetchNotes} />
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="w-max mt-5"
                  onClick={() => setIsCreateModalOpen(true)}
                  startContent={<PlusIcon size={16} />}
                >
                  Create note
                </Button>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Links</h2>
            {links.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  There are no links in this vault
                </p>
                <Button
                  variant="flat"
                  size="sm"
                  onClick={() => setIsCreateLinkModalOpen(true)}
                >
                  Add first link
                </Button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="flex flex-col gap-4">
                  <LinksList links={links} onLinksChange={fetchLinks} />
                </div>
                <Button
                  color="primary"
                  size="sm"
                  className="w-max mt-5"
                  onClick={() => setIsCreateLinkModalOpen(true)}
                  startContent={<PlusIcon size={16} />}
                >
                  Add link
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

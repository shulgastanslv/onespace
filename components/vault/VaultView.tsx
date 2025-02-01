'use client';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { LinkIcon, StickyNote } from 'lucide-react';
import { Note } from '@/types/note';
import { Vault } from '@/types/vault';
import { getAllNotes } from '@/services/note';
import { CreateNoteModal } from '../note/CreateNoteModal';
import { NotesList } from '@/components/note/NotesList';
import { getIconById } from '@/lib/constants/icons';
import { Link } from '@/types/link';
import { getAllLinks } from '@/services/link';
import { CreateLinkModal } from '../link/CreateLinkModal';
import { LinksList } from '../link/LinksList';
import { getVault } from '@/services/vault';

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
    const vault = await getVault(vaultId);
    setVault(vault as Vault);
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
    <div className="max-w-6xl mx-auto">
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
        <div className="bg-transparent border-b border-default-200 rounded-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = getIconById(vault.icon!);
                return Icon ? (
                  <div className="p-2 bg-inherit rounded-lg">
                    <Icon
                      size={24}
                      style={{ color: vault.color || '#000000' }}
                    />
                  </div>
                ) : null;
              })()}
              <div>
                <h1 className="text-2xl font-bold">{vault.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {notes.length} notes · {links.length} links
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                color="primary"
                variant="shadow"
                size="sm"
                onClick={() => setIsCreateModalOpen(true)}
                startContent={<StickyNote size={16} />}
              >
                Create note
              </Button>
              <Button
                color="primary"
                variant="shadow"
                size="sm"
                onClick={() => setIsCreateLinkModalOpen(true)}
                startContent={<LinkIcon size={16} />}
              >
                Add link
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-transparent border-b border-default-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Notes</h2>
            {notes.length === 0 ? (
              <div className="text-center py-8">
                <StickyNote size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No notes yet</p>
                <Button
                  color="primary"
                  variant="light"
                  size="sm"
                  className="mt-2"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create your first note
                </Button>
              </div>
            ) : (
              <NotesList notes={notes} onNotesChange={fetchNotes} />
            )}
          </div>
          <div className="bg-transparent border-b border-default-200 p-6">
            <h2 className="text-lg font-semibold mb-6">Links</h2>
            {links.length === 0 ? (
              <div className="text-center py-8">
                <LinkIcon size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500">No links yet</p>
                <Button
                  color="primary"
                  variant="light"
                  size="sm"
                  className="mt-2"
                  onClick={() => setIsCreateLinkModalOpen(true)}
                >
                  Add your first link
                </Button>
              </div>
            ) : (
              <LinksList links={links} onLinksChange={fetchLinks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { LinkIcon, StickyNote } from 'lucide-react';
import { Note } from '@/types/note';
import { Vault } from '@/types/vault';
import { getAllNotes } from '@/services/note';
import { NotesList } from '@/components/note/NotesList';
import { getIconById } from '@/lib/constants/icons';
import { Link } from '@/types/link';
import { getAllLinks } from '@/services/link';
import { getVault } from '@/services/vault';
import { useSession } from 'next-auth/react';
import { CreateLinkModal } from '@/components/link/CreateLinkModal';
import { CreateNoteModal } from '@/components/note/CreateNoteModal';
import { LinksList } from '@/components/link/LinksList';
import React from 'react';

interface VaultPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page(props: VaultPageProps) {
  const params = React.use(props.params);
  const vaultId = params.id;
  const [notes, setNotes] = useState<Note[]>([]);
  const [vault, setVault] = useState<Vault | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [vaultData, notesData, linksData] = await Promise.all([
        getVault(session.data?.user?.id!, vaultId),
        getAllNotes(vaultId),
        getAllLinks(vaultId)
      ]);
      
      setVault(vaultData as Vault);
      setNotes(notesData);
      setLinks(linksData as Link[]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session.data?.user?.id) {
      fetchData();
    }
  }, [session.data?.user?.id, vaultId]);

  const handleDataUpdate = () => {
    fetchData();
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen mx-auto">
      <div className="loading-spinner" />
    </div>;
  }

  if (!vault) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6 mt-16">
        <CreateNoteModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleDataUpdate}
          vaultId={vaultId}
        />
        <CreateLinkModal
          isOpen={isCreateLinkModalOpen}
          onClose={() => setIsCreateLinkModalOpen(false)}
          onSuccess={handleDataUpdate}
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
              <NotesList notes={notes} onNotesChange={handleDataUpdate} />
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
              <LinksList links={links} onLinksChange={handleDataUpdate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

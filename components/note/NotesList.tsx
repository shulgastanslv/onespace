'use client';

import { Note } from '@/types/note';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface NotesListProps {
  notes: Note[];
  onNotesChange: () => void;
}

export function NotesList({ notes }: NotesListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>{selectedNote?.title}</h2>
                <p className="text-xs text-default-400">
                  {selectedNote &&
                    formatDistanceToNow(new Date(selectedNote.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                </p>
              </ModalHeader>
              <ModalBody className="py-4 w-full">
                <Markdown>{selectedNote?.content}</Markdown>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="hover:shadow-md transition-shadow duration-200 max-w-sm cursor-pointer"
          >
            <CardHeader className="flex justify-between items-start px-4 pt-3 pb-2">
              <div>
                <h3 className="text-md font-medium">{note.title}</h3>
                <p className="text-xs text-default-400">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                    locale: enUS,
                  })}
                </p>
              </div>
            </CardHeader>
            <CardBody className="px-4 py-2">
              <p className="text-sm text-default-600 line-clamp-2">
                {note.content}
              </p>
              <Button
                variant="light"
                size="sm"
                className="mt-5"
                onClick={() => handleNoteClick(note)}
              >
                View
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

'use client';

import { Note } from '@/types/note';
import { Button, Card, CardBody, CardHeader, Input, Textarea } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { deleteNote, updateNote } from '@/services/note';

interface NotesListProps {
  notes: Note[];
  onNotesChange: () => void;
}

export function NotesList({ notes, onNotesChange }: NotesListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
    onOpen();
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    setEditForm({ title: note.title, content: note.content });
    setIsEditing(true);
    onOpen();
  };

  const handleDelete = async (note: Note) => {
    if (confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note.id);
      onNotesChange();
    }
  };

  const handleUpdate = async () => {
    if (!selectedNote) return;
    await updateNote({
      id: selectedNote.id,
      title: editForm.title,
      content: editForm.content,
    });
    onNotesChange();
    onOpenChange();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEditing ? (
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Title"
                  />
                ) : (
                  <>
                    <h2>{selectedNote?.title}</h2>
                    <p className="text-xs text-default-400">
                      {selectedNote &&
                        formatDistanceToNow(new Date(selectedNote.createdAt), {
                          addSuffix: true,
                          locale: enUS,
                        })}
                    </p>
                  </>
                )}
              </ModalHeader>
              <ModalBody>
                {isEditing ? (
                  <Textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    placeholder="Content"
                    minRows={10}
                  />
                ) : (
                  <Markdown>{selectedNote?.content}</Markdown>
                )}
              </ModalBody>
              <ModalFooter>
                {isEditing ? (
                  <Button color="primary" onClick={handleUpdate}>
                    Save
                  </Button>
                ) : null}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="bg-transparent backdrop-blur-sm border-1 border-default-200 hover:border-default-400 transition-colors"
          >
            <CardHeader className="flex justify-between items-start px-4 pt-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">{note.title}</h3>
                <p className="text-xs text-default-400">
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                    locale: enUS,
                  })}
                </p>
              </div>
            </CardHeader>
            <CardBody className="px-4 py-2">
              <p className="text-sm text-default-600 line-clamp-3 mb-4">
                {note.content}
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => handleNoteClick(note)}
                >
                  <Eye size={18} />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => handleEdit(note)}
                >
                  <Pencil size={18} />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  color="danger"
                  onClick={() => handleDelete(note)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}

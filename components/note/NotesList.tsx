'use client';

import { Note } from '@/types/note';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface NotesListProps {
  notes: Note[];
  onNotesChange: () => void;
}

export function NotesList({ notes }: NotesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {notes.map((note) => (
        <Card 
          key={note.id} 
          className="hover:shadow-md transition-shadow duration-200 max-w-sm"
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
            <p className="text-sm text-default-600 line-clamp-2">{note.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
} 
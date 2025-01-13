'use client';

import { Link } from '@/types/link';
import { Button } from '@nextui-org/react';
import { Trash2Icon } from 'lucide-react';
import { deleteLink } from '@/services/link';

interface LinksListProps {
  links: Link[];
  onLinksChange: () => void;
}

export function LinksList({ links, onLinksChange }: LinksListProps) {
  const handleDelete = async (linkId: string) => {
    try {
      await deleteLink(linkId);
      onLinksChange();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex flex-col p-4 mb-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center justify-between">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 hover:underline text-blue-600 font-medium"
            >
              {link.title || link.url}
            </a>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-gray-500 hover:text-red-500"
              onClick={() => handleDelete(link.id)}
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
          
          {link.description && (
            <p className="mt-2 text-gray-600 text-sm">{link.description}</p>
          )}
          
          <div className="mt-2 flex flex-wrap gap-2">
            {link.category && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                {link.category}
              </span>
            )}
            
            {link.tags && link.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 
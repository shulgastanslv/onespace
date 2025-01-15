'use client';

import { Link } from '@/types/link';
import { Button, Card, CardHeader, CardBody } from '@nextui-org/react';
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
        <Card
          key={link.id}
          className="hover:shadow-md transition-shadow duration-200 max-w-sm"
        >
          <CardHeader className="flex justify-between items-start px-4 pt-3 pb-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 hover:underline text-blue-600 font-medium cursor-pointer"
              >
                {link.title || link.url}
              </a>
              <div className="flex items-center justify-between">
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
            </div>
          </CardHeader>
          <CardBody className="px-4 py-2 flex flex-col gap-2">
            {link.description && (
              <p className="mt-2 text-gray-600 text-sm">{link.description}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {link.category && (
                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                  {link.category}
                </span>
              )}
              {link.tags &&
                link.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

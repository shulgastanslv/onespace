'use client';

import { Link } from '@/types/link';
import { Button, Card, CardHeader, CardBody, Tooltip } from '@nextui-org/react';
import { Trash2Icon, PencilIcon, TagIcon } from 'lucide-react';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
      {links.map((link) => (
        <Card
          key={link.id}
          className="bg-transparent backdrop-blur-sm border-1 border-default-200 hover:border-default-400 transition-colors"
        >
          <CardHeader className="flex justify-between items-start px-4 pt-4">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-500 hover:text-blue-600 font-semibold line-clamp-1"
                >
                  {link.title || link.url}
                </a>
                <div className="flex gap-2">
                  <Tooltip content="Edit">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="hover:text-default-900"
                    >
                      <PencilIcon size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="hover:text-danger dark:hover:text-danger-400"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2Icon size={16} className="text-danger" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4 py-2 flex flex-col gap-2">
            {link.description && (
              <p className="text-default-500 dark:text-default-400 text-sm line-clamp-2 mb-3">
                {link.description}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-start">
              <div className="flex flex-wrap items-center justify-start gap-2">
                {link.category && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border-none">
                    {link.category}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2">
              <TagIcon size={16} />
              {link.tags &&
                link.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-default-100 dark:bg-default-50 text-default-600 dark:text-default-400"
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

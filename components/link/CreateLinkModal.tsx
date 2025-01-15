'use client';

import { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  Textarea,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { CreateLinkDTO, createLinkSchema } from '@/schemas/link';
import { createLink } from '@/services/link';
import { toast } from 'sonner';

enum LinkCategory {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  TOOL = 'TOOL',
  DOCUMENTATION = 'DOCUMENTATION',
  TUTORIAL = 'TUTORIAL',
  OTHER = 'OTHER',
}

enum LinkTags {
  DESIGN = 'design',
  PRODUCTIVITY = 'productivity',
  AI = 'ai',
  MARKETING = 'marketing',
  SEO = 'seo',
  CODING = 'coding',
  LEARNING = 'learning',
  OTHER = 'other',
}

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  vaultId: string;
}

export function CreateLinkModal({ isOpen, onClose, onSuccess, vaultId }: CreateLinkModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateLinkDTO>({
    title: '',
    description: '',
    url: '',
    tags: [],
    category: '',
    vaultId: vaultId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = createLinkSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0].toString()] = issue.message;
        });
        setErrors(formattedErrors);
        toast.error('Please check the form for errors');
        return;
      }
      await createLink(result.data);
      toast.success('Link created successfully!');
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Add new link</h2>
          </ModalHeader>
          
          <ModalBody className="gap-4">
            <Input
              label="Title"
              placeholder="Enter title..."
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              errorMessage={errors.title}
              isInvalid={!!errors.title}
            />

            <Input
              label="URL"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              errorMessage={errors.url}
              isInvalid={!!errors.url}
            />

            <Textarea
              label="Description"
              placeholder="Enter description..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              errorMessage={errors.description}
              isInvalid={!!errors.description}
            />

            <Select
              label="Category"
              placeholder="Select category"
              selectedKeys={formData.category ? [formData.category] : []}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              {Object.entries(LinkCategory).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Tags"
              placeholder="Select tags"
              selectionMode="multiple"
              selectedKeys={new Set(formData.tags)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: Array.from(new Set(e.target.value.split(',')))
                }))
              }
            >
              {Object.entries(LinkTags).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
} 
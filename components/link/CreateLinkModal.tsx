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
} from '@nextui-org/react';
import { CreateLinkDTO, createLinkSchema } from '@/schemas/link';
import { createLink } from '@/services/link';
import { toast } from 'sonner';

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

            <Input
              label="Category"
              placeholder="Enter category..."
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            />

            <Input
              label="Tags"
              placeholder="Enter tags separated by commas..."
              value={formData.tags?.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))
              }
            />
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
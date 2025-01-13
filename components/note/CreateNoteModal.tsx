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
  Tabs,
  Tab,
} from '@nextui-org/react';
import { CreateNoteDTO, createNoteSchema } from '@/schemas/note';
import { createNote } from '@/services/note';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { RiMarkdownLine, RiEyeLine } from 'react-icons/ri';
import { 
  RiBold, 
  RiItalic, 
  RiListUnordered, 
  RiListOrdered, 
  RiCodeLine,
  RiLinkM,
  RiImage2Line 
} from 'react-icons/ri';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  vaultId: string;
}

export function CreateNoteModal({ isOpen, onClose, onSuccess, vaultId }: CreateNoteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  const [formData, setFormData] = useState<CreateNoteDTO>({
    title: '',
    content: '',
    vaultId: vaultId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = createNoteSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0].toString()] = issue.message;
        });
        setErrors(formattedErrors);
        toast.error('Please check the form for errors');
        return;
      }
      await createNote(result.data);
      toast.success('Note created successfully!');
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    setFormData(prev => ({
      ...prev,
      content: `${before}${prefix}${selection}${suffix}${after}`
    }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur" 
      placement="center"
      size="3xl"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Create new note</h2>
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

            <div className="flex gap-2 mb-2">
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('**', '**')}><RiBold /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('*', '*')}><RiItalic /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('\n- ')}><RiListUnordered /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('\n1. ')}><RiListOrdered /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('`', '`')}><RiCodeLine /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('[', '](url)')}><RiLinkM /></Button>
              <Button size="sm" variant="flat" onClick={() => insertMarkdown('![alt text](', ')')}><RiImage2Line /></Button>
            </div>

            <Tabs 
              selectedKey={activeTab} 
              onSelectionChange={(key) => setActiveTab(key.toString())}
            >
              <Tab 
                key="edit" 
                title={
                  <div className="flex items-center gap-2">
                    <RiMarkdownLine />
                    <span>Edit</span>
                  </div>
                }
              >
                <Textarea
                  className="min-h-[300px]"
                  placeholder="Enter note text in Markdown..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  errorMessage={errors.content}
                  isInvalid={!!errors.content}
                />
              </Tab>
              <Tab 
                key="preview" 
                title={
                  <div className="flex items-center gap-2">
                    <RiEyeLine />
                    <span>Preview</span>
                  </div>
                }
              >
                <div className="min-h-[300px] p-4 border rounded-lg prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{formData.content}</ReactMarkdown>
                </div>
              </Tab>
            </Tabs>
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
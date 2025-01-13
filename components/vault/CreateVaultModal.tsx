'use client';

import { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from '@nextui-org/react';
import { HexColorPicker } from 'react-colorful';
import { SidebarIcons } from '@/lib/constants/icons';
import { CreateVaultDTO, createVaultSchema } from '@/schemas/vault';
import { createVault } from '@/services/vault';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface CreateVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateVaultModal({ isOpen, onClose, onSuccess }: CreateVaultModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CreateVaultDTO>({
    name: '',
    color: '#000000',
    icon: SidebarIcons[0].id,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = createVaultSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0].toString()] = issue.message;
        });
        setErrors(formattedErrors);
        toast.error('Please check the form for errors');
        return;
      }
      await createVault(result.data);
      toast.success('Vault created successfully!');
      onSuccess();
      onClose();
    } catch {
      toast.error('Failed to create vault');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur" 
      placement="center"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Create new vault</h2>
            <p className="text-sm text-default-500">Configure your new secure storage space</p>
          </ModalHeader>
          
          <ModalBody className="gap-4">
            <div className="space-y-1">
              <Input
                label="Vault Name"
                placeholder="Enter vault name..."
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                errorMessage={errors.name}
                isInvalid={!!errors.name}
                className="w-full"
              />
            </div>
            <div className="flex gap-4 items-start p-4 rounded-lg">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HexColorPicker
                  color={formData.color}
                  onChange={(color) =>
                    setFormData((prev) => ({ ...prev, color }))
                  }
                />
              </motion.div>
              
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-medium">Color Preview</label>
                <Input
                  value={formData.color}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-full"
                  placeholder="#000000"
                  startContent={
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: formData.color }}
                    />
                  }
                />
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Preset Colors</label>
                  <div className="grid grid-cols-5 gap-5">
                    {[
                      '#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#33FFF6',
                      '#FFB533', '#FF3333', '#33FF33', '#3333FF', '#F633FF'
                    ].map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-white transition-all"
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData((prev) => ({ ...prev, color }))}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Icon</label>
              <div className="grid grid-cols-6 gap-2 p-2   rounded-lg">
                {SidebarIcons.map((iconData) => {
                  const IconComponent = iconData.icon;
                  return (
                    <motion.div
                      key={iconData.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        isIconOnly
                        variant={formData.icon === iconData.id ? 'solid' : 'light'}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, icon: iconData.id }))
                        }
                        className="aspect-square w-full transition-all duration-200"
                        style={{
                          color: formData.icon === iconData.id ? 'white' : formData.color,
                          backgroundColor: formData.icon === iconData.id ? formData.color : 'transparent',
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="light"
              onPress={onClose}
              className="font-medium"
            >
              Cancel
            </Button>
            <Button 
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="font-medium"
            >
              Create Vault
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

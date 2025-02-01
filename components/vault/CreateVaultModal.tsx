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
import { useTheme } from 'next-themes';
interface CreateVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateVaultModal({ isOpen, onClose, onSuccess }: CreateVaultModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useTheme()
  const [formData, setFormData] = useState<CreateVaultDTO>({
    name: '',
    color: theme === 'dark' ? '#ffffff' : '#000000',
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
      <ModalContent className="max-w-2xl bg-background backdrop-blur-sm rounded-lg border border-default-200">
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create new vault
            </h2>
            <p className="text-sm text-default-500">Configure your new secure storage space</p>
          </ModalHeader>
          <ModalBody className="gap-6 py-6">
            <div className="space-y-2">
              <Input
                label="Vault Name"
                placeholder="Enter vault name..."
                variant="bordered"
                radius="lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                errorMessage={errors.name}
                isInvalid={!!errors.name}
                className="w-full"
                startContent={
                  <div className="text-default-400">
                    {(() => {
                      const IconComponent = SidebarIcons.find(icon => icon.id === formData.icon)?.icon;
                      return IconComponent ? <IconComponent className="w-4 h-4" style={{ color: formData.color }} /> : null;
                    })()}
                  </div>
                }
              />
            </div>
            <div className="flex gap-6 items-start p-4 rounded-xl bg-transparent border border-default-200 backdrop-blur-sm">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="shadow-lg rounded-lg overflow-hidden"
              >
                <HexColorPicker
                  color={formData.color}
                  onChange={(color) =>
                    setFormData((prev) => ({ ...prev, color }))
                  }
                />
              </motion.div>
              
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="text-sm font-medium mb-2 block">Color Preview</label>
                  <Input
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="w-full"
                    placeholder="#000000"
                    startContent={
                      <div 
                        className="w-5 h-5 rounded-full ring-2 ring-offset-2 ring-default-200" 
                        style={{ backgroundColor: formData.color }}
                      />
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-3 block">Preset Colors</label>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      '#FF5733', '#33FF57', '#3357FF', '#FF33F6', '#33FFF6',
                      '#FFB533', '#FF3333', '#33FF33', '#3333FF', '#F633FF'
                    ].map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-offset-2 ring-default-200 hover:ring-primary transition-all duration-200"
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData((prev) => ({ ...prev, color }))}
                        type="button"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Choose Icon</label>
              <div className="grid grid-cols-6 gap-3 p-4 rounded-xl bg-transparent border border-default-200 backdrop-blur-sm">
                {SidebarIcons.map((iconData) => {
                  const IconComponent = iconData.icon;
                  return (
                    <motion.div
                      key={iconData.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        isIconOnly
                        variant={formData.icon === iconData.id ? 'shadow' : 'ghost'}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, icon: iconData.id }))
                        }
                        className="aspect-square w-full transition-all duration-300"
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

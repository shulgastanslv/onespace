import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { CreateVaultDTO } from "../../types/vault";
import { HexColorPicker } from "react-colorful";
import { AVAILABLE_ICONS } from "@/constants/icons";

interface CreateVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVaultDTO) => Promise<void>;
  isLoading: boolean;
}

export function CreateVaultModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: CreateVaultModalProps) {
    
  const [formData, setFormData] = useState<CreateVaultDTO>({
    name: "",
    color: "#000000",
    icon: AVAILABLE_ICONS[0].id,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Create new vault</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <div className="flex gap-4 items-start">
              <HexColorPicker
                color={formData.color}
                onChange={(color) => setFormData((prev) => ({ ...prev, color: color }))}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm">Color (HEX)</label>
                <Input 
                  value={formData.color}
                  onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {AVAILABLE_ICONS.map((iconData) => {
                  const IconComponent = iconData.icon;
                  return (
                    <Button
                      key={iconData.id}
                      isIconOnly
                      variant={formData.icon === iconData.id ? "solid" : "light"}
                      onClick={() => setFormData(prev => ({ ...prev, icon: iconData.id }))}
                      className="aspect-square"
                      style={{ 
                        color: formData.icon === iconData.id ? 'white' : formData.color,
                        backgroundColor: formData.icon === iconData.id ? formData.color : 'transparent'
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Button>
                  );
                })}
              </div>
            </div>
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

"use client";
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  MoreVerticalIcon,
  PlusIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { CreateVaultModal } from "./vault/CreateVaultModal";
import { CreateVaultDTO } from "@/types/vault";
import { useVaults } from "@/hooks/useVaults";
import { getIconById } from "@/constants/icons";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { vaults, isLoading, createVault, deleteVault } = useVaults();

  const handleCreateVault = async (data: CreateVaultDTO) => {
    await createVault(data);
    setIsCreateModalOpen(false);
  };

  const handleDeleteVault = async (id: string) => {
    await deleteVault(id);
  };

  return (
    <>
      <CreateVaultModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateVault}
        isLoading={isLoading}
      />
      <motion.div
        className={`${
          isExpanded ? "w-72" : "w-20"
        } min-h-screen  shadow-xl border-r border-gray-200 flex flex-col`}
        animate={{ width: isExpanded ? 288 : 80 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          variant="light"
          isIconOnly
          className="absolute -right-3 top-6 bg-white shadow-md hover:shadow-lg z-50 rounded-full w-6 h-6"
        >
          {isExpanded ? (
            <ChevronLeftIcon size={14} />
          ) : (
            <ChevronRightIcon size={14} />
          )}
        </Button>
        <div className="flex-1 p-4">
          <div className={`relative mb-6 ${!isExpanded && "hidden"}`}>
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg text-sm border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {isExpanded && (
                <h2 className="text-sm font-medium text-gray-500">Vaults</h2>
              )}
              <Button
                size="sm"
                variant="light"
                isIconOnly
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusIcon size={16} />
              </Button>
            </div>
            {vaults.map((vault) => (
              <div
                key={vault.id}
                className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  {vault.icon && (
                    <span className={!isExpanded ? "mx-auto" : ""}>
                      {(() => {
                        const Icon = getIconById(vault.icon);
                        return Icon ? (
                          <Icon size={16} style={{ color: vault.color }} />
                        ) : null;
                      })()}
                    </span>
                  )}
                  {isExpanded && (
                    <>
                      <span className="text-sm">{vault.name}</span>
                      <span className="text-xs text-gray-500">
                        ({vault.count})
                      </span>
                    </>
                  )}
                </div>
                {isExpanded && (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVerticalIcon size={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="rename">Rename</DropdownItem>
                      <DropdownItem key="share">Share</DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => handleDeleteVault(vault.id)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

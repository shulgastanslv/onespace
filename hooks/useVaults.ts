import { useState, useCallback } from "react";
import { Vault, CreateVaultDTO } from "../types/vault";

export const useVaults = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteVault = useCallback(async (id: string) => {
    setVaults((prev) => prev.filter((vault) => vault.id !== id));
  }, []);

  const createVault = useCallback(async (data: CreateVaultDTO) => {
    setIsLoading(true);
    setError(null);
    const newVault: Vault = {
      id: crypto.randomUUID(),
      ...data,
      count: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setVaults((prev) => [...prev, newVault]);
    setIsLoading(false);
    return newVault;
  }, []);

  return {
    vaults,
    isLoading,
    error,
    deleteVault,
    createVault,
  };
};

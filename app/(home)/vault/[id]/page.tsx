import { VaultView } from '@/components/vault/VaultView';

interface VaultPageProps {
  params: {
    id: string;
  };
}

export default async function VaultPage({ params }: VaultPageProps) {
  return <VaultView vaultId={params.id} />;
} 
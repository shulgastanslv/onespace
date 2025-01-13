'use client';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Select vault</h1>
      <div className="flex flex-col gap-6">
        <VaultCard 
          title="Create new vault"
          isCreateCard
          onClick={() => console.log('Create new vault')}
        />
      </div>
    </div>
  );
}

interface VaultCardProps {
  title: string;
  description?: string;
  isCreateCard?: boolean;
  onClick: () => void;
}

function VaultCard({ title, description, isCreateCard, onClick }: VaultCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg
        ${isCreateCard ? 'bg-blue-50 border-2 border-dashed border-blue-300' : 'bg-white'}`}
    >
      <div className="flex flex-col items-center text-center">
        {isCreateCard ? (
          <PlusIcon className="w-12 h-12 text-blue-500 mb-4" />
        ) : (
          <FolderIcon className="w-12 h-12 text-gray-500 mb-4" />
        )}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </button>
  );
}

// Простые иконки для примера
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  );
}
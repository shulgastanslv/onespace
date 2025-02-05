'use client';

import { Search } from 'lucide-react';
import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchCategory = 'notes' | 'vaults' | 'all';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
  icon?: string;
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'React Hooks',
      description: 'React Hooks are a way to add state and other features to functional components...',
      category: 'notes',
      url: '/notes/react-hooks',
      icon: '📝',
    },
    {
      id: '3',
      title: 'Project Docs',
      description: 'Project documentation for the project...',
      category: 'vaults',
      url: '/storage/files/project-docs',
      icon: '📁',
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.length > 0) {
      router.push(`/search?q=${searchQuery}&category=${activeCategory}`);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        variant="bordered"
        radius="lg"
        classNames={{
          input: 'text-sm',
          inputWrapper: 'bg-background/50',
        }}
        endContent={<Search className="h-4 w-4 text-gray-400" />}
      />
      {showResults && (
        <div className="absolute top-full mt-1 w-full bg-background backdrop-blur-md rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-2 space-y-2">
            <div className="flex gap-2 text-sm">
              {['all', 'notes', 'vaults'].map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant="light"
                  className="text-xs border border-gray-200"
                  onClick={() => setActiveCategory(category as SearchCategory)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {mockResults
                .filter(
                  (result) =>
                    activeCategory === 'all' ||
                    result.category === activeCategory,
                )
                .map((result) => (
                  <div
                    key={result.id}
                    onClick={() => router.push(result.url)}
                    className="flex items-start gap-3 p-2 hover:bg-slate-50 dark:hover:bg-white/10 rounded-lg cursor-pointer"
                  >
                    <span className="text-xl">{result.icon}</span>
                    <div>
                      <h4 className="text-sm font-medium">{result.title}</h4>
                      <p className="text-xs text-gray-500">
                        {result.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

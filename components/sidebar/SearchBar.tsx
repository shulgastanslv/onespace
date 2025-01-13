"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@nextui-org/react";

interface SearchBarProps {
  isExpanded: boolean;
  search: string;
  onSearch: (search: string) => void;
}

export function SearchBar({ isExpanded, search, onSearch }: SearchBarProps) {
  if (!isExpanded) return null;
  
  return (
    <div className="mb-6">
      <Input
        classNames={{
          base: "max-w-full",
          mainWrapper: "h-10",
          input: "text-sm",
        }}
        radius="lg"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search items..."
        startContent={
          <SearchIcon className="text-default-400 w-4 h-4 ёflex-shrink-0" />
        }
      />
    </div>
  );
} 
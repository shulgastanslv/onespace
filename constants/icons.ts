import { 
  Folder, Home, Star, Heart, Bookmark, 
  Box, Archive, Database, Grid, Layers,
  Briefcase, Code, Coffee, Compass, Crown,
  Flag, Gift, Image, Key, Music,
  LucideIcon,
} from "lucide-react";

export interface IconData {
  id: string;
  icon: LucideIcon;
  label: string;
}

export const AVAILABLE_ICONS: IconData[] = [
  { id: 'folder', icon: Folder, label: 'Folder' },
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'star', icon: Star, label: 'Star' },
  { id: 'heart', icon: Heart, label: 'Heart' },
  { id: 'bookmark', icon: Bookmark, label: 'Bookmark' },
  { id: 'box', icon: Box, label: 'Box' },
  { id: 'archive', icon: Archive, label: 'Archive' },
  { id: 'database', icon: Database, label: 'Database' },
  { id: 'grid', icon: Grid, label: 'Grid' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'briefcase', icon: Briefcase, label: 'Briefcase' },
  { id: 'code', icon: Code, label: 'Code' },
  { id: 'coffee', icon: Coffee, label: 'Coffee' },
  { id: 'compass', icon: Compass, label: 'Compass' },
  { id: 'crown', icon: Crown, label: 'Crown' },
  { id: 'flag', icon: Flag, label: 'Flag' },
  { id: 'gift', icon: Gift, label: 'Gift' },
  { id: 'image', icon: Image, label: 'Image' },
  { id: 'key', icon: Key, label: 'Key' },
  { id: 'music', icon: Music, label: 'Music' },
];

export const getIconById = (id: string | null): LucideIcon | undefined => {
  return AVAILABLE_ICONS.find(icon => icon.id === id)?.icon;
}; 
import {
  Folder,
  Home,
  Star,
  Heart,
  Bookmark,
  Box,
  Archive,
  Database,
  Grid,
  Layers,
  Briefcase,
  Code,
  Coffee,
  Compass,
  Crown,
  Flag,
  Gift,
  Image,
  Key,
  Music,
  LucideIcon,
  TrashIcon,
  Lock,
  MessageCircle,
  Settings,
} from 'lucide-react';

export interface IconData {
  id: string;
  icon: LucideIcon;
}

export const SidebarIcons: IconData[] = [
  { id: 'folder', icon: Folder },
  { id: 'home', icon: Home },
  { id: 'star', icon: Star },
  { id: 'heart', icon: Heart },
  { id: 'bookmark', icon: Bookmark },
  { id: 'box', icon: Box },
  { id: 'archive', icon: Archive },
  { id: 'database', icon: Database },
  { id: 'grid', icon: Grid },
  { id: 'layers', icon: Layers },
  { id: 'briefcase', icon: Briefcase },
  { id: 'code', icon: Code },
  { id: 'coffee', icon: Coffee },
  { id: 'compass', icon: Compass },
  { id: 'crown', icon: Crown },
  { id: 'flag', icon: Flag },
  { id: 'gift', icon: Gift },
  { id: 'image', icon: Image },
  { id: 'key', icon: Key },
  { id: 'music', icon: Music },
  { id: 'trash', icon: TrashIcon },
  { id: 'lock', icon: Lock },
  { id: 'feedback', icon: MessageCircle },
  { id: 'settings', icon: Settings },
  { id: 'advanced', icon: Settings },
];

export const getIconById = (id: string): LucideIcon | undefined => {
  return SidebarIcons.find((icon) => icon.id === id)?.icon;
};

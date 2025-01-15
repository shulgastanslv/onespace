'use client';

import { motion } from 'framer-motion';
import { Home, Search, Bell } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';

export function Navbar() {
  return (
    <nav className="w-full h-16 border-b bg-background/70 backdrop-blur-md fixed top-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-start gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Home size={16} />
            <span>Home</span>
          </motion.button>
        </Link>
        <div className="relative flex-1 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-sm border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}

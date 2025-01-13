'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-[calc(100%-288px)] h-14 border-b bg-background/70 shadow-md backdrop-blur-md fixed top-0 right-0 z-50"
    >
      <div className="flex items-center justify-between h-full px-6">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Home size={14} />
            <span>Home</span>
          </motion.button>
        </Link>
        <div className="flex items-center gap-4 px-4">
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from "framer-motion";

export interface OverviewProps {
  vaults: number;
  notes: number;
  hoursActive: number;
  storageUsed: number;
  maxStorage: number;
  vaultToday: number;
  notesToday: number;
  hoursToday: number;
}

export function Overview({ vaults, notes, hoursActive, storageUsed, maxStorage, vaultToday, notesToday, hoursToday }: OverviewProps) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="col-span-full p-6 rounded-xl bg-white/5 dark:bg-background backdrop-blur-md border border-gray-200 transition-colors hover:border-gray-200 dark:hover:border-gray-300"
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg bg-background border border-gray-200 dark:border-gray-200/10 transition-colors">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total Vaults
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {vaults}
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          ↑ {vaultToday} new
        </p>
      </div>
      <div className="p-4 rounded-lg bg-background border border-gray-200 dark:border-gray-200/10 transition-colors">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total Notes
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {notes}
        </p>
        <p className="text-xs text-green-600 dark:text-green-400">
          ↑ {notesToday} today
        </p>
      </div>
      <div className="p-4 rounded-lg bg-background border border-gray-200 dark:border-gray-200/10 transition-colors">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Hours Active
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {hoursActive}
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          ↑ {hoursToday} today
        </p>
      </div>
      <div className="p-4 rounded-lg bg-background border border-gray-200 dark:border-gray-200/10 transition-colors">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Storage Used
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {storageUsed}%
        </p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400">
          {storageUsed}GB of {maxStorage}GB
        </p>
      </div>
    </div>
  </motion.div>
  );
}
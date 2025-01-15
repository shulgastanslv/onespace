'use client';

import { motion } from 'framer-motion';
import { Home, Search, Bell, X } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from '@nextui-org/react';

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
          <Input
            type="text"
            placeholder="Search..."
            variant="bordered"
            radius="lg"
            classNames={{
              input: 'text-sm',
              inputWrapper: 'bg-background/50',
            }}
            endContent={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <div className="flex items-center gap-4">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button isIconOnly variant="light" className="relative">
                <Bell size={20} />
                <span className="absolute top-1 right-0 m-1 w-2 h-2 bg-danger rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max bg-background border rounded-lg shadow-lg">
              <div className="px-1 py-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold">Notifications</h3>
                  <Button isIconOnly size="sm" variant="light">
                    <X size={16} />
                  </Button>
                </div>
                <div className="space-y-3">
                  {/* {notifications.map((notification) => (
                    <Button
                      key={notification.id}
                      variant="light"
                      className="w-full"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div>
                        <p className="text-sm text-left">
                          {notification.title}
                        </p>
                        <p className="text-xs text-left text-default-600">
                          {notification.message}
                        </p>
                        <span className="text-xs text-default-400">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            },
                          )}
                        </span>
                      </div>
                    </Button>
                  ))} */}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}

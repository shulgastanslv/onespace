'use client';

import { motion } from 'framer-motion';
import { Search, Moon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import { Input } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { BUILD_INFO } from '@/version';

export function Navbar() {

  const router = useRouter();
  const session = useSession();

  const handleSignOut = async () => {
    router.push('/auth/login');
    await signOut();
  };

  return (
    <nav className="w-full h-16 border-b bg-background/70 backdrop-blur-md fixed top-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-5 md:px-5">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span className="font-soyuz text-xl relative flex items-center gap-2">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 dark:bg-white bg-black rounded-full" />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 dark:bg-white bg-black rounded-sm transform rotate-12" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 dark:bg-white bg-black rounded-sm transform -rotate-12" />
                </div>
              </div>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-600 to-fuchsia-500 group-hover:w-full transition-all duration-300"
                animate={{ width: '0%' }}
                whileHover={{ width: '100%' }}
              />
            </span>
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
          <Dropdown
            placement="bottom-end"
            className="bg-background backdrop-blur-md border border-gray-200"
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="focus:outline-none"
                color="default"
                name={session.data?.user?.name}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-label="Your account"
              className="bg-background backdrop-blur-md"
            >
              <DropdownSection title="Account" showDivider>
                <DropdownItem key="profile">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{session.data?.user?.name}</p>
                    <p className="text-sm text-gray-500">{session.data?.user?.email}</p>
                  </div>
                </DropdownItem>
                <DropdownItem
                  key="theme"
                  startContent={<Moon className="w-4 h-4" />}
                >
                  <div className="flex justify-between items-center w-full">
                    <span>Theme</span>
                    <ThemeSwitch />
                  </div>
                </DropdownItem>
                <DropdownItem key="github">
                  <a
                    href="https://github.com/shulgastanslv/onespace"
                    target="_blank"
                    className="flex items-center gap-2"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  color="danger"
                  startContent={<LogOut className="w-4 h-4" />}
                  onClick={handleSignOut}
                >
                  Logout
                </DropdownItem>
                <DropdownItem key="version">{BUILD_INFO.version}</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

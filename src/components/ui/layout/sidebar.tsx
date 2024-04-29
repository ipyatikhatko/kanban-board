'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from 'react-icons/tb';
import { RiLogoutBoxLine, RiSettings2Line } from 'react-icons/ri';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
import SidebarNav from './sidebar-nav';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {}

const COLLAPSED_KEY = 'kanban-board:sidebar-collapsed';

function Sidebar(props: Props) {
  const {} = props;
  const [sidebarInit, setSidebarInit] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    localStorage.setItem(COLLAPSED_KEY, String(!collapsed));
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (!sidebarInit) {
      const sidebarLocalValue =
        JSON.parse(localStorage[COLLAPSED_KEY]) || false;
      setCollapsed(sidebarLocalValue);
      setSidebarInit(true);
    }
  }, [sidebarInit]);

  return (
    <aside
      className={clsx(
        'hidden h-[100vh] flex-col items-center justify-between border-r border-t-0  transition-all dark:bg-slate-900 md:flex',
        collapsed ? 'w-[80px]' : 'w-[250px]'
      )}
    >
      <AnimatePresence>
        <section className='relative w-full'>
          <header
            className={clsx(
              'flex h-16 items-center justify-between border-b px-4 dark:bg-slate-900',
              {
                '!justify-center px-0': collapsed,
              }
            )}
          >
            {!collapsed && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: collapsed ? 0 : 1 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
                className='text-lg font-bold text-slate-700 dark:text-slate-50 lg:text-xl'
              >
                看板 <span className='text-sm font-medium '>kanban</span>
              </motion.h1>
            )}
            <Button onClick={toggleSidebar} variant='ghost' size='icon'>
              {collapsed ? (
                <TbLayoutSidebarRightCollapse
                  size={22}
                  className='text-slate-500'
                />
              ) : (
                <TbLayoutSidebarLeftCollapse
                  size={22}
                  className='text-slate-500'
                />
              )}
            </Button>
          </header>
          <SidebarNav collapsed={collapsed} />
        </section>
        <div
          className={clsx('flex gap-2 pb-4', {
            'flex-col': collapsed,
          })}
        >
          <Button variant='outline' size='icon'>
            <RiSettings2Line />
          </Button>
          <Button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            variant='secondary'
            size={collapsed ? 'icon' : 'default'}
          >
            <RiLogoutBoxLine />
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </AnimatePresence>
    </aside>
  );
}

export default Sidebar;

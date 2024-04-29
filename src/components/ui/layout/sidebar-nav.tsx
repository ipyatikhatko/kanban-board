'use client';
import React, { ReactNode } from 'react';
import {
  RiCalendarCheckLine,
  RiDashboardLine,
  RiFolder5Line,
  RiListCheck2,
  RiTableFill,
  RiTeamFill,
} from 'react-icons/ri';
import SidebarNavItem from './sidebar-nav-item';
import { usePathname } from 'next/navigation';

interface Props {
  collapsed: boolean;
}

function SidebarNav(props: Props) {
  const { collapsed } = props;
  const pathname = usePathname();

  return (
    <nav className='mt-12 w-full'>
      <ul className='flex w-full flex-col gap-2 px-2'>
        <SidebarNavItem
          collapsed={collapsed}
          icon={RiDashboardLine}
          label='dashboard'
          active={pathname === '/dashboard'}
          href={'/dashboard'}
        />
        <SidebarNavItem
          collapsed={collapsed}
          icon={RiTableFill}
          label='boards'
          active={pathname === '/boards'}
          href={'/boards'}
        />
        <SidebarNavItem
          collapsed={collapsed}
          icon={RiListCheck2}
          label='tasks'
          active={pathname === '/tasks'}
          href={'/tasks'}
        />
        <SidebarNavItem
          collapsed={collapsed}
          icon={RiTeamFill}
          label='team'
          active={pathname === '/team'}
          href={'/team'}
        />
      </ul>
    </nav>
  );
}

export default SidebarNav;

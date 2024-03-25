import React from 'react';
import SidebarNavItem from '@/components/layout/sidebar-nav-item';
import { usePathname } from 'next/navigation';
import {
  RiDashboardLine,
  RiListCheck2,
  RiTableFill,
  RiTeamFill,
} from 'react-icons/ri';

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-around border-t p-2 md:hidden'>
      <SidebarNavItem
        mobile
        icon={RiDashboardLine}
        label='dashboard'
        active={pathname === '/dashboard'}
        href={'/dashboard'}
      />
      <SidebarNavItem
        mobile
        icon={RiTableFill}
        label='boards'
        active={pathname === '/boards'}
        href={'/boards'}
      />
      <SidebarNavItem
        mobile
        icon={RiListCheck2}
        label='tasks'
        active={pathname === '/tasks'}
        href={'/tasks'}
      />
      <SidebarNavItem
        mobile
        icon={RiTeamFill}
        label='team'
        active={pathname === '/team'}
        href={'/team'}
      />
    </nav>
  );
}

export default MobileNav;

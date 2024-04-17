'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useSession, signOut } from 'next-auth/react';
import clsx from 'clsx';

export default function HeaderProfile() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='group flex items-center gap-4 outline-none'>
        <Avatar className='h-8 w-8 group-hover:shadow radix-state-open:shadow'>
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback className='bg-gradient-to-tr from-slate-600 to-slate-200'></AvatarFallback>
        </Avatar>
        <span className='hidden lg:inline'>
          {session?.user?.name || session?.user?.email}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-radix-dropdown-menu-trigger'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem disabled>Billing</DropdownMenuItem>
        <DropdownMenuItem disabled>Team</DropdownMenuItem>
        <DropdownMenuItem disabled>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <RiLogoutBoxLine />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

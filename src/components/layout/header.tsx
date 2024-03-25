import React from 'react';
import HeaderProfile from '@/components/layout/header-profile';
import { RiSearch2Line } from 'react-icons/ri';

interface Props {}

function Header(props: Props) {
  const {} = props;

  return (
    <header className='flex h-16 border-x  border-b border-l-0 px-4'>
      <div className='flex flex-1 items-center gap-4'>
        <div className='flex h-full items-center gap-2 px-2'>
          <RiSearch2Line size={20} className='text-slate-400' />
          <input
            type='text'
            className='h-full w-[20vw] min-w-[200px] outline-none'
            placeholder='Search tasks, projects or people...'
          />
        </div>
      </div>
      <HeaderProfile />
    </header>
  );
}

export default Header;

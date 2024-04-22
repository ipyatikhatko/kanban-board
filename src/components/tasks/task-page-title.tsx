'use client';

import { updateTask } from '@/lib/api/tasks';
import prisma from '@/lib/prisma';
import { useState, useTransition } from 'react';
import { RiLoader5Fill, RiPencilFill } from 'react-icons/ri';

interface Props {
  title: string;
  taskId: number;
}

export default function TaskPageTitle(props: Props) {
  const { title, taskId } = props;
  const [value, setValue] = useState(title);
  const [loading, startTransition] = useTransition();

  const handleUpdateTitleOnBlur = async () => {
    // check if title is actually changed
    if (title === value.trim()) {
      return;
    }

    startTransition(() => {
      updateTask(taskId, { title: value });
    });
  };

  return (
    <div className='relative flex w-2/3 items-start gap-2 pt-4'>
      <input
        aria-disabled={loading}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleUpdateTitleOnBlur}
        className='w-full cursor-pointer rounded bg-transparent p-2 py-1 text-3xl font-bold text-slate-600 outline-none hover:bg-slate-100 focus-visible:bg-slate-100 aria-disabled:opacity-60'
      />
      {loading && (
        <RiLoader5Fill
          size={25}
          className='absolute -right-6 top-4 animate-spin text-slate-400'
        />
      )}
    </div>
  );
}

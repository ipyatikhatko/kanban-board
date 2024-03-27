import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { RiDeleteBinFill, RiEdit2Fill, RiSettings4Fill } from 'react-icons/ri';
import clsx from 'clsx';
import { getUserBoards } from '@/lib/api/boards';
import DeleteBoardButton from './delete-board';
import { removeBoard } from '@/actions/boards.actions';

async function BoardsList() {
  const boards = await getUserBoards();
  return (
    <>
      {!!boards.length ? (
        <ul className='flex flex-col gap-2'>
          {boards.map(({ id, name, description }) => (
            <li
              key={id}
              className='group flex cursor-pointer overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-colors hover:border-slate-200'
            >
              <Link
                className='flex-1 p-4 hover:bg-slate-100'
                href={`/boards/${id}`}
              >
                <h2 className='text-2xl'>{name}</h2>
                <p
                  className={clsx('line-clamp-2', {
                    'italic text-slate-400': !description,
                  })}
                >
                  {description || 'No description'}
                </p>
              </Link>
              <div className='flex items-center gap-4 border-l p-4'>
                <Link href={`/boards/${id}/edit`}>
                  <Button variant='outline' size='icon'>
                    <RiSettings4Fill />
                  </Button>
                </Link>
                <DeleteBoardButton action={removeBoard} boardId={id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='grid h-[50vh] place-content-center'>
          <h3 className='text-2xl font-bold text-slate-300 lg:text-4xl'>
            You don&apos;t have boards.
          </h3>
        </div>
      )}
    </>
  );
}

const BoardSkeletonItem = () => (
  <li className='flex rounded-lg border border-transparent bg-slate-100 p-4 shadow-sm'>
    <div className='flex-1'>
      <div className='mb-2 h-8 w-1/4 rounded-lg bg-slate-200' />
      <div className='h-4 w-1/3 rounded-lg bg-slate-200' />
    </div>
    <div className='flex items-center gap-4'>
      <div className='h-10 w-10 rounded-lg bg-slate-200' />
      <div className='h-10 w-10 rounded-lg bg-slate-200' />
    </div>
  </li>
);

export const BoardsListSkeleton = () => {
  return (
    <ul className='flex animate-pulse flex-col gap-2 text-transparent'>
      <BoardSkeletonItem />
      <BoardSkeletonItem />
      <BoardSkeletonItem />
      <BoardSkeletonItem />
    </ul>
  );
};

export default BoardsList;

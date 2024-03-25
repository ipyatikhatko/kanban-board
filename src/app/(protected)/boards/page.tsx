import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import clsx from 'clsx';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const getUserBoards = async () => {
  unstable_noStore();
  const session = await auth();
  if (!session?.user.id) {
    throw new Error('Unauthenticated');
  }

  try {
    const boards = await prisma.kanbanBoard.findMany({
      where: {
        ownerId: {
          equals: session.user.id,
        },
      },
    });

    return boards;
  } catch (error) {
    throw new Error('Database Error');
  }
};

export default async function BoardsPage() {
  const boards = await getUserBoards();
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-slate-700'>Boards</h1>
        <Link href='/boards/create'>
          <Button>Create board</Button>
        </Link>
      </div>
      <hr className='my-4' />
      <ul className='flex flex-col gap-2'>
        {boards.map(({ id, name, description }) => (
          <Link key={id} href={`/boards/${id}`}>
            <li className='cursor-pointer rounded-lg border border-transparent bg-white p-2 shadow-sm transition-colors hover:border-slate-300'>
              <h2 className='text-xl'>{name}</h2>
              <p
                className={clsx('line-clamp-2', {
                  'italic text-slate-500': !description,
                })}
              >
                {description || 'No description'}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

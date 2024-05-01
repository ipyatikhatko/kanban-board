import BoardsList, {
  BoardsListSkeleton,
} from '@/components/boards/boards-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { RiAddLine } from 'react-icons/ri';

export default async function BoardsPage() {
  return (
    <section className='pr-2 pt-4 lg:pr-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-slate-600 dark:text-slate-400'>
          Boards
        </h1>
        <Link href='/boards/create'>
          <Button>Create board</Button>
        </Link>
      </div>
      <div className=''>
        <Suspense fallback={<BoardsListSkeleton />}>
          <BoardsList />
        </Suspense>
      </div>
    </section>
  );
}

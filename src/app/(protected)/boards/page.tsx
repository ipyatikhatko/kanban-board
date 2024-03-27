import BoardsList, {
  BoardsListSkeleton,
} from '@/components/boards/boards-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function BoardsPage() {
  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-slate-700'>Boards</h1>
        <Link href='/boards/create'>
          <Button>Create board</Button>
        </Link>
      </div>
      <Suspense fallback={<BoardsListSkeleton />}>
        <BoardsList />
      </Suspense>
    </>
  );
}

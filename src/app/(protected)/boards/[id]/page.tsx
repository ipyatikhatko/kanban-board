import BoardHeaderInfo from '@/components/boards/board-header-info';
import KanbanBoard from '@/components/boards/kanban-board';
import { getUserBoardById } from '@/lib/api/boards';
import { redirect } from 'next/dist/server/api-utils';
import { notFound } from 'next/navigation';
import { DropResult } from 'react-beautiful-dnd';

interface BoardPageProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
}

export default async function BoardPage({ params: { id } }: BoardPageProps) {
  const board = await getUserBoardById(parseInt(id), {
    columns: { include: { tasks: true } },
  });

  if (!board) {
    notFound();
  }

  const { name, description, createdAt } = board;

  const handleDragEnd = async (result: DropResult) => {
    'use server';
    console.log(result);
  };

  return (
    <>
      <BoardHeaderInfo
        name={name}
        description={description}
        createdAt={createdAt}
      />
      <KanbanBoard board={board} onDragEnd={handleDragEnd} />
    </>
  );
}

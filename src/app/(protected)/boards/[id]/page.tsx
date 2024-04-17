import { updateKanbanBoardFromDropResult } from '@/actions/kanban.actions';
import BoardHeaderInfo from '@/components/boards/board-header-info';
import KanbanBoard from '@/components/boards/kanban-board';
import { getUserBoardById } from '@/lib/api/boards';
import { revalidatePath } from 'next/cache';
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
    columns: { include: { tasks: { orderBy: { orderIndex: 'asc' } } } },
  });

  if (!board) {
    notFound();
  }

  const { name, description, createdAt } = board;

  return (
    <>
      <BoardHeaderInfo
        name={name}
        description={description}
        createdAt={createdAt}
      />
      <KanbanBoard board={board} />
    </>
  );
}

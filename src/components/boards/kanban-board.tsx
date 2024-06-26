'use client';

import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

import React, { useState, useTransition } from 'react';
import {
  KanbanBoard as KanbanBoardType,
  Column as ColumnType,
  Task as TaskType,
} from '@prisma/client';
import { RiInsertColumnRight, RiLoader5Fill } from 'react-icons/ri';
import CreateColumnDialog from '../columns/create-column-dialog';
import CreateTaskDialog from '../tasks/create-task-dialog';
import { DropResult } from 'react-beautiful-dnd';
import KanbanBoardColumn from './kanban-board-column';
import { updateKanbanBoardFromDropResult } from '@/actions/kanban.actions';

export interface ColumnWithTasks extends ColumnType {
  tasks: TaskType[];
}

export interface BoardWithColumns extends KanbanBoardType {
  columns: ColumnWithTasks[];
}

interface KanbanBoardProps {
  board: BoardWithColumns;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
  const [createColumnDialog, setCreateColumnDialog] = useState(false);
  const [isPending, startTransition] = useTransition();
  // Store columnId in createTask to use it in modal action and as modal open state
  const [createTask, setCreateTask] = useState<ColumnType['id'] | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    startTransition(() => {
      updateKanbanBoardFromDropResult(board.id, result);
    });
  };

  const onAddColumn = () => setCreateColumnDialog(true);
  const onCreateTask = (columnId: number) => setCreateTask(columnId);

  return (
    <section className='relative mt-4 flex snap-x snap-mandatory gap-2 divide-x divide-slate-300/50 overflow-auto rounded bg-slate-200/50 pb-2 pr-2 pt-2 shadow-inner dark:divide-slate-600/60 dark:bg-slate-700'>
      {isPending && (
        <div className='absolute bottom-0 left-0 top-0 flex w-full items-center justify-center bg-slate-300/40 backdrop-blur-[1px]'>
          <RiLoader5Fill
            size={30}
            className='animate-spin text-slate-500 dark:text-slate-50'
          />
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        {board.columns.map((column) => (
          <KanbanBoardColumn
            isDragDisabled={isPending}
            key={column.id}
            column={column}
            onCreateTask={onCreateTask}
          />
        ))}
        <div
          onClick={onAddColumn}
          className='group ml-2 grid min-w-40 cursor-pointer place-content-center rounded-lg bg-slate-50 dark:bg-slate-600'
        >
          <span className='inline-flex flex-col items-center text-sm text-slate-400 group-hover:text-slate-500'>
            <RiInsertColumnRight size={25} />
            Add column
          </span>
        </div>
      </DragDropContext>
      {/* Dialogs */}
      <CreateColumnDialog
        boardId={board.id}
        open={createColumnDialog}
        onOpenChange={setCreateColumnDialog}
      />
      {!!board.columns.length && (
        <CreateTaskDialog
          open={!!createTask}
          columns={board.columns}
          columnId={createTask}
          onOpenChange={() => setCreateTask(null)}
        />
      )}
    </section>
  );
};

export default KanbanBoard;

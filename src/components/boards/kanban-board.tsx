'use client';

import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

import React, { useCallback, useState } from 'react';
import {
  KanbanBoard as KanbanBoardType,
  Column as ColumnType,
  Task as TaskType,
} from '@prisma/client';
import { RiAddFill, RiInsertColumnRight } from 'react-icons/ri';
import { Button } from '../ui/button';
import CreateColumnDialog from '../columns/create-column-dialog';
import CreateTaskDialog from '../tasks/create-task-dialog';
import clsx from 'clsx';
import { DropResult } from 'react-beautiful-dnd';

export interface ColumnWithTasks extends ColumnType {
  tasks: TaskType[];
}

export interface BoardWithColumns extends KanbanBoardType {
  columns: ColumnWithTasks[];
}

interface KanbanBoardProps {
  board: BoardWithColumns;
  onDragEnd: (result: DropResult) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board, onDragEnd }) => {
  const [createColumnDialog, setCreateColumnDialog] = useState(false);
  // Store columnId in createTask to use it in modal action and as modal open state
  const [createTask, setCreateTask] = useState<ColumnType['id'] | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    onDragEnd(result);
  };

  const onAddColumn = () => setCreateColumnDialog(true);

  return (
    <section className='mt-4 flex gap-2 rounded-lg bg-slate-100 p-2 shadow-sm'>
      <DragDropContext onDragEnd={handleDragEnd}>
        {board.columns.map((column) => (
          <div className='flex w-60 flex-col' key={column.id}>
            <div className='pb-2'>
              <h3 className='text-lg font-bold text-slate-500'>
                {column.name}
              </h3>
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <Droppable droppableId={String(column.id)} type='TASK'>
                {(provided, snapshot) => (
                  <div
                    className='flex h-[60vh] flex-col overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-inner'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.tasks.map((task, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index + 1} //beacause they start from 1 in db
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={clsx(
                              'mb-2 rounded-md border border-slate-100 bg-white py-2 shadow-sm',
                              {
                                'border-slate-300': snapshot.isDragging,
                              }
                            )}
                          >
                            <h1 className='px-2 font-semibold text-slate-600'>
                              {task.title}
                            </h1>
                            <hr className='my-1 h-px border-0 bg-slate-100' />
                            <p
                              className={clsx(
                                'line-clamp-3 overflow-hidden px-2 text-sm text-slate-500',
                                {
                                  'italic !text-slate-400': !task.description,
                                }
                              )}
                            >
                              {task.description || 'No description'}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <Button
              onClick={() => setCreateTask(column.id)}
              className='mt-4 flex w-full gap-1'
              variant='secondary'
            >
              <RiAddFill size={25} />
            </Button>
          </div>
        ))}
        <div
          onClick={onAddColumn}
          className='group grid w-40 cursor-pointer place-content-center rounded-lg border border-slate-200 bg-slate-50 shadow-inner hover:shadow-sm'
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
      <CreateTaskDialog
        open={!!createTask}
        columns={board.columns}
        columnId={createTask}
        onOpenChange={() => setCreateTask(null)}
      />
    </section>
  );
};

export default KanbanBoard;

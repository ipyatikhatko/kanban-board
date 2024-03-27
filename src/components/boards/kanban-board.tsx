'use client';

import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  KanbanBoard as KanbanBoardType,
  Column as ColumnType,
  Task as TaskType,
} from '@prisma/client';
import { RiAddFill, RiInsertRowTop, RiInsertColumnRight } from 'react-icons/ri';
import { Button } from '../ui/button';
import CreateColumnDialog from '../columns/create-column-dialog';
import CreateTaskDialog from '../tasks/create-task-dialog';
import clsx from 'clsx';

interface ColumnWithTasks extends ColumnType {
  tasks: TaskType[];
}

interface BoardWithColumns extends KanbanBoardType {
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
    onDragEnd(result);
  };

  const onAddColumn = () => setCreateColumnDialog(true);

  return (
    <section className='mt-4 flex h-[70vh] gap-2 divide-x divide-slate-200 rounded-lg border border-slate-200 bg-white p-2 shadow-inner '>
      <DragDropContext onDragEnd={handleDragEnd}>
        {board.columns.map((column) => (
          <div
            className='flex h-full w-60 flex-col pl-2 first:pl-0'
            key={column.id}
          >
            <div className='rounded-lg p-2'>
              <h3 className='text-lg font-bold text-slate-500'>
                {column.name}
              </h3>
            </div>
            <hr className='mb-2 h-px border-0 bg-slate-200' />
            <div className='flex flex-1 flex-col gap-2'>
              <Droppable droppableId={String(column.id)} type='TASK'>
                {(provided) => (
                  <div
                    className='flex h-full flex-col gap-2'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {column.tasks.map((task, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={clsx(
                              'rounded-md border bg-gray-50 py-2 shadow-sm',
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
          className='group grid h-full w-40 cursor-pointer place-content-center rounded-lg !border border-slate-200 bg-slate-50 shadow-inner hover:shadow-sm'
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

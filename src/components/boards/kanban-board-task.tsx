'use client';
import { Task } from '@prisma/client';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

interface Props {
  boardId: number;
  index: number;
  task: Task;
  isDragDisabled: boolean;
}

function KanbanBoardTask(props: Props) {
  const { task, index, boardId, isDragDisabled } = props;
  const router = useRouter();

  return (
    <Draggable
      isDragDisabled={isDragDisabled}
      key={task.id}
      draggableId={String(task.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          onClick={() => router.push(`/tasks/${task.id}`)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'mb-2 !cursor-pointer rounded border border-white bg-white py-1 shadow-sm hover:border-slate-200 hover:shadow-md dark:border-slate-500 dark:bg-slate-500 dark:hover:border-slate-400',
            {
              'border-slate-300 !shadow-md': snapshot.isDragging,
            }
          )}
        >
          <h1 className='px-2 font-semibold text-slate-600 dark:text-slate-200'>
            {task.title}
          </h1>
          <hr className='mb-1 h-px border-0 bg-slate-100 dark:bg-slate-400/20' />
          <p
            className={clsx(
              'line-clamp-3 overflow-hidden px-2 text-sm text-slate-500 dark:text-slate-400',
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
  );
}

export default KanbanBoardTask;

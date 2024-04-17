import { Task } from '@prisma/client';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React from 'react';

const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

interface Props {
  index: number;
  task: Task;
  isDragDisabled: boolean;
}

function KanbanBoardTask(props: Props) {
  const { task, index, isDragDisabled } = props;

  return (
    <Draggable
      isDragDisabled={isDragDisabled}
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
            'mb-2 rounded border border-slate-100 bg-white py-2 shadow-sm',
            {
              'border-slate-300': snapshot.isDragging,
            }
          )}
        >
          <h1 className='px-2 font-semibold text-slate-600'>{task.title}</h1>
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
  );
}

export default KanbanBoardTask;
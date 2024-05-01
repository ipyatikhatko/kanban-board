import dynamic from 'next/dynamic';
import React from 'react';
import { ColumnWithTasks } from './kanban-board';
import clsx from 'clsx';
import { Button } from '../ui/button';
import { RiAddFill } from 'react-icons/ri';
import KanbanBoardTask from './kanban-board-task';
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);

interface Props {
  column: ColumnWithTasks;
  onCreateTask: (colId: number) => void;
  isDragDisabled: boolean;
}

function KanbanBoardColumn(props: Props) {
  const { column, isDragDisabled, onCreateTask } = props;
  const handleCreateTask = () => {
    onCreateTask(column.id);
  };

  return (
    <div className='group flex min-w-[70vw] snap-start flex-col pl-2 lg:min-w-60'>
      <div className='mb-2 flex h-8 items-center justify-between rounded bg-slate-50 px-2 dark:bg-slate-500'>
        <h3 className='text-md font-semibold text-slate-500 dark:text-slate-200'>
          {column.name}
        </h3>
        <span className='text-lg font-semibold text-slate-300'>
          {column.tasks.length}
        </span>
      </div>
      <div className='flex flex-1 flex-col gap-2'>
        <Droppable droppableId={String(column.id)} type='TASK'>
          {(provided, snapshot) => (
            <div
              className={clsx('flex h-[55vh] flex-col overflow-auto rounded', {
                'bg-slate-100 shadow-inner dark:bg-slate-600':
                  snapshot.draggingOverWith,
              })}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {column.tasks.map((task, index: number) => (
                <KanbanBoardTask
                  boardId={column.boardId}
                  isDragDisabled={isDragDisabled}
                  key={task.id}
                  index={index + 1}
                  task={task}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className='mt-4 h-10 opacity-0 transition-opacity group-hover:opacity-100'>
        <Button
          onClick={handleCreateTask}
          className='flex w-full gap-1'
          variant='ghost'
        >
          <RiAddFill size={25} />
        </Button>
      </div>
    </div>
  );
}

export default KanbanBoardColumn;

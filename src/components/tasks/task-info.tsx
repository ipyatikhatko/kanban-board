'use client';
import React, { useRef, useState, useTransition } from 'react';
import { RiPencilFill, RiTimeFill } from 'react-icons/ri';
import TaskStatusDropdown from './task-status-dropdown';
import { DateTime } from 'luxon';
import { GetTaskInfoType, updateTask } from '@/lib/api/tasks';
import { notFound } from 'next/navigation';
import TaskDeescriptionEditor from '@/components/tasks/task-description-editor';
import TaskPageTitle from './task-page-title';

interface Props {
  task: GetTaskInfoType;
  // TODO: change task schema, add a description for the editor but save description string for task UI in the board.
}

function TaskInfo(props: Props) {
  const { task } = props;
  const [editDescription, setEditDescription] = useState(false);
  const [desecriptionLoading, startDescriptionTransition] = useTransition();

  if (!task) {
    return notFound();
  }

  const createdAt = DateTime.fromJSDate(task.createdAt).toFormat(
    'DD MMM hh:mm:ss'
  );

  const handleUpdateDescription = (mdStr: string) => {
    startDescriptionTransition(() => {
      updateTask(task.id, { description: mdStr }).then(() =>
        setEditDescription(false)
      );
    });
  };

  return (
    <section className='flex h-full flex-1 flex-col overflow-auto pb-4 pr-2 lg:pr-4'>
      <TaskPageTitle title={task.title} taskId={task.id} />
      <hr className='mt-2 h-px border-0 bg-slate-200' />
      <div className='mt-4 flex items-center gap-2 text-sm text-slate-500'>
        <RiTimeFill size={15} />
        <span suppressHydrationWarning className='font-light'>
          {createdAt}
        </span>
      </div>
      <div className='mb-4 mt-2'>
        <TaskStatusDropdown
          taskId={task.id}
          initialStatus={task.columnId}
          boardId={task.column.boardId}
        />
      </div>
      <TaskDeescriptionEditor
        editMode={editDescription}
        onEditModeChange={setEditDescription}
        loading={desecriptionLoading}
        onUpdateDescription={handleUpdateDescription}
        mdStr={task.description || ''}
      />
    </section>
  );
}

export default TaskInfo;

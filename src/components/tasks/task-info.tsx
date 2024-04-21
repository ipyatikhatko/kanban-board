'use client';
import React, { useRef } from 'react';
import { RiPencilFill, RiTimeFill } from 'react-icons/ri';
import TaskStatusDropdown from './task-status-dropdown';
import { DateTime } from 'luxon';
import { GetTaskInfoType } from '@/lib/api/tasks';
import { notFound } from 'next/navigation';
import TaskDeescriptionEditor from '@/components/tasks/task-description-editor';
import TaskPageTitle from './task-page-title';

interface Props {
  task: GetTaskInfoType;
  // TODO: change task schema, add a description for the editor but save description string for task UI in the board.
}

function TaskInfo(props: Props) {
  const { task } = props;

  if (!task) {
    return notFound();
  }

  const createdAt = DateTime.fromJSDate(task.createdAt).toFormat(
    'DD MMM hh:mm:ss'
  );

  return (
    <>
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
          initialStatus={task.columnId}
          boardId={task.column.boardId}
        />
      </div>
      <TaskDeescriptionEditor mdStr={'## Hello world'} />
    </>
  );
}

export default TaskInfo;

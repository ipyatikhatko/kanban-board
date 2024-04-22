'use client';
import { Column, KanbanBoard } from '@prisma/client';
import React, { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { SelectLabel } from '@radix-ui/react-select';
import { updateTask } from '@/lib/api/tasks';
import { RiLoader5Fill } from 'react-icons/ri';

interface Props {
  taskId: number;
  initialStatus: Column['id'];
  boardId: KanbanBoard['id'];
}

function TaskStatusDropdown(props: Props) {
  const { initialStatus, boardId, taskId } = props;
  const [loading, startTransition] = useTransition();

  const { data: columns, ...columnsQuery } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/boards/${boardId}/columns`);
      const data = await response.json();
      return data as Column[];
    },
    queryKey: ['board-columns', boardId],
  });

  const handleChange = (value: string) => {
    const newStatusId = Number(value);
    if (initialStatus !== newStatusId) {
      startTransition(() => {
        updateTask(taskId, { column: { connect: { id: newStatusId } } });
      });
    }
  };

  return (
    <>
      {columnsQuery.isLoading && !columns ? (
        <div className='h-8 w-32 animate-pulse rounded-md bg-slate-300' />
      ) : (
        <div className='flex w-fit items-center'>
          <Select
            disabled={loading}
            onValueChange={handleChange}
            defaultValue={String(initialStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a column' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className='text-xs text-slate-300'>
                  Move to:
                </SelectLabel>
                {columns?.map((col) => (
                  <SelectItem
                    className='text-slate-500'
                    key={col.id}
                    value={col.id.toString()}
                  >
                    {col.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {loading && (
            <RiLoader5Fill size={25} className='animate-spin text-slate-500' />
          )}
        </div>
      )}
    </>
  );
}

export default TaskStatusDropdown;

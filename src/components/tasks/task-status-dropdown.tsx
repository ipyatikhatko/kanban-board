'use client';
import { Column, KanbanBoard } from '@prisma/client';
import React from 'react';
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

interface Props {
  initialStatus: Column['id'];
  boardId: KanbanBoard['id'];
}

function TaskStatusDropdown(props: Props) {
  const { initialStatus, boardId } = props;

  const { data: columns, ...columnsQuery } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/boards/${boardId}/columns`);
      const data = await response.json();
      return data as Column[];
    },
    queryKey: ['board-columns', boardId],
  });

  return (
    <>
      {columnsQuery.isLoading && !columns ? (
        <div className='h-8 w-32 animate-pulse rounded-md bg-slate-300' />
      ) : (
        <div className='w-fit'>
          <Select
            // onValueChange={field.onChange}
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
        </div>
      )}
    </>
  );
}

export default TaskStatusDropdown;

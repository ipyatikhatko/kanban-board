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
import { RiAddBoxFill, RiInsertColumnRight } from 'react-icons/ri';
import { Button } from '../ui/button';
import CreateColumnDialog from './create-column-dialog';

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
  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result);
  };

  const onAddColumn = () => setCreateColumnDialog(true);

  return (
    <section className='flex h-[60vh] gap-2 rounded-lg border p-4'>
      <DragDropContext onDragEnd={handleDragEnd}>
        {board.columns.map((column) => (
          <div
            className='flex h-full w-60 flex-col overflow-hidden rounded-lg border border-slate-100 bg-white'
            key={column.id}
          >
            <h3 className='border-b border-slate-100 p-2'>{column.name}</h3>
            <div className='flex-1 p-2'>
              <Droppable droppableId={String(column.id)} type='TASK'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {column.tasks.map((task, index: number) => (
                      <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>{task.title}</div>
                            <div>{task.description}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button className='flex w-full gap-1' variant='secondary'>
                Add task
                <RiAddBoxFill />
              </Button>
            </div>
          </div>
        ))}
        <div
          onClick={onAddColumn}
          className='grid h-full w-40 cursor-pointer place-content-center rounded-lg bg-slate-100 shadow-inner hover:bg-slate-200 '
        >
          <span className='inline-flex flex-col items-center text-sm text-slate-400 group-hover:text-slate-500 group-hover:underline'>
            <RiInsertColumnRight size={25} />
            Add column
          </span>
        </div>
      </DragDropContext>
      {/* Create column dialog */}
      <CreateColumnDialog
        boardId={board.id}
        open={createColumnDialog}
        onOpenChange={setCreateColumnDialog}
      />
    </section>
  );
};

export default KanbanBoard;

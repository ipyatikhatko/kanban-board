'use server';

import { DropResult } from 'react-beautiful-dnd';
import prisma from '@/lib/prisma';
import { BoardWithColumns } from '@/components/boards/kanban-board';
import { Prisma } from '@prisma/client';

// Function to update the Kanban board based on the drop result
export const updateKanbanBoardFromDropResult = async (
  result: DropResult,
  board: BoardWithColumns
) => {
  try {
    const { destination, source, draggableId } = result;

    // Ensure a valid drop destination
    if (!destination) return;

    const sourceColumnId = parseInt(source.droppableId);
    const destinationColumnId = parseInt(destination.droppableId);
    const dragedTaskId = parseInt(draggableId);
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // Update draged task orderIndex to its destinationIndex and columnId to destinationColumnId
    const updateTaskOrderIndex = async () => {
      await prisma.task.update({
        where: {
          id: dragedTaskId,
        },
        data: {
          orderIndex: destinationIndex || 1,
          columnId: destinationColumnId,
        },
      });
    };

    const updateOtherTasksOrderIndex = async () => {
      const isDestinationBigger = destinationIndex > sourceIndex;
      let whereOrderIndex: Prisma.TaskUpdateManyArgs['where'];

      if (isDestinationBigger) {
        whereOrderIndex = {
          orderIndex: {
            lte: destinationIndex,
            gte: sourceIndex,
          },
        };
      } else {
        whereOrderIndex = {
          orderIndex: {
            gte: destinationIndex,
            lte: sourceIndex,
          },
        };
      }

      await prisma.task.updateMany({
        where: {
          id: {
            not: {
              equals: dragedTaskId,
            },
          },
          ...whereOrderIndex,
          columnId: {
            equals: destinationColumnId,
          },
        },
        data: {
          orderIndex: {
            ...(isDestinationBigger ? { decrement: 1 } : { increment: 1 }),
          },
        },
      });
    };

    // if task destination in the same column
    if (destinationColumnId === sourceColumnId) {
      const isSwap = Math.abs(sourceIndex - destinationIndex) === 1;

      if (isSwap) {
        await prisma.task.updateMany({
          where: {
            columnId: { equals: sourceColumnId },
            orderIndex: { equals: destinationIndex },
          },
          data: { orderIndex: sourceIndex },
        });
        updateTaskOrderIndex();
        console.log('Swap');
        return { message: 'Tasks swaped' };
      }

      updateTaskOrderIndex();
      updateOtherTasksOrderIndex();
    }

    if (destinationColumnId !== sourceColumnId) {
      const tasksCount = await prisma.task.count({
        where: { columnId: { equals: destinationColumnId } },
      });
      const isDestinationLastIndex = destinationIndex > tasksCount;
      updateTaskOrderIndex();
      // Update tasks order in destinationColumn
      await prisma.task.updateMany({
        where: {
          columnId: {
            equals: destinationColumnId,
          },
          id: {
            not: {
              equals: dragedTaskId,
            },
          },
          orderIndex: {
            ...(isDestinationLastIndex
              ? {
                  gte: destinationIndex,
                }
              : {
                  lte: destinationIndex,
                }),
          },
        },
        data: {
          orderIndex: {
            ...(isDestinationLastIndex
              ? { increment: 1 }
              : {
                  decrement: 1,
                }),
          },
        },
      });
      // Update tasks orderIndex in sourceColumn when task moved to other column
      await prisma.task.updateMany({
        where: {
          id: {
            not: dragedTaskId,
          },
          columnId: {
            equals: sourceColumnId,
          },
          orderIndex: {
            gte: sourceIndex,
          },
        },
        data: {
          orderIndex: {
            decrement: 1,
          },
        },
      });
    }
  } catch (error) {
    console.error('Error updating Kanban board from drop result:', error);
    throw new Error('Failed to update Kanban board from drop result');
  }
};

'use server';

import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createTaskInColumn = async (
  columnId: number,
  data: Omit<Prisma.TaskCreateInput, 'column'>
) => {
  try {
    // create task at the top of column, orderIndex: 1
    const newTask = await prisma.task.create({
      select: {
        id: true,
        column: {
          include: {
            board: true,
          },
        },
      },
      data: {
        ...data,
        orderIndex: 1,
        column: { connect: { id: columnId } },
      },
    });

    // update other tasks orderIndex, increment by 1
    await prisma.task.updateMany({
      where: {
        columnId: { equals: columnId },
        id: {
          not: { equals: newTask.id },
        },
        orderIndex: { gte: 1 },
      },
      data: {
        orderIndex: {
          increment: 1,
        },
      },
    });
    revalidatePath(`/boards/${newTask.column.boardId}`);
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

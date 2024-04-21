'use server';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';

export const getTaskInfoById = async (id: number) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        column: {
          select: {
            boardId: true,
          },
        },
      },
    });

    return task;
  } catch (error) {
    throw new Error('Database Error');
  }
};

export type GetTaskInfoType = Awaited<ReturnType<typeof getTaskInfoById>>;

export const updateTask = async (
  id: number | string,
  data: Prisma.TaskUpdateInput
) => {
  try {
    await prisma.task.update({
      where: {
        id: Number(id),
      },
      data,
    });
    revalidatePath(`/tasks/${id}`);
  } catch (error) {
    throw new Error('Database Error');
  }
};

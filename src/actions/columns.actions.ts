'use server';
import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export const editColumn = async (
  id: number,
  data: Prisma.ColumnUpdateInput
) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to perform this action');
  }

  try {
    const updatedColumn = await prisma.column.update({
      where: {
        id,
        board: {
          ownerId: session.user.id,
        },
      },
      data,
    });

    revalidatePath(`/boards/${updatedColumn.boardId}`);
  } catch (error) {
    console.log(error);
    return { message: 'Database Error' };
  }
};

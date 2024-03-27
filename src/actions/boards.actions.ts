'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { equal } from 'assert';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type CreateBoard = {
  name: string;
  description?: string;
};

export const createBoard = async ({ name, description }: CreateBoard) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to perform this action');
  }

  try {
    await prisma.kanbanBoard.create({
      data: {
        ownerId: session.user.id,
        name,
        description: description,
      },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error' };
  }

  revalidatePath('/boards');
  redirect('/boards');
};

interface RemoveBoard {
  id: number;
}

export const removeBoard = async ({ id }: RemoveBoard) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to perform this action');
  }

  try {
    await prisma.kanbanBoard.delete({
      where: { id: id, ownerId: session.user.id },
    });
  } catch (error) {
    console.log(error);
    return { message: 'Not allowed' };
  }

  revalidatePath('/boards');
  redirect('/boards');
};

export const editBoard = async (
  id: number,
  data: Prisma.KanbanBoardUpdateInput,
  nextOptions?: {
    revalidatePath?: string;
    redirect?: string;
  }
) => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to perform this action');
  }

  try {
    await prisma.kanbanBoard.update({
      where: {
        id,
        ownerId: session.user.id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
    return { message: 'Database Error' };
  }

  if (nextOptions?.revalidatePath) {
    revalidatePath(nextOptions.revalidatePath);
  }

  if (nextOptions?.redirect) {
    redirect(nextOptions.redirect);
  }
};

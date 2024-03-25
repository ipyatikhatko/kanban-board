'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type FormData = {
  name: string;
  description?: string;
};

export const createBoard = async ({ name, description }: FormData) => {
  const session = await auth();

  console.log(description);

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

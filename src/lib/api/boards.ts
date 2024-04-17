import { auth } from '@/auth';
import { unstable_noStore } from 'next/cache';
import prisma from '../prisma';
import { Prisma } from '@prisma/client';

const getSession = async () => {
  const session = await auth();
  if (!session?.user.id) {
    throw new Error('Unauthenticated');
  }
  return session;
};

export const getUserBoards = async () => {
  unstable_noStore();
  const session = await getSession();
  try {
    const boards = await prisma.kanbanBoard.findMany({
      where: {
        ownerId: {
          equals: session.user.id,
        },
      },
    });
    await new Promise((r) => setTimeout(r, 2000));
    return boards;
  } catch (error) {
    throw new Error('Database Error');
  }
};

export const getUserBoardById = async <
  T extends Prisma.KanbanBoardInclude | undefined,
>(
  id: number,
  include?: T
): Promise<Prisma.KanbanBoardGetPayload<{ include: T }>> => {
  unstable_noStore();
  const session = await getSession();
  try {
    const board = await prisma.kanbanBoard.findFirst({
      where: {
        ownerId: {
          equals: session.user.id,
        },
        id: {
          equals: id,
        },
      },
      include, // Cast to any to handle optional parameter
    });
    await new Promise((r) => setTimeout(r, 2000));
    return board as any;
  } catch (error) {
    throw new Error('Database Error');
  }
};

import prisma from '../prisma';

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
            boardId: true
          }
        },
      },
    });

    return task;
  } catch (error) {
    throw new Error('Database Error');
  }
};

export type GetTaskInfoType = Awaited<ReturnType<typeof getTaskInfoById>>;

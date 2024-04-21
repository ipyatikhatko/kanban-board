import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { board_id: string } }
) {
  if (!params.board_id) {
    return new Response('board_id not specified', { status: 403 });
  }

  const session = await auth();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const boardColumns = await prisma.column.findMany({
      where: {
        boardId: {
          equals: Number(params.board_id),
        },
      },
    });

    return Response.json(boardColumns);
  } catch (error) {
    return new Response('Internal error', { status: 500 });
  }
}

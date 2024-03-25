const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Users
    const user1 = await prisma.user.create({
      data: {
        username: 'user1',
        email: 'user1@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
      },
    });

    // Seed Kanban Boards
    const board1 = await prisma.kanbanBoard.create({
      data: {
        name: 'Board 1',
        ownerId: user1.id,
      },
    });

    const board2 = await prisma.kanbanBoard.create({
      data: {
        name: 'Board 2',
        ownerId: user2.id,
      },
    });

    // Seed Columns
    const column1 = await prisma.column.create({
      data: {
        name: 'Column 1',
        boardId: board1.id,
      },
    });

    const column2 = await prisma.column.create({
      data: {
        name: 'Column 2',
        boardId: board2.id,
      },
    });

    // Seed Tasks
    await prisma.task.createMany({
      data: [
        {
          title: 'Task 1',
          columnId: column1.id,
        },
        {
          title: 'Task 2',
          columnId: column2.id,
        },
      ],
    });

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

import EditBoardForm from '@/components/boards/edit-form';
import { getUserBoardById } from '@/lib/api/boards';

export default async function EditBoardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const board = await getUserBoardById(parseInt(id));

  return (
    <div className='pr-4 pt-4'>
      <h1 className='mb-4 text-2xl font-bold text-slate-600 dark:text-slate-400'>
        Edit board
      </h1>
      <section className='rounded-md bg-slate-200 p-4 dark:bg-slate-700'>
        <EditBoardForm
          id={parseInt(id)}
          values={{
            name: board?.name || '',
            description: board?.description || '',
          }}
        />
      </section>
    </div>
  );
}

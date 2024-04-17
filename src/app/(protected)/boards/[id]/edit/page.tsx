import EditBoardForm from '@/components/boards/edit-form';
import { getUserBoardById } from '@/lib/api/boards';

export default async function EditBoardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const board = await getUserBoardById(parseInt(id));

  return (
    <>
      <h1 className='text-xl text-slate-600 lg:text-2xl'>Edit board</h1>
      <hr className='my-4' />
      <section>
        <EditBoardForm
          id={parseInt(id)}
          values={{
            name: board?.name || '',
            description: board?.description || '',
          }}
        />
      </section>
    </>
  );
}

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
      <hr className='my-4' />
      <h1 className='mb-4 text-xl text-slate-600 lg:text-2xl'>Edit board</h1>
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

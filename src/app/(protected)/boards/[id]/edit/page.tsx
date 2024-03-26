import EditBoardForm from '@/components/boards/edit-form';
import { getUserBoardById } from '@/lib/api/boards';
import moment from 'moment';
import { RiCalendar2Fill } from 'react-icons/ri';

export default async function EditBoardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const board = await getUserBoardById(parseInt(id));

  return (
    <>
      <h1 className='text-2xl text-slate-600 lg:text-4xl'>{board?.name}</h1>
      <p className='text-slate-400'>{board?.description}</p>
      <div className='flex items-center gap-2 text-slate-400'>
        <RiCalendar2Fill />
        <span className='text-sm'>
          {moment(board?.createdAt).format('DD MMM YYYY, hh:mm:ss')}
        </span>
      </div>
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

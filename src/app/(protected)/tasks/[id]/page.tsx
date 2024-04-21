import TaskInfo from '@/components/tasks/task-info';
import { getTaskInfoById } from '@/lib/api/tasks';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { RiChat1Fill } from 'react-icons/ri';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function TaskPage(props: PageProps) {
  const { params } = props;
  if (!params.id) {
    return notFound();
  }

  const task = await getTaskInfoById(Number(params.id));

  if (!task) {
    return notFound();
  }

  return (
    <div className='flex h-full'>
      <section className='flex h-full flex-1 flex-col overflow-auto pb-4 pr-2 lg:pr-4'>
        <TaskInfo task={task} />
      </section>
      <section className='h-full w-[400px] border-l bg-white'>
        <div className='flex items-center gap-2 p-2 text-slate-400'>
          <RiChat1Fill size={25} />
          <h3 className='text-lg font-semibold'>Comments</h3>
        </div>
      </section>
    </div>
  );
}

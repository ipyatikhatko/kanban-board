import CreateBoardForm from '@/components/boards/create-form';

export default function CreateBoardPage() {
  return (
    <div className='pr-4 pt-4'>
      <h1 className='mb-4 text-2xl font-bold text-slate-600 dark:text-slate-400'>
        Create board
      </h1>
      <section className='rounded-md bg-slate-200 p-4 dark:bg-slate-700'>
        <CreateBoardForm />
      </section>
    </div>
  );
}

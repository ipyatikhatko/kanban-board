import { RiLoader5Fill } from 'react-icons/ri';

export default function BoardPageLoading() {
  return (
    <div className='grid h-full w-full place-content-center'>
      <RiLoader5Fill
        size={45}
        className='animate-spin text-slate-500 dark:text-slate-50'
      />
    </div>
  );
}

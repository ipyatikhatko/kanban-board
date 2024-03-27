import clsx from 'clsx';
import moment from 'moment';
import { RiCalendar2Fill } from 'react-icons/ri';

interface BoardHeaderInfoProps {
  name: string;
  description: string | null;
  createdAt: Date;
}

export default function BoardHeaderInfo({
  name,
  description,
  createdAt,
}: BoardHeaderInfoProps) {
  return (
    <section>
      <h1 className='text-2xl text-slate-600 lg:text-4xl'>{name}</h1>
      <p
        className={clsx('text-slate-400', {
          'italic text-slate-300': !description,
        })}
      >
        {description || 'No description'}
      </p>
      <div className='flex items-center gap-2 text-slate-400'>
        <RiCalendar2Fill />
        <span className='text-sm'>
          {moment(createdAt).format('DD MMM YYYY, hh:mm:ss')}
        </span>
      </div>
    </section>
  );
}

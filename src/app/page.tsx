import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import heroFuji from '../../public/landing-hero-fuji.jpg';
import clsx from 'clsx';
import { josefin_sans } from '@/lib/fonts';

export default async function Home() {
  return (
    <>
      <header className='fixed left-0 top-0 z-50 flex h-16 w-full items-center border-b-2 border-slate-400/40 px-4 backdrop-blur-sm'>
        <div className='mx-auto flex w-full max-w-screen-xl items-center justify-between'>
          <div>
            <h1 className='text-lg font-bold text-slate-700 lg:text-xl'>
              看板{' '}
              <span className='text-sm font-medium text-slate-600'>kanban</span>
            </h1>
          </div>
          <Link href='/api/auth/signin'>
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>
      <main className='flex-1 bg-slate-50'>
        <section className='relative h-[100vh]'>
          <Image
            fill
            style={{
              objectFit: 'cover',
            }}
            alt='fuji-mountain'
            src={heroFuji}
          />
          <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-white/50 to-white' />
          <div className='relative z-10 mx-auto grid h-full max-w-screen-xl place-content-center '>
            <h2
              className={clsx(
                josefin_sans.className,
                'text-center text-5xl font-bold text-slate-700 xl:text-6xl'
              )}
            >
              Organize. Prioritize. Achieve.
            </h2>
            <h1 className='mt-8 text-center text-3xl font-thin text-slate-600 xl:text-4xl'>
              Welcome to your streamlined Kanban journey.
            </h1>
          </div>
        </section>
      </main>
    </>
  );
}

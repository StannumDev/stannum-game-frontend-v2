import Image from 'next/image';
import logo from '@/assets/products/tmd/tmd_logo.webp';
import background from '@/assets/background/stannum_game_trophy.webp';
import Link from 'next/link';
import { ArrowRightIcon } from '@/icons';

export const LibraryCard = () => {

    const progress = 63;

    return (
        <Link href={'/dashboard/library/tmd'} className="w-full aspect-square lg:aspect-auto rounded-lg border border-card lg:hover:border-card-light flex flex-col overflow-hidden group relative">
            <div className="w-full h-full lg:h-auto lg:aspect-video absolute lg:relative top-0 left-0 z-10">
                <div className='size-full bg-gradient-to-b from-black/25 lg:from-transparent to-black lg:to-card lg:group-hover:to-card-light absolute top-0 left-0 z-10'></div>
                <Image src={background} alt='Programa STANNUM Game' className='size-full object-cover absolute top-0 left-0 z-0'/>
            </div>
            {/* <div className='px-4 py-1 bg-stannum/40 text-sm text-stannum rounded-full absolute top-4 right-4 z-30'>Completado</div> */}
            <div className='w-full grow flex flex-col p-6 pt-8 lg:bg-card lg:group-hover:bg-card-light z-20'>
                <div className='w-full grow flex flex-col justify-center items-center'>
                    <Image src={logo} alt='Programa STANNUM Game' className='w-52 lg:w-48'/>
                    <p className='hidden lg:block mt-4 text-center line-clamp-2'>Aprende a profesionalizar tu equipo de venta y marketing.</p>
                </div>
                <div className='mt-6 w-full p-6 lg:p-0 flex justify-center items-center gap-2 absolute lg:static bottom-0 left-0'>
                    <div className='text-sm leading-none font-black'>{progress}%</div>
                    <div className="w-full h-1.5 bg-card-lighter rounded-lg flex overflow-hidden transition-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                        <div className={`flex flex-col justify-center rounded-s-lg bg-stannum`} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className='hidden lg:block ml-3 lg:ml-0 lg:group-hover:ml-3 w-4 lg:w-0 lg:group-hover:w-4 h-4 relative transition-200'>
                        <ArrowRightIcon className='size-4 absolute top-0 -left-1 lg:opacity-0 lg:group-hover:opacity-100 transition-200'/>
                    </div>
                </div>
            </div>
        </Link>
    )
}

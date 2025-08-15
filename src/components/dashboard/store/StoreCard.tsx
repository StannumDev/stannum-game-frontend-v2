import Image from 'next/image';
import logo from '@/assets/programs/trenno_mark_digital_logo.webp';
import background from '@/assets/background/stannum_game_trophy.webp';
import Link from 'next/link';
import { ArrowRightIcon } from '@/icons';

export const StoreCard = () => {

    return (
        <Link href={'/dashboard/library'} className="w-full aspect-square lg:aspect-auto rounded-lg border border-card lg:hover:border-card-light flex flex-col overflow-hidden group relative">
            <div className="w-full h-full lg:h-auto lg:aspect-video absolute lg:relative top-0 left-0 z-10">
                <div className='size-full bg-gradient-to-b from-black/25 lg:from-transparent to-black lg:to-card lg:group-hover:to-card-light absolute top-0 left-0 z-10'></div>
                <Image src={background} alt='Programa STANNUM Game' className='size-full object-cover absolute top-0 left-0 z-0'/>
            </div>
            <div className='w-full grow flex flex-col p-6 pt-8 lg:bg-card lg:group-hover:bg-card-light z-20'>
                <div className='w-full grow flex flex-col justify-center items-center'>
                    <Image src={logo} alt='Programa STANNUM Game' className='w-52 lg:w-48'/>
                    <p className='hidden lg:block mt-4 text-center line-clamp-2'>Aprende a profesionalizar tu equipo de venta y marketing.</p>
                </div>
                <div className='mt-6 w-full flex items-end gap-4'>
                    <div className='grow flex flex-col items-center lg:items-start gap-1'>
                        <div className='flex justify-center items-end gap-1'><b className='text-5xl lg:text-3xl leading-none font-black tracking-tighter'>500</b> <small className='text-sm font-thin text-white/75'>USD</small></div>
                        <small className='subtitle-1'>Oferta lanzamiento</small>
                    </div>
                    <div className='hidden w-fit lg:flex justify-center items-center'>
                        <span className='text-sm text-white/75 group-hover:text-white'>Ver más</span>
                        <div className='group-hover:ml-3 w-0 group-hover:w-3 h-3 relative transition-200'>
                            <ArrowRightIcon className='size-3 absolute top-0 -left-1 opacity-0 group-hover:opacity-100 transition-200'/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

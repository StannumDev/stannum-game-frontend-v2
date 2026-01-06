import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@/icons';
import { Program } from '@/interfaces';

interface Props {
    program:Program;
    isPurchased?: boolean;
}

export const StoreCard = ({ program, isPurchased }: Props) => {

    const { id, name, description, href, logo, price, background } = program;

    if(price < 0){
        return (
            <div className="w-full aspect-square lg:aspect-auto rounded-lg border border-card flex flex-col opacity-50 overflow-hidden relative">
                <div className="w-full h-full lg:h-auto lg:aspect-video absolute lg:relative top-0 left-0 z-10">
                    <div className='size-full bg-gradient-to-b from-black/25 lg:from-transparent to-black lg:to-card lg:group-hover:to-card-light absolute top-0 left-0 z-10'></div>
                    <Image src={background} alt={name} className='size-full object-cover absolute top-0 left-0 z-0'/>
                </div>
                <div className='w-full grow flex flex-col p-6 pt-8 lg:bg-card z-20'>
                    <div className='w-full grow flex flex-col justify-center items-center'>
                        <Image src={logo} alt={name} className='w-52 lg:w-48'/>
                        <p className='hidden lg:block mt-4 text-center line-clamp-2'>{description}</p>
                    </div>
                    <div className='mt-6 w-full flex items-end gap-4'>
                        <div className='grow'>
                            <small className='subtitle-1'>Proximamente</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link href={ isPurchased ? `/dashboard/library/${id}` : href } target={ isPurchased ? "_self" : "_blank"} className="w-full aspect-square lg:aspect-auto rounded-lg border border-card lg:hover:border-card-light flex flex-col overflow-hidden group relative">
            { isPurchased && <div className="bg-stannum/40 text-stannum text-xs font-semibold py-1 px-2 rounded-lg absolute top-3 right-3 z-20">En tu biblioteca</div>  }
            <div className="w-full h-full lg:h-auto lg:aspect-video absolute lg:relative top-0 left-0 z-10">
                <div className='size-full bg-gradient-to-b from-black/25 lg:from-transparent to-black lg:to-card lg:group-hover:to-card-light absolute top-0 left-0 z-10'></div>
                <Image src={background} alt={name} className='size-full object-cover absolute top-0 left-0 z-0'/>
            </div>
            <div className='w-full grow flex flex-col p-6 pt-8 lg:bg-card lg:group-hover:bg-card-light z-20'>
                <div className='w-full grow flex flex-col justify-center items-center'>
                    <Image src={logo} alt={name} className='w-52 lg:w-48'/>
                    <p className='hidden lg:block mt-4 text-center line-clamp-2'>{description}</p>
                </div>
                <div className='mt-6 w-full flex items-end gap-4'>
                    <div className='grow flex flex-col items-center lg:items-start gap-1'>
                        {
                            price === 0 ? (
                                <div className='flex justify-center items-end gap-1'>
                                    <b className='text-5xl lg:text-3xl leading-none font-black tracking-tighter uppercase'>Gratis</b>
                                </div>
                            )
                            : (
                                <div className='flex justify-center items-end gap-1'>
                                    <b className='text-5xl lg:text-3xl leading-none font-black tracking-tighter'>{price}</b>
                                    <small className='text-sm font-thin text-white/75'>USD</small>
                                </div>
                            )
                        }
                        <small className='subtitle-1'>{ price >= 0 ? 'Oferta lanzamiento' : 'Proximamente'}</small>
                    </div>
                    <div className='hidden w-fit lg:flex justify-center items-center'>
                        <span className='text-sm text-white/75 group-hover:text-white'>{ isPurchased ? 'Ir ahora' : 'Ver más'}</span>
                        <div className='group-hover:ml-3 w-0 group-hover:w-3 h-3 relative transition-200'>
                            <ArrowRightIcon className='size-3 absolute top-0 -left-1 opacity-0 group-hover:opacity-100 transition-200'/>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
import background from '@/assets/profile/achievement_default.webp';
import Image from 'next/image';

export const AchievementCard = () => {
    return (
        <article className='w-full aspect-video px-6 py-4 rounded-2xl flex justify-start items-end group relative overflow-hidden'>
            <div className='size-full absolute top-0 left-0 z-0 pointer-events-none'>
                <Image src={background} alt="Logro STANNUM Game" className='size-full object-cover'/>
                <div className='size-full bg-gradient-to-br from-transparent to-black absolute top-0 left-0 opacity-25 group-hover:opacity-100 transition-all duration-200 ease-in-out'></div>
            </div>
            <div className='w-full relative z-20'>
                <h3 className='w-full title-3 text-balance'>Emprendedor amateur</h3>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tenetur illo alias illum consequatur.</p> */}
                <div className='mt-2 flex justify-center items-center gap-2'>
                    <div className='text-sm leading-none font-black text-white'>0%</div>
                    <div className="w-full h-1.5 bg-card rounded-lg flex overflow-hidden transition-all duration-200 ease-in-out" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={0}>
                        <div className="flex flex-col justify-center bg-white" style={{ width: '25%' }}></div>
                    </div>
                </div>
            </div>
        </article>
    )
}

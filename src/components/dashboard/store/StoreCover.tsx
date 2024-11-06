import Image from 'next/image';
import { MotionWrapperLayout, STANNUMLogo } from '@/components';
import background from '@/assets/background/the_game.webp';

export const StoreCover = () => {
    return (
        <MotionWrapperLayout>
            <header className='w-full card pb-0 flex flex-col justify-center items-center relative overflow-hidden'>
                <div className='size-full absolute top-0 left-0 z-10'>
                    <div className='bg-gradient-to-b from-transparent to-black/50 size-full absolute top-0 left-0 z-10'></div>
                    <Image
                        priority
                        src={background}
                        alt='Biblioteca STANNUM Game'
                        className='size-full object-cover relative z-0 blur-sm object-[50%_30%]'
                    />
                </div>
                <div className='py-8 lg:py-16 relative z-20'>
                    <STANNUMLogo className='w-48 lg:w-80 fill-white drop-shadow-md'/>
                </div>
                <div className='w-full lg:w-1/2 py-4 lg:py-6 px-6 lg:px-10 relative top-[1px] z-30'>
                    <svg
                        className="fill-card size-full absolute top-0 left-0 z-0"
                        viewBox="0 0 620 75"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path d="M17.7635 36.9353C26.1378 18.9904 30.325 10.0179 38.19 5.00894C46.055 0 55.9564 0 75.7592 0H546.67C567.656 0 578.149 0 586.275 5.50185C594.401 11.0037 598.298 20.7461 606.092 40.231L620 75H0L17.7635 36.9353Z"/>
                    </svg>
                    <h2 className='w-full text-center text-xs lg:text-sm font-semibold uppercase tracking-widest relative z-10'>Tienda</h2>
                </div>
            </header>
        </MotionWrapperLayout>
  )
}

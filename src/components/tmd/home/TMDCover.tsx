import Image from 'next/image';
import { FaChevronLeft } from "react-icons/fa6";
import styles from '@/components/styles/TMDCover.module.css'
import logo from '@/assets/products/tmd/tmd_logo.webp';
import background from '@/assets/wallpaper/tmd.webp';

const progress = 55;

export const TMDCover = () => {
  return (
    <header className='w-full card pb-0 flex flex-col justify-center items-center relative overflow-hidden'>
        <button type="button" className='size-10 bg-card rounded-full flex justify-center items-center absolute top-4 left-4 z-10 group scale-[0.8] hover:scale-100 hover:bg-card-light transition-all duration-200 ease-in-out'>
            <span className='sr-only'>Volver atras</span>
            <FaChevronLeft className='size-5 stroke-1 text-neutral-400 group-hover:text-white transition-all duration-200 ease-in-out'/>
        </button>
        <div className='size-full absolute top-0 left-0 z-0'>
            <div className='bg-gradient-to-b from-black/25 via-black/50 to-black/75 size-full absolute top-0 left-0 z-10'></div>
            <Image src={background} alt='TRENNO Mark Digital' className='size-full object-cover relative z-0 blur-sm'/>
        </div>
        <div className='py-16 relative z-10'>
            <Image src={logo} alt='Logo TRENNO Mark Digital' className='w-80 object-contain drop-shadow-md'/>
        </div>
        <div className='card card-link p-4 min-w-36 max-w-40 flex flex-col justify-center items-center text-center absolute bottom-4 left-4 z-10'>
            <h2 className='w-full px-2 text-stannum bg-stannum/40 rounded'>Top Leader</h2>
            <p className='mt-1 w-full title-2 text-lg truncate'>STANNUM STANNUM STANNUM STANNUM STANNUM</p>
            <p className='font-thin text-neutral-400'>3500 Pts</p>
        </div>
        <div className='w-1/2 py-6 px-10 relative top-[1px] z-10'>
            <svg
                className="fill-card size-full absolute top-0 left-0 z-0"
                viewBox="0 0 620 75"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path d="M17.7635 36.9353C26.1378 18.9904 30.325 10.0179 38.19 5.00894C46.055 0 55.9564 0 75.7592 0H546.67C567.656 0 578.149 0 586.275 5.50185C594.401 11.0037 598.298 20.7461 606.092 40.231L620 75H0L17.7635 36.9353Z"/>
            </svg>
            <div className='w-full flex flex-col justify-center items-center relative z-10'>
                <h2 className='text-sm font-semibold uppercase tracking-widest text-card-lightest'>Progreso total</h2>
                <div className='mt-2 w-full max-w-md flex justify-center items-center gap-2'>
                    <div className='text-sm leading-none font-black text-white'>{progress}%</div>
                    <div
                        className="w-full h-5 bg-card border border-card-light rounded-full flex overflow-hidden transition-all duration-200 ease-in-out"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className={`bg-stannum ${styles.pattern__stripes}`} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

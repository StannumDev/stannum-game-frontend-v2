import Link from 'next/link';
import Image from 'next/image';
import { UserIcon } from '@/icons';
import photo_mateo from '@/assets/user/usuario_mateo.webp';

export const TMDPlayerRankingCard = () => {
    return (
        <Link href={'/dashboard/profile'} className="w-full p-4 last:rounded-b-lg odd:bg-card hover:bg-card-light/75 grid grid-cols-12 items-center gap-1 lg:gap-2 cursor-pointer group">
            <h3 className="col-span-1 flex justify-center items-center relative">
                <span className="sr-only">
                    Segundo puesto
                </span>
                <span className="text-sm lg:text-base font-black">1</span>
            </h3>
            <h3 className="col-span-4 flex items-center gap-2 lg:gap-4">
                <Image src={photo_mateo} alt='Primer puesto Mateo Bernabé Lohezic' className="size-7 lg:size-9 rounded-full"/>
                <span className="whitespace-nowrap truncate text-sm lg:text-base">STANNUM</span>
            </h3>
            <h3 className="col-span-4 text-sm lg:text-base">Mateo Bernabé Lohezic</h3>
            <h3 className="col-span-2 text-sm lg:text-base">85 Pts</h3>
            <h3 className="col-span-1 text-sm lg:text-base flex justify-center">
                <div className="bg-card-lighter size-8 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-200">
                    <UserIcon className="size-5"/>
                </div>
            </h3>
        </Link>
    )
}

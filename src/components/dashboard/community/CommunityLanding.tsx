import Link from 'next/link';
import { RobotIcon, ToolsIcon } from '@/icons';
import { MotionWrapperLayout } from '@/components';

export const CommunityLanding = () => {
    return (
        <MotionWrapperLayout className='grow'>
            <div className="size-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Link href={"/dashboard/community/prompts"} className="size-full card card-link group cursor-pointer overflow-hidden relative">
                    <div className="relative h-full flex flex-col items-center justify-center text-center">
                        <div className="p-6 bg-card group-hover:bg-stannum rounded-full border-2 border-stannum text-stannum group-hover:text-card transition-200">
                            <ToolsIcon className="text-6xl lg:text-8xl" />
                        </div>
                        <h1 className="mt-8 text-5xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tight">Banco de <span className="text-stannum block">PROMPTS</span></h1>
                        <p className="max-w-md text-lg lg:text-xl text-white">Descubre y comparte prompts de IA creados por la comunidad STANNUM</p>
                        <div className="mt-8 flex flex-col gap-3">
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Prompts verificados y curados</div>
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Múltiples plataformas compatibles</div>
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Comunidad activa y colaborativa</div>
                        </div>
                        <button type='button' className="mt-8 px-8 py-4 rounded-lg subtitle-1 text-stannum text-lg">Explorar Prompts</button>
                    </div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-stannum/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-stannum/20 rounded-full blur-3xl" />
                </Link>
                <Link href={"/dashboard/community/assistants"} className="size-full card card-link group cursor-pointer overflow-hidden relative">
                    <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                        <div className="p-6 bg-card group-hover:bg-stannum rounded-full border-2 border-stannum text-stannum group-hover:text-card transition-200">
                            <RobotIcon className="text-6xl lg:text-8xl" />
                        </div>
                        <h1 className="mt-8 text-5xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tight">Banco de <span className="text-stannum block">ASISTENTES</span></h1>
                        <p className="max-w-md text-lg lg:text-xl text-white">Accede a asistentes especializados de IA compartidos por la comunidad</p>
                        <div className="mt-8 flex flex-col gap-3">
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Asistentes listos para usar</div>
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Especializados por categoría</div>
                            <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Creados por expertos</div>
                        </div>
                        <button type='button' className="mt-8 px-8 py-4 rounded-lg subtitle-1 text-stannum text-lg">Explorar Asistentes</button>
                    </div>
                    <div className="absolute top-10 left-10 w-32 h-32 bg-stannum/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-stannum/20 rounded-full blur-3xl" />
                </Link>
            </div>
        </MotionWrapperLayout>
    );
};
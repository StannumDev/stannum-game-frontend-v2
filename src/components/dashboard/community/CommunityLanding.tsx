'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HiOutlinePencil } from 'react-icons/hi2';
import { RiRobot2Line } from 'react-icons/ri';

export const CommunityLanding = () => {
    const router = useRouter();
    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row">
            <motion.div
                onClick={() => router.push('/dashboard/community/prompts')}
                className="relative flex-1 min-h-screen group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
            >
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-8 p-6 bg-stannum/20 rounded-full border-2 border-stannum/40 backdrop-blur-sm">
                        <HiOutlinePencil className="text-6xl lg:text-8xl text-stannum" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tight">Banco de <span className="text-stannum block">PROMPTS</span></h1>
                    <p className="text-lg lg:text-xl text-white max-w-md mb-8">Descubre y comparte prompts de IA creados por la comunidad STANNUM</p>
                    <div className="flex flex-col gap-3 mb-8">
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Prompts verificados y curados</div>
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Múltiples plataformas compatibles</div>
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Comunidad activa y colaborativa</div>
                    </div>
                    <button type='button' className="px-8 py-4 bg-stannum rounded-lg font-bold text-card text-lg group-hover:bg-stannum/75 transition-200 shadow-lg">Explorar Prompts</button>
                </div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-stannum/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-stannum/20 rounded-full blur-3xl" />
            </motion.div>
            <div className="hidden lg:block w-[2px] bg-gradient-to-b from-transparent via-stannum/30 to-transparent" />
            <div className="lg:hidden h-[2px] bg-gradient-to-r from-transparent via-stannum/30 to-transparent" />
            <motion.div
                onClick={() => router.push('/dashboard/community/assistants')}
                className="relative flex-1 min-h-screen group cursor-pointer overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
            >
                <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className="mb-8 p-6 bg-stannum/20 rounded-full border-2 border-stannum/40 backdrop-blur-sm">
                        <RiRobot2Line className="text-6xl lg:text-8xl text-stannum" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 text-white tracking-tight">Banco de <span className="text-stannum block">ASISTENTES</span></h1>
                    <p className="text-lg lg:text-xl text-white max-w-md mb-8">Accede a asistentes especializados de IA compartidos por la comunidad</p>
                    <div className="flex flex-col gap-3 mb-8">
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Asistentes listos para usar</div>
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Especializados por categoría</div>
                        <div className="px-6 py-3 backdrop-blur-sm rounded-lg bg-stannum/20 border border-stannum text-stannum subtitle-1">Creados por expertos</div>
                    </div>
                    <button type='button' className="px-8 py-4 bg-stannum rounded-lg font-bold text-card text-lg group-hover:bg-stannum/75 transition-200 shadow-lg">Explorar Asistentes</button>
                </div>
                <div className="absolute top-10 left-10 w-32 h-32 bg-stannum/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-stannum/20 rounded-full blur-3xl" />
            </motion.div>
        </div>
    );
};
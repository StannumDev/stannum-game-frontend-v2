'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Modal } from '@/components';
import { RobotIcon, ToolsIcon, CheckIcon } from '@/icons';

const COOKIE_KEY = 'BANKS_V1';

export const WhatsNewModal = () => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get(COOKIE_KEY)) return;
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        Cookies.set(COOKIE_KEY, '1', { expires: 365 });
        setShowModal(false);
    };

    const handleNavigate = (path: string) => {
        handleClose();
        router.push(path);
    };

    return (
        <Modal showModal={showModal} setShowModal={handleClose} className="max-w-5xl p-0">
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">Nuevos Bancos de <br/> <span className="text-stannum">Inteligencia Artificial</span></h2>
                    <p className="mt-4 text-lg md:text-xl">Potenciá tu entrenamiento con herramientas profesionales</p>
                </motion.div>
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => handleNavigate('/dashboard/community/prompts')}
                        className="group cursor-pointer overflow-hidden relative card card-link border-stannum/25 hover:border-stannum"
                    >
                        <div className="relative h-full flex flex-col items-center text-center">
                            <div className="p-4 bg-card group-hover:bg-stannum rounded-full border-2 border-stannum text-stannum group-hover:text-card transition-200 mb-4">
                                <ToolsIcon className="text-4xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Banco de<br/><span className="text-stannum">PROMPTS</span></h3>
                            <p className="subtitle-1">Instrucciones optimizadas para IA</p>
                            <div className="mt-4 flex flex-col items-center gap-2 w-full">
                                <div className="text-sm flex items-center gap-1"><CheckIcon className='text-stannum text-lg'/> Verificados y curados</div>
                                <div className="text-sm flex items-center gap-1"><CheckIcon className='text-stannum text-lg'/> Múltiples plataformas</div>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 w-20 h-20 bg-stannum/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-4 left-4 w-24 h-24 bg-stannum/10 rounded-full blur-2xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => handleNavigate('/dashboard/community/assistants')}
                        className="group cursor-pointer overflow-hidden relative card card-link border-stannum/25 hover:border-stannum"
                    >
                        <div className="relative h-full flex flex-col items-center text-center">
                            <div className="p-4 bg-card group-hover:bg-stannum rounded-full border-2 border-stannum text-stannum group-hover:text-card transition-200 mb-4">
                                <RobotIcon className="text-4xl" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Banco de<br/><span className="text-stannum">ASISTENTES</span></h3>
                            <p className="subtitle-1">Asistentes personalizados listos</p>
                            <div className="mt-4 flex flex-col items-center gap-2 w-full">
                                <div className="text-sm flex items-center gap-1"><CheckIcon className='text-stannum text-lg'/> Listos para usar</div>
                                <div className="text-sm flex items-center gap-1"><CheckIcon className='text-stannum text-lg'/> Por categoría</div>
                            </div>
                        </div>
                        <div className="absolute top-4 left-4 w-20 h-20 bg-stannum/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-4 right-4 w-24 h-24 bg-stannum/10 rounded-full blur-2xl" />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex flex-col gap-4"
                >
                    <button
                        type="button"
                        onClick={() => handleNavigate('/dashboard/community')}
                        className="w-full px-6 py-4 bg-stannum text-card rounded-xl font-bold text-lg hover:bg-stannum/90 transition-colors"
                    >
                        Explorar ahora
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-sm subtitle-1 hover:text-white transition-200"
                    >
                        Recordármelo después
                    </button>
                </motion.div>
            </div>
        </Modal>
    );
};
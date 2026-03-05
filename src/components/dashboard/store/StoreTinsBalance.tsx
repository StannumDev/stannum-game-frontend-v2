'use client'

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { formatCoins } from '@/utilities';
import { CrownIcon, FireIcon, MedalIcon, GiftIcon } from '@/icons';
import stannum_coin from '@/assets/tins_coin.svg';

export const StoreTinsBalance = () => {
    const user = useUserStore(s => s.user);
    const [showModal, setShowModal] = useState(false);

    if (!user) return null;

    return (
        <Fragment>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                aria-label="Ver mis Tins"
                className="flex items-center gap-2 hover:bg-card-light rounded px-1.5 py-1 cursor-pointer transition-200"
            >
                <Image src={stannum_coin} alt="Tins" width={32} height={32} className="size-6 lg:size-8 shrink-0" />
                <span className="text-sm lg:text-xl font-black text-amber-400 leading-tight tabular-nums">{formatCoins(user.coins ?? 0)}</span>
            </button>
            <Modal
                className="max-w-2xl h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="size-full flex flex-col items-center text-center">
                    <Image src={stannum_coin} alt="Tins" width={80} height={80} className='size-16 lg:size-20' />
                    <h2 className="mt-4 title-2 text-2xl lg:text-3xl">¿Qué son los <b className="text-amber-400 font-black">Tins</b>?</h2>
                    <p className="mt-2 max-w-md">
                        Los <b className="text-amber-400 font-semibold">Tins</b> son la moneda virtual de <b className="text-stannum font-semibold block">STANNUM Game</b>
                    </p>
                    <div className="mt-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <div className="w-full p-4 border border-card-light rounded-xl flex flex-row lg:flex-col items-center lg:items-center gap-3 lg:gap-2 text-start lg:text-center">
                            <CrownIcon className="size-6 text-stannum shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold">Completá lecciones</h3>
                                <p className="text-xs">Cada lección completada te da <b className="text-amber-400 font-semibold">Tins</b> junto con <b className="text-stannum font-semibold">XP</b>.</p>
                            </div>
                        </div>
                        <div className="w-full p-4 border border-card-light rounded-xl flex flex-row lg:flex-col items-center lg:items-center gap-3 lg:gap-2 text-start lg:text-center">
                            <FireIcon className="size-6 text-stannum shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold">Mantené tu racha</h3>
                                <p className="text-xs">Entrená todos los días para ganar <b className="text-amber-400 font-semibold">Tins</b> extra.</p>
                            </div>
                        </div>
                        <div className="w-full p-4 border border-card-light rounded-xl flex flex-row lg:flex-col items-center lg:items-center gap-3 lg:gap-2 text-start lg:text-center">
                            <MedalIcon className="size-6 text-stannum shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold">Desbloqueá logros</h3>
                                <p className="text-xs">Cada logro desbloqueado te recompensa con <b className="text-amber-400 font-semibold">Tins</b>.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 w-full p-4 bg-card-light rounded-xl flex flex-col lg:flex-row items-center gap-3 text-center lg:text-start">
                        <GiftIcon className="size-10 text-stannum shrink-0" />
                        <p>Los <b className="text-amber-400 font-semibold">Tins</b> son exclusivos y limitados. Gastalos con criterio en la tienda para desbloquear contenido único como portadas de perfil, cajas misteriosas y más.</p>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
};

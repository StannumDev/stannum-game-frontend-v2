'use client'

import { Fragment, useState } from "react";
import { HelpHexagonIcon } from "@/icons";
import { Modal } from "@/components";

export const StoreTutorial = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <Fragment>
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="hover:bg-card-light rounded size-7 flex justify-center items-center transition-200"
            >
                <HelpHexagonIcon className="size-5"/>
            </button>
            <Modal
                className="max-w-7xl h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="size-full text-center">
                    <div className="lg:text-start flex flex-col lg:flex-row items-center lg:items-end gap-3 lg:gap-6">
                        <h2 className="title-2 text-3xl lg:text-5xl">¿Cómo funciona?</h2>
                        <p className="max-w-sm">Los productos en <b className="text-stannum font-black">STANNUM Game</b> se activan de manera muy sencilla, en 3 simples pasos:</p>
                    </div>
                    <div className="mt-6 lg:mt-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div className="w-full lg:aspect-square p-4 lg:p-6 lg:pb-4 pt-0 border border-card-light rounded-2xl flex flex-col justify-start items-center">
                            <div className="w-full py-6 lg:py-12 flex justify-center items-center">
                                <div className='size-16 rounded-full bg-gradient-to-r from-stannum from-75% to-teal-500 text-2xl flex justify-center items-center relative overflow-hidden'>1</div>
                            </div>
                            <h3 className="text-lg font-semibold uppercase tracking-widest">Compra el programa</h3>
                            <p className="mt-2 lg:mt-4 lg:text-lg text-white/75">Ingresa a la tienda de STANNUM Game, selecciona el producto de tu interés desde el catálogo de entrenamientos.</p>
                        </div>    
                        <div className="w-full lg:aspect-square p-4 lg:p-6 lg:pb-4 pt-0 border border-card-light rounded-2xl flex flex-col justify-start items-center">
                            <div className="w-full py-6 lg:py-12 flex justify-center items-center">
                                <div className='size-16 rounded-full bg-gradient-to-r from-stannum from-75% to-teal-500 text-2xl flex justify-center items-center relative overflow-hidden'>2</div>
                            </div>
                            <h3 className="text-lg font-semibold uppercase tracking-widest">Recibe las claves</h3>
                            <p className="mt-2 lg:mt-4 lg:text-lg text-white/75">Una vez confirmada la compra, recibirás en tu correo electrónico los códigos necesarios para activar el producto.</p>
                        </div>    
                        <div className="w-full lg:aspect-square p-4 lg:p-6 lg:pb-4 pt-0 border border-card-light rounded-2xl flex flex-col justify-start items-center">
                            <div className="w-full py-6 lg:py-12 flex justify-center items-center">
                                <div className='size-16 rounded-full bg-gradient-to-r from-stannum from-75% to-teal-500 text-2xl flex justify-center items-center relative overflow-hidden'>3</div>
                            </div>
                            <h3 className="text-lg font-semibold uppercase tracking-widest">Activa las claves</h3>
                            <p className="mt-2 lg:mt-4 lg:text-lg text-white/75">Por último, dirigite a la sección de &ldquo;Activar producto&rdquo;, donde cada miembro ingresara su código de producto para comenzar a entrenar.</p>
                        </div>
                    </div>
                    <div className="mt-8 w-full p-4 lg:p-6 border border-card-light rounded-2xl flex flex-col items-center">
                        <h3 className="text-lg font-semibold uppercase tracking-widest">Importante</h3>
                        <p className="mt-2 lg:mt-4 lg:text-lg text-white/75">Al realizar la compra de un producto, se incluye una cantidad de códigos que depende de cada producto, destinada a los miembros del equipo. El entrenamiento en STANNUM Game es colectivo, y cada participante puede avanzar de forma individual y contribuir al fortalecimiento del equipo. Esta modalidad es ideal para fomentar la profesionalización y cohesión del equipo de ventas y marketing.</p>
                    </div>
                </div>
            </Modal>
        </Fragment>
    )
}
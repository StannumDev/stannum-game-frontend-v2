'use client'

import { useState, useRef } from "react";
import { CheckIcon, CrossIcon, CrownIcon, HourglassIcon, ToolsIcon, UploadIcon } from "@/icons";
import { Instruction } from "@/interfaces";

interface Props{
    instruction: Instruction;
    isCompleted: boolean;
}

export const ProgramInstructionDetails = ({}: Props) => {
    const fileInputRef = useRef(null);
    const [status, setStatus] = useState<'PENDING'|'IN_PROCESS'|'IN_REVIEW'|'COMPLETED'>('PENDING')

    return (
        <div className="w-full grow lg:py-6 lg:bg-card lg:rounded-lg">
            <div className='w-full lg:px-6 flex flex-col'>
                <span className='subtitle-1'>Instrucción 01</span>
                <h2 className='w-full title-2 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, dolor? In modi natus debitis suscipit aliquid molestiae deserunt.</h2>
            </div>
            <div className="mt-6 pb-6 lg:p-6 lg:pt-0 border-b border-white/10 grid grid-cols-2 gap-4 lg:flex lg:gap-12">
                <div className='flex items-center gap-2 relative'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${ status === 'PENDING' ? 'bg-invalid/25' : status === 'IN_PROCESS' || status === 'IN_REVIEW' ? 'bg-card-light' : 'bg-stannum/40'}`}>
                        <span className={`text-xl ${ status === 'PENDING' ? 'text-invalid' : 'text-stannum'}`}>
                            D
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Baja</span>
                        <span className='subtitle-1'>Dificultad</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 relative'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${ status === 'PENDING' ? 'bg-invalid/25' : status === 'IN_PROCESS' || status === 'IN_REVIEW' ? 'bg-card-light' : 'bg-stannum/40'}`}>
                        <span className={`text-xl ${ status === 'PENDING' ? 'text-invalid' : 'text-stannum'}`}>
                            <CrownIcon />
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span>200 XP</span>
                        <span className='subtitle-1'>Recompensa</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 relative'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${ status === 'PENDING' ? 'bg-invalid/25' : status === 'IN_PROCESS' || status === 'IN_REVIEW' ? 'bg-card-light' : 'bg-stannum/40'}`}>
                        <span className={`text-xl ${ status === 'PENDING' ? 'text-invalid' : 'text-stannum'}`}>
                            {
                                status === 'PENDING' ? <CrossIcon/>
                                : status === 'IN_PROCESS' ? <ToolsIcon/>
                                : status === 'IN_REVIEW' ? <HourglassIcon/>
                                : status === 'COMPLETED' && <CheckIcon/>
                            }
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span>
                            {
                                status === 'PENDING' ? 'Pendiente'
                                : status === 'IN_PROCESS' ? 'En proceso'
                                : status === 'IN_REVIEW' ? 'En revisión'
                                : status === 'COMPLETED' && 'Completado'
                            }
                        </span>
                        <span className='subtitle-1'>Estado</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full lg:px-6 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-auto lg:grow flex flex-col gap-4">
                    <div className="w-full grow lg:bg-card-light/40 lg:rounded-lg relative">
                        <h3 className="lg:hidden title-3">Pasos para el desarrollo de la instrucción</h3>
                        <div className="mt-4 lg:mt-0 w-[calc(100%+5px)] lg:w-full lg:h-full max-h-96 pr-2 lg:p-6 lg:absolute lg:top-0 lg:left-0 overflow-y-auto">
                            <div className="w-full flex flex-col gap-2">
                                <h3 className="hidden lg:block title-3">Pasos para el desarrollo de la instrucción</h3>
                                <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                                <p>Paso 2: Descargar Google Drive en su computadora.</p>
                                <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                                <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                                <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                                <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                                <p>Paso 2: Descargar Google Drive en su computadora.</p>
                                <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                                <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                                <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                                <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                                <p>Paso 2: Descargar Google Drive en su computadora.</p>
                                <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                                <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                                <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                                <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                                <p>Paso 2: Descargar Google Drive en su computadora.</p>
                                <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                                <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                                <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                                <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                                <p>Paso 2: Descargar Google Drive en su computadora.</p>
                                <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                                <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                                <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="title-3 text-stannum">Entregable</h3>
                        <p className="mt-2 text-stannum">Debes subir una captura de pantalla de la organización de las áreas principales y añadir la captura en &ldquo;Tu trabajo&rdquo; cuando ingresan en la instrucción.</p>
                    </div>
                </div>
                <div className="w-full max-w-md lg:max-w-sm aspect-square">
                    {
                        status === 'PENDING' ?
                            <div className="size-full p-6 bg-invalid/25 border-2 border-dashed border-invalid rounded-lg flex flex-col justify-center items-center gap-4">
                                <CrossIcon className="size-10 text-invalid"/>
                                <h3 className="pb-2 title-3 border-b border-white/10">Instrucción pendiente</h3>
                                <p>¡Preparate para comenzar!</p>
                                <button
                                    type="button"
                                    onClick={ () => { setStatus('IN_PROCESS') } }
                                    className="w-36 h-10 bg-invalid hover:bg-invalid/75 rounded tracking-tighter transition-200"
                                >Comenzar</button>
                            </div>
                        : status === 'IN_PROCESS' ?
                            <div className="size-full p-6 bg-transparent border-2 border-dashed border-stannum rounded-lg flex flex-col justify-center items-center gap-4 group relative">
                                <UploadIcon className="size-10 text-stannum"/>
                                <h3 className="pb-2 title-3 border-b border-white/10">Instrucción en proceso</h3>
                                <label htmlFor="uploadFile">Sube tu archivo aquí.</label>
                                <button
                                    type="button"
                                    className="w-36 h-10 group-hover:bg-stannum/40 rounded-full border-2 border-solid border-stannum text-stannum tracking-tighter transition-200"
                                >
                                    Subir archivo
                                </button>
                                <input
                                    onClick={ () => { setStatus('IN_REVIEW') } }
                                    id="uploadFile"
                                    name="uploadFile"
                                    ref={fileInputRef}
                                    type="file"
                                    className="size-full opacity-0 absolute top-0 left-0 cursor-pointer" 
                                />
                                <div className="text-center text-xs text-white/75 font-thin flex flex-col absolute bottom-6 left-0 right-0 mx-auto">
                                    <p>Tamaño máximo <b className="font-semibold">15MB</b></p>
                                    <p>Formato <b className="font-semibold">JPG & PNG</b></p>
                                </div>
                            </div>
                        : status === 'IN_REVIEW' ?
                            <div onClick={ () => { setStatus('COMPLETED') } } className="size-full p-6 bg-stannum/40 border-2 border-dashed border-stannum rounded-lg flex flex-col justify-center items-center gap-4 group relative">
                                <HourglassIcon className="size-10 text-stannum"/>
                                <h3 className="pb-2 title-3 border-b border-white/10">Instrucción en revisión</h3>
                                <p className="w-full text-center">Proximamente veras aquí reflejado el resultado de tu instrucción.</p>
                            </div>
                        : status === 'COMPLETED' &&
                            <div className="size-full p-6 bg-gradient-to-br from-stannum to-stannum-light/75 border-2 border-stannum rounded-lg flex flex-col justify-center items-center gap-4 group relative">
                                <div className="size-14 bg-stannum-light rounded-full flex justify-center items-center shadow-sm">
                                    <CheckIcon className="size-10"/>
                                </div>
                                <h3 className="pb-2 title-3 border-b border-white/10">Instrucción completada</h3>
                                <p className="text-6xl font-black">86<small className="text-xl font-thin opacity-75">/100</small></p>
                                <p className="text-center absolute bottom-6 left-0 right-0 mx-auto">Tu tiempo | 30:58</p>
                            </div>
                    }
                </div>
            </div>
            <div className="mt-6 w-full p-6 pb-0 border-t border-white/10">
                <h3 className="title-3">Videos de apoyo</h3>
            </div>
        </div>
    )
}

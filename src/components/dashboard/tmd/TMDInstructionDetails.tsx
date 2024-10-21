import { CrossIcon, CrownIcon } from "@/icons"

export const TMDInstructionDetails = () => {
    return (
        <div className="w-full py-6 bg-card rounded-lg">
            <div className='col-span-3 w-full px-6 flex flex-col'>
                <span className='subtitle-1'>Instrucción 01</span>
                <h2 className='w-full title-2 text-xl'>Organización digital Organización digital Organización digital Organización digital Organización digital Organización digital Organización digital Organización digital</h2>
            </div>
            <div className="mt-6 p-6 pt-0 border-b border-white/10 flex gap-12">
                <div className='flex items-center gap-2 relative'>
                    <div className='size-10 rounded-full bg-invalid/25 flex justify-center items-center shrink-0'>
                        <span className='text-xl text-invalid'>D</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Baja</span>
                        <span className='subtitle-1'>Dificultad</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 relative'>
                    <div className='size-10 rounded-full bg-invalid/25 flex justify-center items-center shrink-0'>
                        <span className='text-xl text-invalid'>
                            <CrownIcon />
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span>200 XP</span>
                        <span className='subtitle-1'>Recompensa</span>
                    </div>
                </div>
                <div className='flex items-center gap-2 relative'>
                    <div className='size-10 rounded-full bg-invalid/25 flex justify-center items-center shrink-0'>
                        <span className='text-xl text-invalid'>
                            <CrossIcon className='size-4' />
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span>Pendiente</span>
                        <span className='subtitle-1'>Estado</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full px-6 flex gap-6">
                <div className="grow">
                    <div className="w-full flex flex-col gap-2">
                        <h2 className="title-3">Pasos para el desarrollo de la instrucción</h2>
                        <p>Paso 1: Crear una cuenta en Google Drive, en caso de no tenerla.</p>
                        <p>Paso 2: Descargar Google Drive en su computadora.</p>
                        <p>Paso 3: Descargar la carpeta &ldquo;El nombre del negocio&rdquo; en tu escritorio haciendo click en el link adjunto y subirlo a tu cuenta de Google Drive.</p>
                        <p>Paso 4: Descargar la aplicación de Google Drive en tu celular y acceder a tu cuenta.</p>
                        <p>Paso 5: Dar acceso a los miembros de tu equipo a las carpetas correspondientes.</p>
                    </div>
                    <div className="mt-6 w-full">
                        <h2 className="title-3 text-stannum">Entregable</h2>
                        <p className="mt-2 text-stannum">Debes subir una captura de pantalla de la organización de las áreas pprincipales y agregar la captura en &ldquo;Tu trabajo&rdquo; cuandoo ingresan en la instrucción.</p>
                    </div>
                </div>
                <div className="w-full max-w-sm aspect-square bg-invalid/25 border-2 border-dashed border-invalid rounded-lg flex flex-col justify-center items-center gap-4">
                    <CrossIcon className="size-10 text-invalid"/>
                    <h2 className="pb-2 title-3 border-b border-white/10">Instrucción pendiente</h2>
                    <p>¡Preparate para comenzar!</p>
                    <button type="button" className="w-36 h-10 bg-invalid hover:bg-invalid/75 rounded tracking-tighter transition-200">Comenzar</button>
                </div>
            </div>
            <div className="mt-6 w-full p-6 pb-0 border-t border-white/10">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum error soluta reprehenderit asperiores? Dolor aspernatur voluptatum tempora ratione. Minima tempore soluta accusamus libero placeat omnis beatae at et dolorum illo!</p>
            </div>
        </div>
    )
}

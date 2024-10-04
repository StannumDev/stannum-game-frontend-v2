'use client'

import { ChangeEvent, useRef, useState } from "react";
import { motion } from 'framer-motion';
import AvatarEditor from 'react-avatar-editor';
import { MdAddAPhoto } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";
// import { FormErrorMessage, SubmitButtonLoading } from "@/components";
import styles from "@/components/styles/registerPhotoStep.module.css"
export const RegisterPhotoStep = () => {

    const [isLoading] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1)
    const [rotate, setRotate] = useState<number>(0)
    const [file, setFile] = useState<string|null>(null)
    const editorRef = useRef(null);
    
    const handleFileChange = (event:ChangeEvent<HTMLInputElement>):void => {
        if (!event?.target?.files || !event?.target?.files[0]){
            return;
        }
        
        const fileSizeInMB = event.target.files[0].size / (1024 * 1024);
        if (fileSizeInMB > 20) {
            // callToast({ message: 'El archivo no puede superar los 20 MB' });
            return;
        }
        setFile(URL.createObjectURL(event.target.files[0]));
        return;
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-center text-white">¡Añade una foto de perfil!</p>
            {
                !file ?
                <div className="mt-4 w-full max-w-sm aspect-square relative">
                    <div className="size-full border-2 border-dashed border-card-lightest rounded-lg flex justify-center items-center relative z-20 pointer-events-none">
                        <MdAddAPhoto className="text-card-lightest text-8xl"/>
                    </div>
                    <label htmlFor="photo" className="size-full absolute top-0 left-0 rounded-lg z-10">
                        <input
                            id="photo"
                            type="file"
                            accept=".jpg, .jpeg, .png, .webp, .avif, .tiff"
                            className="size-full absolute top-0 left-0 opacity-0"
                            onChange={handleFileChange}
                            />
                    </label>
                </div>
                :
                <div className="mt-4 w-full max-w-sm flex flex-col justify-center items-center">
                    <div className="w-full aspect-square relative">
                        <AvatarEditor
                            ref={editorRef}
                            image={file}
                            width={1080}
                            height={1080}
                            border={0}
                            borderRadius={9999999}
                            color={[31, 31, 31, 0.6]}
                            scale={zoom}
                            rotate={rotate}
                            className={'!size-full absolute top-0 left-0 rounded'}
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full flex justify-center items-center gap-1">
                            <label htmlFor="zoom" className="w-16 text-center text-base lg:text-lg text-white">x{zoom} <span className="sr-only">Elegir zoom</span></label>
                            <input
                                type='range'
                                name="zoom"
                                id="zoom"
                                min={1}
                                max={4}
                                step={0.01}
                                value={zoom}
                                onChange={ (e) => { setZoom(parseFloat(e.target.value)) }}
                                className={styles.range__input}
                            />
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center gap-1">
                            <label htmlFor="zoom" className="w-16 text-center text-base lg:text-lg text-white">{rotate}°<span className="sr-only">Elegir rotación</span></label>
                            <input
                                type='range'
                                name="rotate"
                                id="rotate"
                                min={0}
                                max={360}
                                step={1}
                                value={rotate}
                                onChange={ (e) => { setRotate(parseInt(e.target.value)) }}
                                className={styles.range__input}
                            />
                        </div>
                    </div>
                </div>
            }
            <div className="mt-8 w-full flex justify-center items-center gap-4">
                <motion.button
                    whileTap={{scale: !isLoading ? 1.05 : 1 }}
                    whileHover={{ backgroundColor: '#515151'}}
                    disabled={isLoading}
                    type="submit"
                    className="w-full md:w-32 h-10 text-sm font-semibold bg-card-light disabled:bg-card-lighter rounded tracking-tighter text-white flex justify-center items-center"
                >
                    Omitir
                </motion.button>
                <motion.button
                    whileTap={{scale: !isLoading ? 1.05 : 1 }}
                    whileHover={{ backgroundColor: '#8cdccd'}}
                    disabled={isLoading}
                    type="button"
                    className="w-full md:w-32 h-10 text-sm font-semibold bg-stannum disabled:bg-stannum-hover rounded tracking-tighter text-white flex justify-center items-center"
                >
                    {
                        isLoading ?
                            <LiaSpinnerSolid className="animate-spin size-6"/>
                        :
                            'Continuar'
                    }
                </motion.button>
            </div>
        </div>
    )
}

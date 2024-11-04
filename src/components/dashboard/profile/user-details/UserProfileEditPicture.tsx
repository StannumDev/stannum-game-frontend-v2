'use client'

import { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { AddPhotoIcon, EditIcon, SpinnerIcon } from "@/icons";
import { Modal } from "@/components";
import AvatarEditor from 'react-avatar-editor';
import styles from "@/components/styles/pictureEditor.module.css";

interface Props{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const UserProfileEditPicture = ({showModal, setShowModal}:Props) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
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

    const onSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(false);
        }, 2000);
    }

    useEffect(() => {
        setFile(null);
        setZoom(1);
        setRotate(0);
    }, [showModal])

    return (
        <Fragment>
            <div className="content-visibility-hidden lg:content-visibility-visible">
                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="size-8 rounded-xl lg:flex justify-center items-center bg-card-light hover:bg-card-lighter group/container opacity-0 group-hover/picture:opacity-100 absolute top-2 right-2 z-20 transition-200"
                >
                    <span className="sr-only">Editar portada</span>
                    <EditIcon className="size-5 text-neutral-400 group-hover/container:text-white transition-200"/>
                </button>
            </div>
            <Modal
                className="max-w-md h-auto"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className="w-full flex flex-col justify-center items-center">
                    {
                        !file ?
                        <div className="w-full max-w-sm aspect-square relative">
                            <div className="size-full border-2 border-dashed border-card-lightest rounded-lg flex justify-center items-center relative z-20 pointer-events-none">
                                <AddPhotoIcon className="text-card-lightest text-8xl"/>
                            </div>
                            <label htmlFor="photo" className="size-full absolute top-0 left-0 rounded-lg z-10">
                                <input
                                    id="photo"
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .webp, .avif, .tiff"
                                    className="size-full absolute top-0 left-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    />
                            </label>
                        </div>
                        :
                        <div className="w-full max-w-sm flex flex-col justify-center items-center">
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
                                    <label htmlFor="zoom" className="w-16 text-center lg:text-lg">x{zoom} <span className="sr-only">Elegir zoom</span></label>
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
                                    <label htmlFor="zoom" className="w-16 text-center lg:text-lg">{rotate}°<span className="sr-only">Elegir rotación</span></label>
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
                    { file &&
                        <div className="mt-8 w-full flex justify-center items-center gap-4">
                            <button
                                disabled={isLoading}
                                onClick={() => setShowModal(false)}
                                type="submit"
                                className="w-full h-10 text-sm font-semibold bg-card-light hover:bg-card-lighter disabled:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={onSubmit}
                                disabled={isLoading}
                                className="w-full h-10 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:bg-stannum-light rounded tracking-tighter flex justify-center items-center transition-200"
                            >
                                {
                                    isLoading ?
                                        <SpinnerIcon className="animate-spin size-6"/>
                                    :
                                        'Continuar'
                                }
                            </button>
                        </div>
                    }
                </div>
            </Modal>
        </Fragment>
    )
}
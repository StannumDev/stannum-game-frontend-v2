'use client'

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedImage, uploadProfilePhoto } from "@/services";
import { errorHandler } from "@/helpers";
import { RotateRightIcon, SpinnerIcon } from "@/icons";
import { AppError } from "@/interfaces";
import { Modal } from "@/components";
import styles from "@/components/styles/photoEditor.module.css";

interface Props{
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    imageSrc: string | null,
    onClose?: () => void,
    onPhotoUploaded?: () => void
}

export const UserProfileEditPhoto = ({showModal, setShowModal, imageSrc, onClose, onPhotoUploaded}:Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCropperReady, setIsCropperReady] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setIsLoading(true);
        try {
            const imageBlob = await getCroppedImage(imageSrc, croppedAreaPixels, rotate);
            const formData = new FormData();
            formData.append("photo", imageBlob);
            await uploadProfilePhoto(formData);
            onPhotoUploaded?.();
            setShowModal(false);
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            setCroppedAreaPixels(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotate(0);
            setIsCropperReady(false);
            const timeout = setTimeout(() => setIsCropperReady(true), 350);
            return () => clearTimeout(timeout);
        } else {
            setIsCropperReady(false);
            onClose?.();
            return;
        }
    }, [showModal, imageSrc, onClose]);

    return (
        <Modal
            className="max-w-md h-auto"
            showModal={showModal}
            setShowModal={setShowModal}
            disableClose={isLoading}
        >
            <div className="w-full flex flex-col justify-center items-center">
                { imageSrc &&
                    <div className="w-full max-w-sm flex flex-col justify-center items-center">
                        <div className="w-full aspect-square relative overflow-hidden rounded">
                            { isCropperReady && <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotate}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onRotationChange={setRotate}
                                onCropComplete={onCropComplete}
                                style={{ cropAreaStyle: { color: 'rgba(31, 31, 31, 0.6)' } }}
                            /> }
                        </div>
                        <div className="mt-4 w-full">
                            <div className="w-full flex justify-center items-center gap-2">
                                <label htmlFor="edit-zoom" className="w-16 text-center lg:text-lg">x{Math.round(zoom * 10) / 10} <span className="sr-only">Elegir zoom</span></label>
                                <input
                                    type='range'
                                    name="zoom"
                                    id="edit-zoom"
                                    min={1}
                                    max={4}
                                    step={0.01}
                                    value={zoom}
                                    disabled={isLoading}
                                    onChange={ (e) => { setZoom(parseFloat(e.target.value)) }}
                                    className={styles.range__input}
                                />
                                <div className="size-8 shrink-0"/>
                            </div>
                            <div className="mt-4 w-full flex justify-center items-center gap-2">
                                <label htmlFor="edit-rotate" className="w-16 text-center lg:text-lg">{rotate}°<span className="sr-only">Elegir rotación</span></label>
                                <input
                                    type='range'
                                    name="rotate"
                                    id="edit-rotate"
                                    min={0}
                                    max={360}
                                    step={1}
                                    value={rotate}
                                    disabled={isLoading}
                                    onChange={ (e) => { setRotate(parseInt(e.target.value)) }}
                                    className={styles.range__input}
                                />
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => setRotate((prev) => ((Math.floor(prev / 90) + 1) * 90) % 360)}
                                    className="size-8 shrink-0 flex justify-center items-center rounded-lg hover:bg-card-lighter disabled:opacity-50 transition-200"
                                    title="Rotar 90°"
                                >
                                    <RotateRightIcon className="size-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="mt-8 w-full flex justify-center items-center gap-4">
                    <button
                        disabled={isLoading}
                        onClick={() => setShowModal(false)}
                        type="button"
                        className="w-full h-10 text-sm font-semibold bg-card-light hover:bg-card-lighter disabled:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={isLoading}
                        className="w-full h-10 text-sm font-semibold bg-stannum hover:bg-stannum-light disabled:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center transition-200"
                    >
                        { isLoading ? <SpinnerIcon className="animate-spin size-6"/> : 'Guardar foto' }
                    </button>
                </div>
            </div>
        </Modal>
    )
}

'use client';

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedImage, uploadProfilePhoto } from "@/services";
import { AddPhotoIcon, RotateRightIcon, SpinnerIcon } from "@/icons";
import { AppError } from "@/interfaces";
import { errorHandler } from "@/helpers";
import styles from "@/components/styles/photoEditor.module.css";

export const RegisterPhotoStep = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        const fileSizeInMB = selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > 20) {
            return;
        }
        setFile(selectedFile);
        setImageSrc(URL.createObjectURL(selectedFile));
    };

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
            navigateToDashboard();
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToDashboard = () => window.location.replace('/dashboard');

    useEffect(() => {
        return () => {
            if (imageSrc) URL.revokeObjectURL(imageSrc);
        };
    }, [imageSrc]);

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-center">¡Añade una foto de perfil!</p>
            {!file ?
                <div className="mt-4 w-full max-w-sm aspect-square relative">
                    <div className="size-full border-2 border-dashed border-card-lightest rounded-lg flex justify-center items-center relative z-20 pointer-events-none">
                        <AddPhotoIcon className="text-card-lightest text-8xl" />
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
            : imageSrc &&
                <div className="mt-4 w-full max-w-sm flex flex-col justify-center items-center">
                    <div className="w-full aspect-square relative overflow-hidden rounded">
                        <Cropper
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
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full flex justify-center items-center gap-1">
                            <label htmlFor="zoom" className="w-16 text-center lg:text-lg">
                                x{Math.round(zoom * 10) / 10} <span className="sr-only">Elegir zoom</span>
                            </label>
                            <input
                                type="range"
                                name="zoom"
                                id="zoom"
                                min={1}
                                max={4}
                                step={0.01}
                                value={zoom}
                                disabled={isLoading}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className={styles.range__input}
                            />
                            <div className="size-8 shrink-0"/>
                        </div>
                        <div className="mt-4 w-full flex justify-center items-center gap-1">
                            <label htmlFor="rotate" className="w-16 text-center lg:text-lg">
                                {rotate}° <span className="sr-only">Elegir rotación</span>
                            </label>
                            <input
                                type="range"
                                name="rotate"
                                id="rotate"
                                min={0}
                                max={360}
                                step={1}
                                value={rotate}
                                disabled={isLoading}
                                onChange={(e) => setRotate(parseInt(e.target.value))}
                                className={styles.range__input}
                            />
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setRotate((prev) => ((Math.floor(prev / 90) + 1) * 90) % 360)}
                                className="size-8 flex justify-center items-center rounded hover:bg-card-lighter disabled:opacity-50 transition-200"
                                title="Rotar 90°"
                            >
                                <RotateRightIcon className="size-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="mt-8 w-full flex justify-center items-center gap-4">
                <motion.button
                    whileTap={{ scale: !isLoading ? 1.05 : 1 }}
                    whileHover={{ backgroundColor: '#515151' }}
                    disabled={isLoading}
                    type="button"
                    className="w-full md:w-32 h-10 text-sm font-semibold bg-card-light disabled:bg-card-lighter rounded tracking-tighter flex justify-center items-center"
                    onClick={navigateToDashboard}
                >
                    Omitir
                </motion.button>
                <motion.button
                    whileTap={{ scale: !isLoading ? 1.05 : 1 }}
                    whileHover={{ backgroundColor: '#4fffdc' }}
                    disabled={isLoading}
                    type="button"
                    className="w-full md:w-32 h-10 text-sm font-semibold bg-stannum disabled:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center"
                    onClick={handleUpload}
                >
                    {isLoading ? <SpinnerIcon className="animate-spin size-6" /> : "Guardar foto"}
                </motion.button>
            </div>
        </div>
    );
};

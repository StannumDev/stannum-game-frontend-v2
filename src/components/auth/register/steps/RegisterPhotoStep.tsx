'use client';

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AvatarEditor from "react-avatar-editor";
import { preprocessImage, uploadProfilePhoto } from "@/services";
import { AddPhotoIcon, SpinnerIcon } from "@/icons";
import { AppError } from "@/interfaces";
import { errorHandler } from "@/helpers";
import styles from "@/components/styles/photoEditor.module.css";

export const RegisterPhotoStep = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);
    const editorRef = useRef<AvatarEditor | null>(null);
    const router = useRouter();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;
        const fileSizeInMB = selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > 20) {
            console.log("El archivo no puede superar los 20 MB.");
            return;
        }
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file || !editorRef.current) return;
        setIsLoading(true);
        try {
            const imageBlob = await preprocessImage(editorRef.current);
            const formData = new FormData();
            formData.append("photo", imageBlob!);
            await uploadProfilePhoto(formData);
            router.push('/dashboard');
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    };
    
    const navigateToDashboard = () => {
        router.push('/dashboard');
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p className="text-center">¡Añade una foto de perfil!</p>
            {!file ? (
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
            ) : (
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
                            className="!size-full absolute top-0 left-0 rounded"
                        />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full flex justify-center items-center gap-1">
                            <label htmlFor="zoom" className="w-16 text-center lg:text-lg">
                                x{zoom} <span className="sr-only">Elegir zoom</span>
                            </label>
                            <input
                                type="range"
                                name="zoom"
                                id="zoom"
                                min={1}
                                max={4}
                                step={0.01}
                                value={zoom}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className={styles.range__input}
                            />
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
                                onChange={(e) => setRotate(parseInt(e.target.value))}
                                className={styles.range__input}
                            />
                        </div>
                    </div>
                </div>
            )}
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
                    // whileHover={{ backgroundColor: '#66eae5' }}
                    disabled={isLoading}
                    type="button"
                    className="w-full md:w-32 h-10 text-sm font-semibold bg-stannum disabled:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center"
                    onClick={handleUpload}
                >
                    {isLoading ? <SpinnerIcon className="animate-spin size-6" /> : "Continuar"}
                </motion.button>
            </div>
        </div>
    );
};
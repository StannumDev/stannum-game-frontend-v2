'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import { CheckIcon, ClockIcon, CompassIcon, CrossIcon, CrownIcon, HourglassIcon, PlayIcon, SpinnerIcon, UploadIcon, ExternalLinkIcon } from "@/icons";
import { startInstruction, submitInstruction } from "@/services";
import { Instruction, InstructionDetails, Lesson, ProgramId, Resource } from "@/interfaces";
import { errorHandler, callToast } from "@/helpers";
import Link from "next/link";

interface Props {
    programId: ProgramId;
    instruction: Instruction;
    userInstruction?: InstructionDetails;
    relatedLessons: Lesson[];
}

type InstructionStatus = 'PENDING' | 'IN_PROCESS' | 'SUBMITTED' | 'GRADED';

const difficultyLabels: Record<string, string> = {
    LOW: 'Baja',
    MEDIUM: 'Media',
    HIGH: 'Alta',
};

function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

function formatEstimatedTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
}

export const ProgramInstructionDetails = ({ programId, instruction, userInstruction, relatedLessons }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [status, setStatus] = useState<InstructionStatus>(userInstruction?.status || 'PENDING');
    const [startDate, setStartDate] = useState<string | undefined>(userInstruction?.startDate);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submittedText, setSubmittedText] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const { id, title, shortDescription, description, difficulty, rewardXP, acceptedFormats, maxFileSizeMB, deliverableHint, resources, estimatedTimeSec, deliverableType, tools, steps } = instruction;

    const isStarted = status !== 'PENDING';
    const score = userInstruction?.score;
    const observations = userInstruction?.observations;

    const computeElapsed = useCallback(() => {
        if (!startDate) return 0;
        const start = new Date(startDate).getTime();
        const end = userInstruction?.submittedAt ? new Date(userInstruction.submittedAt).getTime() : Date.now();
        return Math.max(0, Math.floor((end - start) / 1000));
    }, [startDate, userInstruction?.submittedAt]);

    useEffect(() => {
        if (!startDate) return;
        setElapsedSeconds(computeElapsed());
        if (status !== 'IN_PROCESS') return;

        const interval = setInterval(() => {
            setElapsedSeconds(computeElapsed());
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate, status, computeElapsed]);

    const handleStart = async () => {
        setIsLoading(true);
        try {
            await startInstruction(programId, id);
            const now = new Date().toISOString();
            setStartDate(now);
            setStatus('IN_PROCESS');
        } catch (error: unknown) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    const processFile = (file: File) => {
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!acceptedFormats.includes(ext)) { callToast({ type: 'error', message: { title: 'Formato no válido', description: `El formato ${ext} no es válido. Formatos aceptados: ${acceptedFormats.join(', ')}` } }); if (fileInputRef.current) fileInputRef.current.value = ''; return; }
        if (file.size > maxFileSizeMB * 1024 * 1024) { callToast({ type: 'error', message: { title: 'Archivo muy grande', description: `El archivo excede el límite de ${maxFileSizeMB}MB.` } }); if (fileInputRef.current) fileInputRef.current.value = ''; return; }
        setSelectedFile(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const handleSubmit = async () => {
        if (deliverableType === 'file' && !selectedFile) { callToast({ type: 'warning', message: { title: 'Archivo requerido', description: 'Debes seleccionar un archivo antes de entregar.' } }); return; }
        if (deliverableType === 'text' && !submittedText.trim()) { callToast({ type: 'warning', message: { title: 'Texto requerido', description: 'Debes escribir tu respuesta antes de entregar.' } }); return; }

        setIsLoading(true);
        try {
            await submitInstruction(programId, id, {
                file: selectedFile || undefined,
                text: submittedText || undefined,
            });
            setStatus('SUBMITTED');
        } catch (error: unknown) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    const statusColor = status === 'PENDING' ? 'bg-invalid/25' : status === 'GRADED' ? 'bg-stannum/40' : status === 'SUBMITTED' ? 'bg-yellow-400/25' : 'bg-card-light';
    const statusTextColor = status === 'PENDING' ? 'text-invalid' : status === 'SUBMITTED' ? 'text-yellow-400' : 'text-stannum';
    const statusLabel = status === 'PENDING' ? 'Pendiente' : status === 'IN_PROCESS' ? 'En proceso' : status === 'SUBMITTED' ? 'En revisión' : 'Completado';
    const statusIcon = status === 'PENDING' ? <CrossIcon /> : status === 'IN_PROCESS' ? <CompassIcon /> : status === 'SUBMITTED' ? <HourglassIcon /> : <CheckIcon />;

    return (
        <div className="w-full lg:py-6 lg:bg-card lg:rounded-lg">
            <div className='w-full lg:px-6 flex flex-col'>
                <span className='subtitle-1'>Instrucción</span>
                <h2 className='w-full title-2 text-xl'>{title}</h2>
            </div>
            <div className="mt-6 pb-6 lg:p-6 lg:pt-0 border-b border-white/10 grid grid-cols-2 gap-4 lg:flex lg:gap-8 lg:flex-wrap">
                <div className='flex items-center gap-2'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${statusColor}`}>
                        <span className={`${statusTextColor}`}>{statusIcon}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>{statusLabel}</span>
                        <span className='subtitle-1'>Estado</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${statusColor}`}>
                        <span className={`text-xl ${statusTextColor}`}>D</span>
                    </div>
                    <div className='flex flex-col'>
                        <span>{difficultyLabels[difficulty] || difficulty}</span>
                        <span className='subtitle-1'>Dificultad</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${statusColor}`}>
                        <span className={`text-xl ${statusTextColor}`}><CrownIcon /></span>
                    </div>
                    <div className='flex flex-col'>
                        <span>{rewardXP} XP</span>
                        <span className='subtitle-1'>Recompensa</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`size-10 rounded-full flex justify-center items-center shrink-0 ${statusColor}`}>
                        <span className={`${statusTextColor}`}><ClockIcon className="size-5" /></span>
                    </div>
                    <div className='flex flex-col'>
                        {isStarted ?
                            <span className="flex items-center gap-2">
                                {formatTime(elapsedSeconds)}
                                {status === 'IN_PROCESS' && (() => {
                                    const delta = estimatedTimeSec - elapsedSeconds;
                                    const absDelta = Math.abs(delta);
                                    return (
                                        <span className={`text-xs font-bold ${delta >= 0 ? 'text-stannum' : 'text-invalid'}`}>
                                            {delta >= 0 ? '+' : '-'}{formatTime(absDelta)}
                                        </span>
                                    );
                                })()}
                            </span>
                        :
                            <span>~{formatEstimatedTime(estimatedTimeSec)}</span>
                        }
                        <span className='subtitle-1'>{isStarted ? 'Tiempo' : 'Tiempo estimado'}</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full lg:px-6 flex flex-col gap-6">
                <div className={`flex flex-col ${!isStarted ? 'lg:flex-row lg:items-start' : ''} gap-6`}>
                    <div className="grow">
                        <h3 className="title-3">Descripción</h3>
                        <p className="mt-2 text-white/75">{isStarted ? description : shortDescription}</p>
                    </div>
                    {!isStarted && (
                        <div className="flex flex-col gap-3 shrink-0">
                            <span className="text-xs font-bold uppercase tracking-widest text-invalid">¿Estás listo para entrenar?</span>
                            <button
                                type="button"
                                onClick={handleStart}
                                disabled={isLoading}
                                className="w-full lg:w-96 h-14 px-8 bg-invalid hover:bg-invalid/80 disabled:opacity-50 rounded-xl text-white flex items-center justify-between lg:justify-center gap-4 cursor-pointer transition-200"
                            >
                                {isLoading ? <SpinnerIcon className="size-6 animate-spin" /> :
                                    <>
                                        <span className="text-sm lg:text-lg font-bold uppercase tracking-wider">Comenzar instrucción</span>
                                        <PlayIcon className="size-6" />
                                    </>
                                }
                            </button>
                        </div>
                    )}
                </div>
                {isStarted && (
                    <div className="w-full flex flex-col lg:flex-row items-start gap-6">
                        <div className="w-full lg:w-auto lg:grow flex flex-col gap-6">
                            {steps.length > 0 &&
                                <div className="w-full lg:bg-card-light/40 lg:rounded-lg relative">
                                    <h3 className="lg:hidden title-3">Pasos para el desarrollo de la instrucción</h3>
                                    <div className="mt-4 lg:mt-0 w-[calc(100%+5px)] lg:w-full max-h-96 pr-2 lg:p-6 overflow-y-auto">
                                        <div className="w-full flex flex-col gap-2">
                                            <h3 className="hidden lg:block title-3">Pasos para el desarrollo de la instrucción</h3>
                                            {steps.map((step, i) => <p key={i}><b>Paso {i + 1}:</b> {step}</p>)}
                                        </div>
                                    </div>
                                </div>
                            }
                            {tools && tools.length > 0 &&
                                <div>
                                    <h3 className="title-3">Herramientas</h3>
                                    <p className="mt-2 text-white/75">{tools.join(', ')}</p>
                                </div>
                            }
                            {resources.length > 0 &&
                                <div>
                                    <h3 className="title-3">Recursos</h3>
                                    <div className="mt-2 flex flex-col gap-2">
                                        {resources.map((resource, i) => <ResourceItem key={i} resource={resource} />)}
                                    </div>
                                </div>
                            }
                            { relatedLessons.length > 0 && (
                                <div>
                                    <h3 className="title-3">Videos de apoyo</h3>
                                    <div className="mt-2 flex flex-col gap-2">
                                        {relatedLessons.map((lesson) => (
                                            <Link key={lesson.id} href={`/dashboard/library/${programId}/lessons/${lesson.id}`} className="w-fit flex items-center gap-2 text-stannum hover:underline">
                                                <ExternalLinkIcon className="size-4 shrink-0" />
                                                <span>{lesson.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="p-4 bg-stannum/10 border border-stannum/40 rounded-lg">
                                <h3 className="title-3">Entregable</h3>
                                <p className="mt-2">{deliverableHint}</p>
                            </div>
                        </div>
                        <div className="w-full max-w-md lg:max-w-sm lg:aspect-square shrink-0">
                            {status === 'IN_PROCESS' && deliverableType === 'file' &&
                                <div className={`group size-full p-6 border-2 border-dashed rounded-lg flex flex-col justify-center items-center gap-4 relative transition-200 ${selectedFile ? 'border-stannum bg-transparent' : 'border-stannum bg-transparent hover:bg-stannum/5 cursor-pointer'}`}>
                                    {!selectedFile &&
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept={acceptedFormats.join(',')}
                                            onChange={handleFileChange}
                                            className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                                        />
                                    }
                                    <UploadIcon className="size-10 text-stannum" />
                                    <h3 className="pb-2 title-3 border-b border-white/10">Tu trabajo</h3>
                                    {selectedFile ?
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm text-stannum text-center truncate max-w-[200px]">{selectedFile.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                className="text-xs text-white/50 hover:text-white underline"
                                            >
                                                Cambiar archivo
                                            </button>
                                        </div>
                                    :
                                        <>
                                            <p className="text-sm text-white/75">Hacé click o arrastrá tu archivo aquí</p>
                                            <span className="w-36 h-10 group-hover:bg-stannum/40 rounded-full border-2 border-solid border-stannum text-stannum tracking-tighter transition-200 flex justify-center items-center">
                                                Subir archivo
                                            </span>
                                        </>
                                    }
                                    {selectedFile &&
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                            className="w-36 h-10 bg-stannum hover:bg-stannum-light disabled:opacity-50 rounded-full text-card font-semibold tracking-tighter transition-200 flex justify-center items-center gap-2"
                                        >
                                            {isLoading ? <SpinnerIcon className="size-5 animate-spin text-card" /> : 'Enviar respuesta'}
                                        </button>
                                    }
                                    <div className="text-center text-xs text-white/75 font-thin flex flex-col absolute bottom-6 left-0 right-0 mx-auto">
                                        <p>Tamaño máximo <b className="font-semibold">{maxFileSizeMB}MB</b></p>
                                        <p>Formato <b className="font-semibold">{acceptedFormats.map(f => f.replace('.', '').toUpperCase()).join(' & ')}</b></p>
                                    </div>
                                </div>
                            }
                            {status === 'IN_PROCESS' && deliverableType === 'text' && (
                                <div className="size-full p-6 bg-transparent border-2 border-dashed border-stannum rounded-lg flex flex-col gap-4">
                                    <h3 className="title-3 border-b border-white/10 pb-2">Tu trabajo</h3>
                                    <textarea
                                        value={submittedText}
                                        onChange={(e) => setSubmittedText(e.target.value)}
                                        placeholder={deliverableHint}
                                        maxLength={5000}
                                        className="w-full grow bg-card-light/40 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-stannum"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/50">{submittedText.length}/5000</span>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isLoading || !submittedText.trim()}
                                            className="w-36 h-10 bg-stannum hover:bg-stannum-light disabled:opacity-50 rounded tracking-tighter transition-200 flex justify-center items-center gap-2"
                                        >
                                            {isLoading ? <SpinnerIcon className="size-5 animate-spin" /> : 'Enviar respuesta'}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {status === 'SUBMITTED' &&
                                <div className="size-full p-6 bg-yellow-400/25 border-2 border-dashed border-yellow-400 rounded-lg flex flex-col justify-center items-center gap-4">
                                    <HourglassIcon className="size-10 text-yellow-400" />
                                    <h3 className="pb-2 title-3 border-b border-white/10">Instrucción en revisión</h3>
                                    <p className="w-full text-center text-sm text-white/75">Próximamente verás aquí reflejado el resultado de tu instrucción.</p>
                                    <p className="text-sm"><b className="title-3 text-sm">Tu tiempo</b> | {formatTime(elapsedSeconds)}</p>
                                </div>
                            }
                            {status === 'GRADED' &&
                                <div className="size-full p-6 bg-gradient-to-br from-stannum to-stannum-light/75 border-2 border-stannum rounded-lg flex flex-col justify-center items-center gap-4 text-card">
                                    <div className="size-14 bg-stannum-light rounded-full flex justify-center items-center shadow-sm">
                                        <CheckIcon className="size-10" />
                                    </div>
                                    <h3 className="pb-2 title-3 border-b border-card/25">Instrucción completada</h3>
                                    {score !== undefined && <p className="text-6xl font-black">{score}<small className="text-xl font-thin opacity-60">/100</small></p>}
                                    {observations && <p className="text-base text-center">{observations}</p>}
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-xs uppercase tracking-wider opacity-60">Tu tiempo</span>
                                        <span className="text-xl font-semibold">{formatTime(elapsedSeconds)}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ResourceItem({ resource }: { resource: Resource }) {
    if (resource.link) {
        return (
            <a href={resource.link} target="_blank" rel="noopener noreferrer" className="w-fit flex items-center gap-2 text-stannum hover:underline">
                <ExternalLinkIcon className="size-4 shrink-0" />
                <span>{resource.title}</span>
            </a>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            <span className="text-white/75">{resource.title}</span>
            {resource.description && <span className="text-sm text-white/50">{resource.description}</span>}
            {resource.children && resource.children.length > 0 && <div className="ml-4 flex flex-col gap-1">{resource.children.map((child, i) => <ResourceItem key={i} resource={child} />)}</div>}
        </div>
    );
}

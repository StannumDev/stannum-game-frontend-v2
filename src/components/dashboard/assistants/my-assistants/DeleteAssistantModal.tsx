'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrossIcon, SpinnerIcon, TrashIcon } from '@/icons';
import { deleteAssistant } from '@/services';
import { errorHandler } from '@/helpers';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    assistantId: string;
    assistantTitle: string;
    onDeleted: () => void;
}

export const DeleteAssistantModal = ({ isOpen, onClose, assistantId, assistantTitle, onDeleted }: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteAssistant(assistantId);
            onDeleted();
            onClose();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen &&
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-card-light rounded-lg z-50 p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-invalid/10 rounded-lg">
                                    <TrashIcon className="text-2xl text-invalid" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Eliminar Asistente</h3>
                                    <p className="text-sm text-card-lightest">Esta acción no se puede deshacer</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-card-light transition-colors"
                                whileTap={{ scale: 0.95 }}
                                disabled={isDeleting}
                            >
                                <CrossIcon className="text-xl" />
                            </motion.button>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm text-card-lightest mb-2">¿Estás seguro que querés eliminar el asistente <span className="font-bold text-card-lightest">"{assistantTitle}"</span>?</p>
                            <p className="text-sm text-card-lighter">Se eliminará de forma permanente y no podrás recuperarlo.</p>
                        </div>
                        <div className="flex gap-3">
                            <motion.button
                                onClick={onClose}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 bg-card border border-card-light rounded-lg font-semibold hover:bg-card-light transition-colors disabled:opacity-50"
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-6 py-3 bg-invalid text-white rounded-lg font-semibold hover:bg-invalid/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                whileTap={{ scale: 0.95 }}
                            >
                                {isDeleting ? <>
                                    <SpinnerIcon className="animate-spin" />
                                    Eliminando...
                                </> : <>
                                    <TrashIcon />
                                    Eliminar
                                </>}
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            }
        </AnimatePresence>
    );
};
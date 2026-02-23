'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CrossIcon } from '@/icons';

interface Props{
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    className?: string;
    disableClose?: boolean;
    children: ReactNode;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const Modal = ({showModal, setShowModal, children, className, disableClose}:Props) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    const trapFocus = useCallback((e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, []);

    useEffect(() => {
        if(showModal) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            document.body.classList.add('overflow-hidden');

            requestAnimationFrame(() => {
                if (modalRef.current) {
                    const firstFocusable = modalRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
                    firstFocusable?.focus();
                }
            });
        } else {
            document.body.classList.remove('overflow-hidden');
            previousFocusRef.current?.focus();
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !disableClose) {
                setShowModal(false);
            }
            trapFocus(event);
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal, setShowModal, disableClose, trapFocus]);

    return (
        <AnimatePresence>
        {
            showModal &&
            <div className='w-full h-dvh fixed top-0 left-0 z-[99999999] overflow-y-scroll'>
                <div className={`w-full min-h-dvh px-4 pt-24 pb-20 flex justify-center items-center`}>
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.125 }}
                        className="w-full h-dvh bg-gradient-to-br from-black/75 to-black fixed top-0 left-0 z-10"
                        onClick={ () => { if(!disableClose) setShowModal(false) }}
                    ></m.div>
                    <m.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, transition: { delay: 0 } }}
                        transition={{
                            opacity: { delay: 0.1875 },
                            scale: { delay: 0.1875 },
                        }}
                        className={`w-full h-[75svh] lg:h-auto card relative z-50 ${className}`}
                    >
                        <button onClick={ () => { if(!disableClose) setShowModal(false) }} type={"button"} aria-label={'Cerrar'} className={`size-6 text-neutral-400 hover:text-neutral-300 flex justify-center items-center absolute -top-3 right-0 -translate-y-full z-[9999999999] transition-all duration-200 ease-in-out ${disableClose ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className="sr-only">Cerrar</span>
                            <CrossIcon className="size-8"/>
                        </button>
                        <div className="size-full overflow-hidden flex flex-col">
                            { children }
                        </div>
                    </m.div>
                </div>
            </div>
        }
        </AnimatePresence>
    )
}

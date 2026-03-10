'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Modal, STANNUMIcon } from '@/components';
import { useModalQueueStore } from '@/stores/modalQueueStore';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const MODAL_ID = 'install_prompt';
const MODAL_PRIORITY = 20;

export const InstallPromptModal = () => {
  const isMyTurn = useModalQueueStore(s => s.queue[0]?.id === MODAL_ID);
  const request = useModalQueueStore(s => s.request);
  const release = useModalQueueStore(s => s.release);
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [wantsToShow, setWantsToShow] = useState(false);

  useEffect(() => {
    const checkInstallationStatus = () => {
      const installed = window.matchMedia('(display-mode: standalone)').matches ||
                        window.matchMedia('(display-mode: window-controls-overlay)').matches ||
                        (navigator.userAgentData && navigator.userAgentData.brands.some(b => b.brand === "Edge Side Panel"));
      setIsInstalled(installed || false);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isInstalled) {
        setWantsToShow(true);
        request(MODAL_ID, MODAL_PRIORITY);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowModal(false);
      release(MODAL_ID);
    };

    const HIDE_INSTALLATION = Cookies.get('HIDE_INSTALLATION') === 'true';
    const TUTORIAL_FINISHED = Cookies.get('tutorial_initial_tutorial') === 'true';
    if(!HIDE_INSTALLATION && TUTORIAL_FINISHED){
      checkInstallationStatus();
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled, request, release]);

  // Solo mostrar cuando es su turno en la cola
  useEffect(() => {
    if (wantsToShow && isMyTurn) {
      setShowModal(true);
    }
  }, [wantsToShow, isMyTurn]);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setShowModal(false);
      release(MODAL_ID);
    });
  };

  const handleDontShowAgain = () => {
    Cookies.set('HIDE_INSTALLATION', 'true', { expires: 365 });
    setShowModal(false);
    release(MODAL_ID);
  };

  return (
    !isInstalled && (
      <Modal
        className="max-w-2xl h-auto"
        showModal={showModal}
        setShowModal={(v) => { setShowModal(v); if (!v) release(MODAL_ID); }}
      >
        <div className="size-full pt-4 lg:pt-8 text-center flex flex-col items-center">
          <STANNUMIcon className='w-20 lg:w-32 fill-stannum'/>
          <h2 className='mt-6 lg:mt-8 title-2 text-xl lg:text-3xl'>¡Instala STANNUM Game!</h2>
          <p className='mt-2 lg:mt-0 text-sm lg:text-base'>Disfruta de la <b className='text-stannum'>experiencia completa</b> en tu dispositivo instalando nuestra aplicación.</p>
          <div className='mt-4 lg:mt-6 w-full flex'>
            <button
              type="button"
              onClick={handleDontShowAgain}
              className="text-sm font-semibold text-white tracking-tighter flex justify-center items-center transition-200"
            >
              No mostrar más
            </button>
          </div>
          <div className='mt-2 w-full flex gap-4'>
            <button
              onClick={() => { setShowModal(false); release(MODAL_ID); }}
              type="button"
              className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter flex justify-center items-center transition-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center transition-200"
            >
              Instalar
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};
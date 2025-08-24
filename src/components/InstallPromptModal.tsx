'use client'

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Modal, STANNUMIcon } from '@/components';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPromptModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

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
      if (!isInstalled) setShowModal(true);
    };

    const HIDE_INSTALLATION = Cookies.get('HIDE_INSTALLATION') === 'true';
    const TUTORIAL_FINISHED = Cookies.get('initial_tutorial') === 'true';
    if(!HIDE_INSTALLATION && TUTORIAL_FINISHED){
      checkInstallationStatus();
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', () => {
        setIsInstalled(true);
        setShowModal(false);
      });
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => setIsInstalled(true));
    };
  }, [isInstalled]);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setShowModal(false);
    });
  };

  const handleDontShowAgain = () => {
    Cookies.set('HIDE_INSTALLATION', 'true', { expires: 365 });
    setShowModal(false);
  };

  return (
    !isInstalled && (
      <Modal
        className="max-w-2xl h-auto"
        showModal={showModal}
        setShowModal={setShowModal}
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
              onClick={() => { setShowModal(false) }}
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
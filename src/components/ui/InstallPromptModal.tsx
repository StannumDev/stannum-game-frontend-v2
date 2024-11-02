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

    if (!HIDE_INSTALLATION) {
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
        className="max-w-2xl"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="size-full pt-8 flex flex-col justify-start items-center">
          <STANNUMIcon className='w-32' pathClassName='fill-stannum'/>
          <h2 className='mt-8 title-2 text-3xl'>¡Instala STANNUM Game!</h2>
          <p>Disfruta de la <b className='text-stannum'>experiencia completa</b> en tu dispositivo instalando nuestra aplicación.</p>
          <div className='mt-6 w-full flex gap-4'>
            <button
              onClick={() => { setShowModal(false) }}
              type="button"
              className="w-full h-9 text-sm font-semibold bg-card-light hover:bg-card-lighter rounded tracking-tighter text-white flex justify-center items-center transition-200"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full h-9 text-sm font-semibold bg-stannum hover:bg-stannum-light rounded tracking-tighter text-white flex justify-center items-center transition-200"
            >
              Instalar
            </button>
            <button
              type="button"
              onClick={handleDontShowAgain}
              className="w-full h-9 text-sm font-semibold bg-transparent border-2 border-card-light rounded tracking-tighter text-white flex justify-center items-center transition-200"
            >
              No mostrar más
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};
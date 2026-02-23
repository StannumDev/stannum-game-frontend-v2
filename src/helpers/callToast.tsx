'use client'

import { toast, ToastOptions } from 'react-toastify';
import { CheckIcon, FireIcon, LevelUpIcon, MedalIcon, WarningOctagonIcon } from '@/icons';
import type { ToastData } from '@/interfaces';

export const callToast = ({ message, type = "success" }: ToastData): null => {
  const params: ToastOptions = {
    icon:
      type === 'success' ? <CheckIcon className='size-full text-stannum' /> :
      type === 'error' ? <WarningOctagonIcon className='size-full text-invalid' /> :
      type === 'warning' ? <WarningOctagonIcon className='size-full text-invalid' /> :
      type === 'achievement' ? <MedalIcon className='size-full text-stannum' /> :
      type === 'levelUp' ? <LevelUpIcon className='size-full text-stannum' /> :
      type === 'streak' && <FireIcon className='size-full text-amber-400' />,
    type: 'default',
    className: "contenedorToast",
  };

  toast(() => {
    return (
      <div className="bodyToast">
        <h2>{message.title}</h2>
        <p>{message.description}</p>
      </div>
    );
  }, params);

  return null;
};

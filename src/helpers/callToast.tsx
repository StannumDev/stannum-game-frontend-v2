'use client'

import { toast, ToastOptions } from 'react-toastify';
import * as motion from 'framer-motion/m';
import { CheckIcon, MedalIcon, WarningOctagonIcon } from '@/icons';
import type { ToastData } from '@/interfaces';

export const callToast = ({ message, type = "success" }: ToastData): null => {
  const params: ToastOptions = {
    icon:
      type === 'success' ? <CheckIcon className='size-full text-stannum' /> :
      type === 'error' ? <WarningOctagonIcon className='size-full text-invalid' /> :
      type === 'warning' ? <WarningOctagonIcon className='size-full text-amber-500' /> :
      type === 'achievement' && <MedalIcon className='size-full text-stannum' />,
    type: 'default',
    className: "contenedorToast",
  };

  toast(() => {
    return (
      <div className="bodyToast">
        <h2>{message.title}</h2>
        <motion.p layout className='line-clamp-2 hover:line-clamp-none'>{message.description}</motion.p>
      </div>
    );
  }, params);

  return null;
};
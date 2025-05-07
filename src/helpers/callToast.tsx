'use client'

import { toast, ToastOptions } from 'react-toastify';
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";
import type { ToastData } from '@/interfaces';

export const callToast = ({ message, type = "success" }: ToastData): null => {
  const params: ToastOptions = {
    icon: type === 'success' ? <FaCircleCheck className='size-5 text-stannum' /> : <MdOutlineError className='size-5 text-invalid' />,
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

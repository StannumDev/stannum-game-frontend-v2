'use client'

import { IoCloseOutline } from "react-icons/io5";

interface Props {
  closeToast?: () => void;
}

export const ToastCloseButton = ({closeToast}:Props) => {
  return (
    <button type='button' className="bg-transparent size-4 aspect-square flex justify-center items-center opacity-90 hover:opacity-100 absolute top-2 right-2 transition-150" onClick={closeToast}>
        <IoCloseOutline className="size-4 aspect-square object-contain"/>
    </button>
  )
}
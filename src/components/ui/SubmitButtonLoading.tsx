'use client'

import { SpinnerIcon } from '@/icons';

interface Props{
    isLoading: boolean;
    text: string;
    className?: string;
    form?: string;
}

export const SubmitButtonLoading = ({isLoading, text, form, className}:Props) => {
    return (
        <button
            type="submit"
            form={form}
            disabled={isLoading}
            className={`bg-stannum hover:bg-stannum-light disabled:bg-stannum-light rounded tracking-tighter flex justify-center items-center transition-200 ${className}`}
        >
            {
                isLoading ?
                    <SpinnerIcon className="animate-spin size-6"/>
                :
                    text
            }
        </button>
    )
}

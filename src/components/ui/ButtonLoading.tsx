import { LiaSpinnerSolid } from "react-icons/lia";

interface Props{
    isLoading: boolean;
    text: string;
    className?: string;
}

export const ButtonLoading = ({isLoading, text, className}:Props) => {
    return (
        <button disabled={isLoading} type="submit" className={`${className} bg-stannum hover:bg-stannum-hover disabled:bg-stannum-hover rounded-lg text-white flex justify-center items-center transition-all duration-200 ease-in-out`}>
            {
                isLoading ?
                    <LiaSpinnerSolid className="animate-spin size-6"/>
                :
                    text
            }
        </button>
    )
}

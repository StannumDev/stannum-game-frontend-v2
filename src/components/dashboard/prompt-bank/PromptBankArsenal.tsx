import { PlusIcon } from '@/icons';

export const PromptBankArsenal = () => {
    return (
        <section className='card grow'>
            <div className='flex justify-between items-start gap-4'>
                <h2 className='title-2'>Banco de PROMPTs</h2>
                <div>
                    <button className='px-4 py-3 font-semibold bg-stannum hover:bg-stannum-light text-card rounded tracking-tighter flex justify-center items-center gap-2 transition-200'>
                        <PlusIcon/>
                        Agregar un PROMPT
                    </button>
                </div>
            </div>
        </section>
    )
}

import { ArrowBackIcon } from '@/icons';
import { TMDLessonCard } from '@/components';

interface Props{
    restartNavigation: () => void
}

interface Lesson{
    index: number;
    title: string;
    completed: boolean
}

const modules:Array<Lesson> = [
    {
        index: 1,
        title: 'Introducción a la organización digital en la nube',
        completed: false
    },
    {
        index: 2,
        title: 'Áreas funcionales',
        completed: true
    }
]

export const PreseasonModuleOne = ({restartNavigation}:Props) => {
    return (
        <div className="w-full">
            <button type="button" onClick={restartNavigation} className='px-2 py-1 rounded-lg text-card-lightest hover:text-white flex justify-center items-center gap-1 lg:hover:bg-card-light transition-200'>
                <ArrowBackIcon/>
                <span className='font-semibold'>Atras</span>
            </button>
            <div className='mt-4 w-full flex flex-col gap-4'>
                {
                    modules.map((lesson, i) => (
                        <TMDLessonCard {...lesson} key={i}/>
                    ))
                }
            </div>
        </div>
    )
}

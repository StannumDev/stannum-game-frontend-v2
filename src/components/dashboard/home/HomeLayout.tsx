import { MotionWrapperLayout, PresentacionHome, GoalsHome, ContinuarHome, ActivarProductoHome } from "@/components"

export const HomeLayout = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-8">
        <div className="col-span-7 min-h-svh flex flex-col justify-start items-start gap-8">
            <MotionWrapperLayout children={<PresentacionHome/>} />
            <MotionWrapperLayout children={<GoalsHome/>} />
            <MotionWrapperLayout children={<ContinuarHome/>} />
        </div>
        <div className="col-span-5 min-h-svh flex flex-col justify-start items-start gap-8">
            <MotionWrapperLayout children={<ActivarProductoHome/>} />
        </div>
    </div>
  )
}

import { MotionWrapperLayout, PresentacionHome, GoalsHome, ContinuarHome, ActivarProductoHome, RankingHome } from "@/components"

export const HomeLayout = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-8">
        <div className="col-span-7 min-h-svh flex flex-col justify-start items-start gap-8">
            <MotionWrapperLayout>
              <PresentacionHome/>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
              <GoalsHome/>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
              <ContinuarHome/>
            </MotionWrapperLayout>
        </div>
        <div className="col-span-5 min-h-svh flex flex-col justify-start items-start gap-8">
            <MotionWrapperLayout>
              <ActivarProductoHome/>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
              <RankingHome/>
            </MotionWrapperLayout>
        </div>
    </div>
  )
}

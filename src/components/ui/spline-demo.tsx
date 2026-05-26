'use client'

import { SplineScene } from "./splite";
import { Card } from "./card"
import { Spotlight } from "./spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-white/10 rounded-3xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
            Interactive 3D Design
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg leading-relaxed text-sm md:text-base">
            Bring your interfaces to life with interactive 3D elements. Beautiful, real-time responsive scenes engineered to create high-end, premium user experiences.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative w-full h-[250px] md:h-full min-h-[250px]">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}

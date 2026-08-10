"use client"

import { useMariaCharacterStore } from "@/stores/maria-character-store"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { useMemo } from "react"

// Lazy load heavy libs
const Lottie = dynamic(() => import("@lottiefiles/react-lottie-player").then(m => m.Player), { ssr: false })
const VRMController = dynamic(() => import("./maria-vrm-blendshapes").then(m => m.VRMController), { ssr: false })

type Mode = "framer" | "vrm" | "lottie"

export function MariaAvatarUnified({ mode = "framer", className }: { mode?: Mode; className?: string }) {
 const { presenceState, speechState } = useMariaCharacterStore()
 const isActive = presenceState === "speaking" || speechState.isPlaying

 return useMemo(() => {
 switch (mode) {
 case "framer":
 return (
 <motion.div
 animate={{ y: isActive ? [0, -6, 0] : 0, scale: isActive ? 1.04 : 1 }}
 transition={{ repeat: isActive ? Infinity : 0, duration: 0.8, ease: "easeInOut" }}
 className={className}
 >
 {/* Fallback image/VRM canvas */}
 <img src="/maria-avatar.png" alt="Maria" className="w-full h-full object-contain rounded-full pointer-events-none" />
 </motion.div>
 )

 case "lottie":
 return (
 <Lottie
 src={`/assets/maria-${presenceState}.json`}
 loop={presenceState !== "idle"}
 autoplay
 className={className}
 />
 )

 case "vrm":
 return <VRMController state={presenceState} className={className} />
 }
 }, [mode, presenceState, isActive, className])
}
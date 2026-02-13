"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import AnimatedMessage from "@/components/AnimatedMessage";

const ANIM_DURATION = 1.5;

const GlobalBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fdf2f8,_#fce7f3,_#fbcfe8)] animate-pulse brightness-110" />
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
  </div>
);
export default function Home() {
  const [appState, setAppState] = useState<"message" | "landing" | "game" | "proposal">("message");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startExperience = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAppState("game");
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAppState("proposal");
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  const handleMessageComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAppState("landing");
      setIsTransitioning(false);
    }, ANIM_DURATION * 1000);
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-rose-50 overflow-hidden">
      <GlobalBackground />

      <AnimatePresence mode="wait">
        {appState === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIM_DURATION }}
            className="relative z-10 w-full h-full"
          >
            <AnimatedMessage onComplete={handleMessageComplete} />
          </motion.div>
        )}

        {appState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.1 : 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: ANIM_DURATION }}
            className="relative z-10 flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-white/30 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/40 max-w-lg"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-rose-600 mb-6 tracking-tight leading-tight">
                Wait Wait Wait <br /> 
              </h1>
              <p className="text-rose-500 font-medium text-lg mb-10 leading-relaxed italic">
                Before the big question, let's give you a special test.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(225, 29, 72, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={startExperience}
                className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg transition-all"
              >
                click to start (;
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {appState === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 0.9 : 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: ANIM_DURATION, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center w-full px-4"
          >
            <PhotoPairGame handleShowProposal={handleShowProposal} />
            <div className="mt-8 md:mt-12">
              <TextFooter />
            </div>
          </motion.div>
        )}

        {appState === "proposal" && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIM_DURATION, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <ValentinesProposal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

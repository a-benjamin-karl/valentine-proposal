"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ValentinesProposal from "@/components/ValentinesProposal";

export default function DebugProposal() {
  const [showProposal, setShowProposal] = useState(false);

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-rose-50 overflow-hidden">
      {!showProposal ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
              💌
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-rose-600 mb-6 tracking-tight leading-tight">
              Debug Mode
            </h1>
            <p className="text-rose-500 font-medium text-lg mb-10 leading-relaxed">
              Test the Valentine proposal page directly
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(225, 29, 72, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProposal(true)}
              className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg transition-all"
            >
              Go to Proposal 💕
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <ValentinesProposal />
      )}
    </main>
  );
}

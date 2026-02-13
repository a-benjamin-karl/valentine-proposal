import { useState, useEffect } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
// @ts-expect-error - library types are sometimes not indexed correctly by IDE
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  display: "swap",
  subsets: ["latin"],
});

// 36 images - using your .jpeg files
const images = Array.from({ length: 36 }, (_, i) => `/game-photos/${(i % 18) + 1}.jpeg`);

const guiltMessages = [
  "Are you sure? 😢",
  "Really really sure? 💔",
  "Think again... 😭",
  "That hurts you know 🥺",
  "I’ll cry now 😭😭",
  "Last chance… 💔",
  "You’re breaking my heart 💔",
  "Please say yes? 🙏",
  "Look at the hamster! 🐹",
  "Don't do this to me... 🥀"
];

const FloatingHearts = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: "-10vh"
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
          className="absolute text-pink-400 text-3xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default function ValentinesProposal() {
  const [mounted, setMounted] = useState(false);

  const [step, setStep] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [guiltIndex, setGuiltIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [position, setPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 70 + 15; // Keep away from edges (15% - 85%)
    const randomLeft = Math.random() * 70 + 15; // Keep away from edges (15% - 85%)
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  const handleNoInteraction = () => {
    setYesScale((prev: number) => {
      const newScale = prev + 0.15;
      return newScale > 3 ? 3 : newScale; // Cap at 3x scale
    });
    if (moveCount < 10) {
      setPosition(getRandomPosition());
      setMoveCount((prev: number) => prev + 1);
    } else {
      setGuiltIndex((prev: number) => (prev + 1) % guiltMessages.length);
    }
  };

  if (!mounted) return null;

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100 via-pink-200 to-rose-300 ${montserrat.className}`}>
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 flex flex-col items-center p-8 md:p-12 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 max-w-2xl w-[90%] text-center"
          >
            <div className="absolute inset-0 grid grid-cols-6 opacity-5 pointer-events-none rounded-3xl overflow-hidden">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full aspect-square">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <h2 className={`text-4xl md:text-6xl font-bold mb-8 text-rose-700 leading-tight ${playfairDisplay.className}`}>
              Will you be my Valentine? ❤️
            </h2>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-48 h-48 md:w-64 md:h-64 mb-8"
            >
              <Image
                src="/sad_hamster.png"
                alt="Sad Hamster"
                fill
                className="object-contain drop-shadow-xl"
              />
            </motion.div>

            {moveCount >= 10 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-600 font-semibold mb-4 text-xl h-8"
              >
                {guiltMessages[guiltIndex]}
              </motion.p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-8 mt-6 min-h-[80px]">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(225, 29, 72, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-3 text-xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg transition-all"
                style={{ scale: yesScale }}
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </motion.button>

              <motion.button
                className="px-8 py-3 text-xl font-semibold text-rose-600 bg-white/80 rounded-full border-2 border-rose-200 shadow-md transition-all hover:bg-rose-50"
                style={
                  position
                    ? {
                      position: "fixed",
                      top: position.top,
                      left: position.left,
                      zIndex: 50
                    }
                    : {}
                }
                onMouseEnter={() => moveCount < 10 && handleNoInteraction()}
                onClick={handleNoInteraction}
              >
                No... 😢
              </motion.button>
            </div>
          </motion.div>
        )}


        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`z-10 text-center flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 ${playfairDisplay.className}`}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 drop-shadow-lg">
              YAYYY! I love you jyomiiiiiiiiii! 💕
            </h2>
            <p className="text-xl md:text-2xl text-rose-500 mb-8 italic">You made me the happiest person ever! 💍</p>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-64"
            >
              <Image
                src="/hamster_jumping.gif"
                alt="Happy Hamster"
                fill
                className="object-contain drop-shadow-2xl"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Fireworks
            options={{
              autoresize: true,
              opacity: 0.5,
              acceleration: 1.05,
              friction: 0.97,
              gravity: 1.5,
              particles: 50,
              traceLength: 3,
              traceSpeed: 10,
              explosion: 5,
              intensity: 30,
              flickering: 50,
              lineStyle: 'round'
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

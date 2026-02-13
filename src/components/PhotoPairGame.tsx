"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 18 images - UPDATE THESE PATHS TO YOUR NEW IMAGES
const images = [
  "/game-photos/1.jpeg",  // Updated to match your .jpeg files
  "/game-photos/2.jpeg",
  "/game-photos/3.jpeg",
  "/game-photos/4.jpeg",
  "/game-photos/5.jpeg",
  "/game-photos/6.jpeg",
  "/game-photos/7.jpeg",
  "/game-photos/8.jpeg",
  "/game-photos/9.jpeg",
  "/game-photos/10.jpeg",
  "/game-photos/11.jpeg",
  "/game-photos/12.jpeg",
  "/game-photos/13.jpeg",
  "/game-photos/14.jpeg",
  "/game-photos/15.jpeg",
  "/game-photos/16.jpeg",
  "/game-photos/17.jpeg",
  "/game-photos/18.jpeg",
];

// Create 18 pairs of images (36 images in total)
const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, null, 35, null, null, null, null],
];

type PhotoPairGameProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: PhotoPairGameProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setShuffledImages(shuffleArray(imagePairs));
    setMounted(true);
  }, []);

  const handleClick = async (index: number) => {
    if (selected.length === 2 || matched.includes(index) || selected.includes(index) || shuffledImages.length === 0) return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev: number[]) => [...prev, index]);

      if (shuffledImages[firstIndex] === shuffledImages[index]) {
        setMatched((prev: number[]) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIncorrect([firstIndex, index]);
        setTimeout(() => {
          setIncorrect([]);
          setSelected([]);
        }, 600);
      }
    } else {
      setSelected([index]);
    }
  };

  useEffect(() => {
    if (shuffledImages.length > 0 && matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal, shuffledImages.length]);

  if (!mounted || shuffledImages.length === 0) return null;

  return (
    <div className="relative z-10 p-4 md:p-8 bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[95vw] md:max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-10"
      >
        <h2 className="text-3xl md:text-5xl font-black text-rose-600 drop-shadow-md tracking-tight">
          Let's GOOOOOOO
        </h2>
        <p className="text-rose-500 font-medium text-sm md:text-base mt-2">Match all the photos!</p>
      </motion.div>

      <div className="grid grid-cols-9 gap-1.5 md:gap-3 place-items-center">
        {heartLayout.flat().map((index, i) =>
          index !== null ? (
            <motion.div
              key={i}
              className="w-[9vw] h-[9vw] max-w-[75px] max-h-[75px] md:w-20 md:h-20 relative cursor-pointer"
              whileHover={{ scale: 1.1, zIndex: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(index)}
              style={{ perspective: "1000px" }}
            >
              <AnimatePresence initial={false} mode="wait">
                {!selected.includes(index) && !matched.includes(index) ? (
                  <motion.div
                    key="back"
                    className="w-full h-full bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 rounded-xl shadow-lg absolute z-10 flex items-center justify-center border border-white/30"
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 180, opacity: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-white text-xl md:text-3xl filter drop-shadow-md">❤️</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    className="w-full h-full absolute z-10 border-2 border-white rounded-xl overflow-hidden shadow-2xl bg-white/80"
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -180, opacity: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={shuffledImages[index]}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Incorrect animation overlay */}
              {incorrect.includes(index) && (
                <motion.div
                  className="absolute inset-0 z-20 bg-rose-700/60 rounded-xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white text-3xl font-bold">❌</span>
                </motion.div>
              )}

              {/* Match animation overlay */}
              {matched.includes(index) && (
                <motion.div
                  className="absolute -top-3 -right-3 z-30 text-rose-500 text-2xl"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: [0, 1.8, 1], rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  💖
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div key={i} className="w-[9vw] h-[9vw] max-w-[75px] max-h-[75px] md:w-20 md:h-20" />
          ),
        )}
      </div>
    </div>
  );
}

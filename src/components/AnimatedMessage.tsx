"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedMessageProps {
  onComplete: () => void;
}

// EDITABLE TEXT CONTENT - Change these messages to customize your animation
const textMessages = {
  line1: "Every morning I cross CV thinking of you",
  line2: "Every evening at RA Puram bus stand, you're on my mind",
  line3: "and somewhere between those moments, you became my favourite part of every day",
  line4: "it feels like we were always meant to meet",
  line5: "and having in my life is my pure luck",
  line6: "I love you so much, more than all the time and space can hold",
  line7: "and I can't wait to spend the rest of my life with you, my jyomi!",
  final: "Happy Valentine's Day <3"
};

// EDITABLE SPEED - Lower numbers = faster animation (original was 0.01)
const FADE_SPEED = 0.02; // Increased from 0.01 for faster fade

// EDITABLE TIMING - Lower numbers = shorter pauses between messages
const MESSAGE_DURATION = 120; // Reduced from 150 for even faster transitions

// EDITABLE BUTTON TIMING - When to show the continue button
const BUTTON_SHOW_DELAY = MESSAGE_DURATION * 14; // Show button after all text appears

export default function AnimatedMessage({ onComplete }: AnimatedMessageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showButton, setShowButton] = useState(false);
  const animationRef = useRef<number | null>(null);
  const frameNumberRef = useRef(0);
  const opacityRef = useRef(0);
  const secondOpacityRef = useRef(0);
  const thirdOpacityRef = useRef(0);
  const starArrayRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = 500;
    const colorrange = [0, 60, 240];
    
    // Initialize stars with random opacity values
    for (let i = 0; i < stars; i++) {
      const x = Math.random() * canvas.offsetWidth;
      const y = Math.random() * canvas.offsetHeight;
      const radius = Math.random() * 1.2;
      const hue = colorrange[Math.floor(Math.random() * colorrange.length)];
      const sat = Math.floor(Math.random() * 50) + 50;
      const opacity = Math.random();
      starArrayRef.current.push({ x, y, radius, hue, sat, opacity });
    }

    const getRandom = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const drawStars = () => {
      for (let i = 0; i < stars; i++) {
        const star = starArrayRef.current[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
      }
    };

    const updateStars = () => {
      for (let i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
          starArrayRef.current[i].opacity = Math.random();
        }
      }
    };

    const drawTextWithLineBreaks = (lines: string[], x: number, y: number, fontSize: number, lineHeight: number) => {
      lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
      });
    };

    const drawText = () => {
      const fontSize = Math.min(30, window.innerWidth / 24);
      const lineHeight = 8;

      context.font = `${fontSize}px Comic Sans MS`;
      context.textAlign = "center";
      
      // Pink glow effect instead of blue
      context.shadowColor = "rgba(255, 105, 180, 1)";
      context.shadowBlur = 8;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;

      const frameNumber = frameNumberRef.current;
      const opacity = opacityRef.current;
      const secondOpacity = secondOpacityRef.current;
      const thirdOpacity = thirdOpacityRef.current;

      if (frameNumber < MESSAGE_DURATION) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line1, canvas.width / 2, canvas.height / 2);
        opacityRef.current += FADE_SPEED;
      }
      // fades out the text by decreasing the opacity
      if (frameNumber >= MESSAGE_DURATION && frameNumber < MESSAGE_DURATION * 2) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line1, canvas.width / 2, canvas.height / 2);
        opacityRef.current -= FADE_SPEED;
      }

      if (frameNumber === MESSAGE_DURATION * 2) {
        opacityRef.current = 0;
      }
      if (frameNumber > MESSAGE_DURATION * 2 && frameNumber < MESSAGE_DURATION * 3) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line2.split(', ')[0], textMessages.line2.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line2, canvas.width / 2, canvas.height / 2);
        }

        opacityRef.current += FADE_SPEED;
      }
      if (frameNumber >= MESSAGE_DURATION * 3 && frameNumber < MESSAGE_DURATION * 4) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line2.split(', ')[0], textMessages.line2.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line2, canvas.width / 2, canvas.height / 2);
        }

        opacityRef.current -= FADE_SPEED;
      }

      if (frameNumber === MESSAGE_DURATION * 4) {
        opacityRef.current = 0;
      }
      if (frameNumber > MESSAGE_DURATION * 4 && frameNumber < MESSAGE_DURATION * 5) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line3, canvas.width / 2, canvas.height / 2);
        opacityRef.current += FADE_SPEED;
      }
      if (frameNumber >= MESSAGE_DURATION * 5 && frameNumber < MESSAGE_DURATION * 6) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line3, canvas.width / 2, canvas.height / 2);
        opacityRef.current -= FADE_SPEED;
      }

      if (frameNumber === MESSAGE_DURATION * 6) {
        opacityRef.current = 0;
      }
      if (frameNumber > MESSAGE_DURATION * 6 && frameNumber < MESSAGE_DURATION * 7) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line4, canvas.width / 2, canvas.height / 2);
        opacityRef.current += FADE_SPEED;
      }
      if (frameNumber >= MESSAGE_DURATION * 7 && frameNumber < MESSAGE_DURATION * 8) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;
        context.fillText(textMessages.line4, canvas.width / 2, canvas.height / 2);
        opacityRef.current -= FADE_SPEED;
      }

      if (frameNumber === MESSAGE_DURATION * 8) {
        opacityRef.current = 0;
      }
      if (frameNumber > MESSAGE_DURATION * 8 && frameNumber < MESSAGE_DURATION * 9) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line5.split(', ')[0], textMessages.line5.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line5, canvas.width / 2, canvas.height / 2);
        }

        opacityRef.current += FADE_SPEED;
      }
      if (frameNumber >= MESSAGE_DURATION * 9 && frameNumber < MESSAGE_DURATION * 10) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line5.split(', ')[0], textMessages.line5.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line5, canvas.width / 2, canvas.height / 2);
        }

        opacityRef.current -= FADE_SPEED;
      }

      if (frameNumber === MESSAGE_DURATION * 10) {
        opacityRef.current = 0;
      }
      if (frameNumber > MESSAGE_DURATION * 10 && frameNumber < 99999) {
        context.fillStyle = `rgba(255, 105, 180, ${opacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line6.split(', ')[0], textMessages.line6.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line6, canvas.width / 2, canvas.height / 2);
        }

        opacityRef.current += FADE_SPEED;
      }

      if (frameNumber >= MESSAGE_DURATION * 11 && frameNumber < 99999) {
        context.fillStyle = `rgba(255, 105, 180, ${secondOpacity})`;

        if (window.innerWidth < 600) {
          drawTextWithLineBreaks(
            [textMessages.line7.split(', ')[0], textMessages.line7.split(', ')[1]],
            canvas.width / 2,
            canvas.height / 2 + 60,
            fontSize,
            lineHeight
          );
        } else {
          context.fillText(textMessages.line7, canvas.width / 2, canvas.height / 2 + 50);
        }

        secondOpacityRef.current += FADE_SPEED;
      }

      if (frameNumber >= BUTTON_SHOW_DELAY && frameNumber < 99999) {
        context.fillStyle = `rgba(255, 105, 180, ${thirdOpacity})`;
        context.fillText(textMessages.final, canvas.width / 2, canvas.height / 2 + 120);
        thirdOpacityRef.current += FADE_SPEED;

        setShowButton(true);
      }

      // Reset the shadow effect after drawing the text
      context.shadowColor = "transparent";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    };

    const draw = () => {
      // Clear canvas with pinkish background
      context.fillStyle = "#fdf2f8";
      context.fillRect(0, 0, canvas.width, canvas.height);

      drawStars();
      updateStars();
      drawText();

      if (frameNumberRef.current < 99999) {
        frameNumberRef.current++;
      }
      animationRef.current = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleContinue = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    onComplete();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Simple animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 text-4xl opacity-30"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-20 text-3xl opacity-30"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-20 left-20 text-3xl opacity-30"
        >
          💕
        </motion.div>
      </div>

      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Romantic button with improved design */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5 }} // Later fade-in
          whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(225, 29, 72, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="absolute z-10 px-12 py-4 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 text-white text-xl font-semibold rounded-full shadow-xl transition-all duration-300 border border-white/20"
          style={{
            top: "80%", // Lower position
            left: "39%",
            transform: "translateX(-50%)", // Perfect centering
          }}
        >
          <span className="flex items-center gap-2">
            continue, there's more! 
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl"
            >
              💕
            </motion.span>
          </span>
        </motion.button>
      )}
    </div>
  );
}

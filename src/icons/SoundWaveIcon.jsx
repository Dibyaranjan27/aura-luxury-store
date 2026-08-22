import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx'; // A tiny utility for conditional class names

function SoundWaveIcon({ isNavbarHovered }) {
  const [isPaused, setIsPaused] = useState(true); // Start paused by default
  const audioRef = useRef(null);

  // Effect to handle playing and pausing the audio element
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.volume = 0.6;

    if (isPaused) {
      audioElement.pause();
    } else {
      // The play() method returns a Promise, which can cause an error if interrupted.
      // This is the correct way to handle it.
      audioElement.play().catch(error => {
        // console.error("Audio play failed:", error);
      });
    }
  }, [isPaused]);
  
  // Effect for initial setup and cleanup
  useEffect(() => {
    // When the component is removed from the page, pause the audio
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleTogglePlay = () => {
    setIsPaused(prev => !prev);
  };

  // Define base classes for the wave bars
  const barBaseClasses = "w-0.5 rounded-full list-none";
  const colorClass = isNavbarHovered ? 'bg-black' : 'bg-white';
  
  return (
    <div
      onClick={handleTogglePlay}
      className="relative w-[30px] h-[22px] flex justify-center items-center cursor-pointer"
    >
      {/* The five animated bars for the sound wave */}
      <ul className="flex items-center justify-center space-x-[3px] h-full">
        <li className={clsx(barBaseClasses, colorClass, !isPaused && 'animate-wave-1')}></li>
        <li className={clsx(barBaseClasses, colorClass, !isPaused && 'animate-wave-2')}></li>
        <li className={clsx(barBaseClasses, colorClass, !isPaused && 'animate-wave-3')}></li>
        <li className={clsx(barBaseClasses, colorClass, !isPaused && 'animate-wave-4')}></li>
        <li className={clsx(barBaseClasses, colorClass, !isPaused && 'animate-wave-5')}></li>
      </ul>

      {/* The diagonal "pause" line, shown only when paused */}
      {isPaused && (
        <div 
          className={clsx(
            "absolute w-[25px] h-0.5 rounded-full rotate-45",
            colorClass
          )}
        ></div>
      )}

      {/* The hidden audio element */}
      <audio ref={audioRef} src="/assets/Eve - Kaikai Kitan.mp3" loop />
    </div>
  );
}

export default SoundWaveIcon;
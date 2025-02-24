// AudioPlayer.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the mute state
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  // Play audio after a user interaction to bypass autoplay restrictions
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error('Autoplay prevented:', error);
        });
        setIsVisible(true); // Show button after audio starts playing
      }
      window.removeEventListener('click', playAudio);
    };

    window.addEventListener('click', playAudio);
    return () => window.removeEventListener('click', playAudio);
  }, []);

  return (
    <div>
      {/* Hidden audio element playing your song in loop */}
      <audio ref={audioRef} loop>
        <source
          src="https://res.cloudinary.com/dnddesigncenter/video/upload/yc96jefzn2hnsj8tvu6o.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Mute Button */}
      <button
        onClick={toggleMute}
        className={`
          fixed right-5 top-24 z-[9999]
          w-10 h-10
          flex items-center justify-center
          bg-white rounded-full
          shadow-[0_2px_10px_rgba(0,0,0,0.2)]
          transition-all duration-300 ease-in-out
          hover:scale-130
          transform
          ${isVisible ? 'translate-x-0' : 'translate-x-20'}
        `}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? (
          <VolumeX className="w-7 h-7" style={{ color: 'gray' }} />
        ) : (
          <Volume2 className="w-7 h-7" style={{ color: 'gray' }} />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
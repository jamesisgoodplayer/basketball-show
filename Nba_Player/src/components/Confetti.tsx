import React, { useEffect, useState } from 'react';
import './Confetti.scss';

interface ConfettiProps {
  side?: 'left' | 'right' | 'both';
  trigger: boolean;
  onEnd?: () => void;
}

const COLORS = ['#fcb514', '#e03a3e', '#1976d2', '#43a047', '#ff9800', '#00bcd4', '#8e24aa', '#ff69b4', '#00e676', '#ffd600', '#8c9eff', '#ff8a65'];
function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

const Confetti: React.FC<ConfettiProps> = ({ side = 'both', trigger, onEnd }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onEnd && onEnd();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [trigger, onEnd]);

  if (!show) return null;

  const confettiArr = Array.from({ length: 48 });
  return (
    <>
      {(side === 'left' || side === 'both') && (
        <div className="confetti confetti-left">
          {confettiArr.map((_, i) => {
            const angle = -60 + Math.random() * 60; // -60~0度
            const color = randomColor();
            const delay = Math.random() * 0.5;
            const x = 20 + Math.random() * 12; // 20vw~32vw
            return (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${10 + Math.random() * 30}%`,
                  background: color,
                  animationDelay: `${delay}s`,
                  transform: `rotate(${Math.random() * 360}deg)` ,
                  ['--confetti-angle' as any]: `${angle}deg`,
                  ['--confetti-x' as any]: `${x}vw`,
                }}
              />
            );
          })}
        </div>
      )}
      {(side === 'right' || side === 'both') && (
        <div className="confetti confetti-right">
          {confettiArr.map((_, i) => {
            const angle = 60 + Math.random() * 60; // 60~120度
            const color = randomColor();
            const delay = Math.random() * 0.5;
            const x = -20 - Math.random() * 12; // -20vw~-32vw
            return (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  right: `${10 + Math.random() * 30}%`,
                  background: color,
                  animationDelay: `${delay}s`,
                  transform: `rotate(${Math.random() * 360}deg)` ,
                  ['--confetti-angle' as any]: `${angle}deg`,
                  ['--confetti-x' as any]: `${x}vw`,
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Confetti; 
import React, { useEffect, useState } from 'react';

export const TimecodeClock: React.FC = () => {
  const [time, setTime] = useState<string>("00:00:00:00");

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const f = (frame % 24).toString().padStart(2, '0'); // Simulating 24fps
      setTime(`${h}:${m}:${s}:${f}`);
      frame++;
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-neon-lime/80 text-xs md:text-sm tracking-widest select-none">
      <span className="text-zinc-600 mr-2">REC</span>
      {time}
    </div>
  );
};
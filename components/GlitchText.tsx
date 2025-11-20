import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Tag = 'span', className = '' }) => {
  return (
    <Tag className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-pink opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-lime opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 delay-75 select-none">
        {text}
      </span>
    </Tag>
  );
};
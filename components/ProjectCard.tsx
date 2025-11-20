import React from 'react';
import { Play, Clock, Hash } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative w-full h-72 bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer transition-transform hover:-translate-y-2 duration-300">
      {/* Image Base */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Overlay Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between bg-gradient-to-t from-black via-transparent to-transparent opacity-90">
        <div className="flex justify-between items-start transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-neon-lime text-black text-xs font-bold px-2 py-1 uppercase tracking-widest">
            {project.category}
          </div>
          <div className="flex items-center text-xs font-mono text-zinc-400 gap-1">
            <Clock size={12} />
            {project.duration}
          </div>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <h3 className="text-2xl font-black font-sans text-white uppercase leading-none mb-2">
            {project.title}
          </h3>
          <p className="text-xs text-zinc-400 font-mono mb-3 line-clamp-2 border-l-2 border-neon-pink pl-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase text-neon-lime font-mono border border-zinc-700 px-2 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Play Button Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 scale-0 group-hover:scale-100 transition-transform duration-300">
        <Play fill="white" className="ml-1" />
      </div>
      
      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 p-2 z-20">
         <Hash size={16} className="text-zinc-700 group-hover:text-neon-pink transition-colors" />
      </div>
    </div>
  );
};
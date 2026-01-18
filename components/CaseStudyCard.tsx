
import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study }) => {
  return (
    <Link to={`/works/${study.id}`} className="group relative flex flex-col bg-white border border-stone-200 overflow-hidden cursor-pointer transition-all hover:border-stone-400">
      <div className="aspect-[3/4] overflow-hidden bg-stone-50">
        <img 
          src={study.imageUrl} 
          alt={study.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>
      
      <div className="p-8 space-y-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
            {study.year} — {study.role}
          </span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-light tracking-tight text-stone-900 uppercase">
            {study.title}
          </h3>
          <p className="text-[11px] font-medium tracking-[0.15em] text-stone-500 uppercase">
            {study.category}
          </p>
        </div>
        
        <p className="text-sm leading-relaxed text-stone-600 font-light flex-grow">
          {study.description}
        </p>

        <div className="pt-4 mt-auto">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-stone-900 pb-1 group-hover:pr-4 transition-all">
            View Project
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;

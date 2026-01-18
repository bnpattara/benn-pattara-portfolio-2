
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../constants';

interface ProjectNavigationProps {
  currentId: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentId }) => {
  const currentIndex = CASE_STUDIES.findIndex(s => s.id === currentId);
  const prevProject = CASE_STUDIES[(currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const nextProject = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <nav className="border-t border-stone-200 grid grid-cols-2">
      <Link 
        to={`/works/${prevProject.id}`}
        className="group p-12 md:p-24 border-r border-stone-200 hover:bg-white transition-colors flex flex-col items-start gap-4"
      >
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 group-hover:text-stone-900 transition-colors">
          <ArrowLeft size={16} /> Previous
        </div>
        <div className="text-xl md:text-3xl font-light tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-500">
          {prevProject.title}
        </div>
      </Link>
      
      <Link 
        to={`/works/${nextProject.id}`}
        className="group p-12 md:p-24 hover:bg-white transition-colors flex flex-col items-end text-right gap-4"
      >
        <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 group-hover:text-stone-900 transition-colors">
          Next <ArrowRight size={16} />
        </div>
        <div className="text-xl md:text-3xl font-light tracking-tight uppercase group-hover:-translate-x-2 transition-transform duration-500">
          {nextProject.title}
        </div>
      </Link>
    </nav>
  );
};

export default ProjectNavigation;

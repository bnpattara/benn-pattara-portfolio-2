
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-stone-200 py-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4">
          <h2 className="text-[11px] tracking-[0.3em] font-bold text-stone-900 uppercase">Let's Connect</h2>
          <div className="flex flex-col gap-2">
            <a href="mailto:bennpattara@gmail.com" className="text-xl md:text-2xl font-light hover:text-stone-500 transition-colors">
              bennpattara@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href="https://www.linkedin.com/in/bennpattara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.15em] font-bold uppercase border-b border-stone-900 pb-1 w-fit hover:border-stone-400 hover:text-stone-400 transition-all"
          >
            LinkedIn
          </a>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-8">
            © {new Date().getFullYear()} Benn Pattara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

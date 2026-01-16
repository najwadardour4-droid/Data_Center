import React from 'react';
import logo from '../assets/logo.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
  className?: string;
  dark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  hideText = false,
  className = "",
  dark = false
}) => {

  // Échelles de tailles pour le conteneur et l'image
  const sizes = {
    sm: { img: 'h-7', gap: 'gap-2', title: 'text-lg', subtitle: 'text-[7px]' },
    md: { img: 'h-9', gap: 'gap-3', title: 'text-2xl', subtitle: 'text-[10px]' },
    lg: { img: 'h-14', gap: 'gap-4', title: 'text-4xl', subtitle: 'text-[14px]' }
  };

  return (
    <div className={`flex items-center ${sizes[size].gap} ${className}`}>
      {/* Logo Image */}
      <img
        src={logo}
        alt="DataCenterHub Logo"
        className={`${sizes[size].img} w-auto object-contain`}
      />

      {!hideText && (
        <div className="flex flex-col leading-none">
          {/* Texte Principal */}
          <h1 className={`
            ${sizes[size].title} 
            font-extrabold tracking-tighter transition-colors
            ${dark ? 'text-white' : 'text-slate-900'}
          `}>
            DataCenter<span className="text-[#0080FF]">Hub</span>
          </h1>

          {/* Slogan (Subtitle) */}
          <h3 className={`
            ${sizes[size].subtitle} 
            uppercase font-bold tracking-[0.2em] transition-colors mt-1
            ${dark ? 'text-slate-400' : 'text-slate-500'}
          `}>
            Resource Management
          </h3>
        </div>
      )}
    </div>
  );
};
'use client';

import React from 'react';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  priority?: boolean;
  showText?: boolean;
  variant?: 'default' | 'white' | 'dark';
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 80, height: 80 },
  xl: { width: 120, height: 120 },
};

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className,
  priority = false,
  showText = false,
  variant = 'default',
}) => {
  const { width, height } = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-full ring-2 ring-offset-2 transition-all duration-200',
          variant === 'default' && 'ring-blue-600 ring-offset-white',
          variant === 'white' && 'ring-white ring-offset-blue-600',
          variant === 'dark' && 'ring-gray-800 ring-offset-gray-100'
        )}
        style={{ width, height }}
      >
        <OptimizedImage
          src="/bk.jpg"
          alt="B.Khrease Academic Consult Logo"
          fill
          priority={priority}
          quality={95}
          className="object-cover"
          placeholder="empty"
          sizes={`${width}px`}
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-bold leading-tight',
              size === 'sm' && 'text-sm',
              size === 'md' && 'text-base',
              size === 'lg' && 'text-lg',
              size === 'xl' && 'text-xl',
              variant === 'white' && 'text-white',
              variant === 'dark' && 'text-gray-900',
              variant === 'default' && 'text-gray-900'
            )}
          >
            B.Khrease
          </span>
          <span
            className={cn(
              'text-xs leading-tight opacity-75',
              variant === 'white' && 'text-white',
              variant === 'dark' && 'text-gray-600',
              variant === 'default' && 'text-gray-600'
            )}
          >
            Academic Consult
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

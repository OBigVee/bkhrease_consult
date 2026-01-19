'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 85,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc = '/bk.jpg',
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
    onError?.();
  };

  // Generate blur placeholder for better loading experience
  const generateBlurDataURL = (w: number, h: number) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect width="100%" height="100%" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString('base64')}`;
  };

  const imageProps = {
    src: imgSrc,
    alt,
    quality,
    priority,
    // Don't set loading when priority is true (Next.js handles it automatically)
    ...(priority ? {} : { loading }),
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      'transition-opacity duration-300',
      isLoading && 'opacity-0',
      !isLoading && 'opacity-100',
      hasError && 'opacity-75',
      className
    ),
    placeholder:
      placeholder === 'blur' ? ('blur' as const) : ('empty' as const),
    blurDataURL:
      placeholder === 'blur'
        ? blurDataURL ||
          (width && height ? generateBlurDataURL(width, height) : undefined)
        : undefined,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={
          sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        }
      />
    );
  }

  if (width && height) {
    return (
      <Image {...imageProps} width={width} height={height} sizes={sizes} />
    );
  }

  // Fallback to fill if no dimensions provided
  return (
    <Image
      {...imageProps}
      fill
      sizes={
        sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      }
    />
  );
};

export default OptimizedImage;

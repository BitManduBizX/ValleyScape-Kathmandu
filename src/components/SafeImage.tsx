import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fallbackLabel?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  fallbackLabel,
  className = '',
  style,
  ...props
}: SafeImageProps) {
  const defaultPlaceholder =
    fallbackSrc ||
    `https://picsum.photos/seed/${encodeURIComponent(alt.toLowerCase().replace(/\s+/g, '-'))}/800/600`;

  const [imgSrc, setImgSrc] = useState<string>(src || defaultPlaceholder);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);
  const [hasFailedCompletely, setHasFailedCompletely] = useState<boolean>(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!triedFallback && imgSrc !== defaultPlaceholder) {
      setTriedFallback(true);
      setImgSrc(defaultPlaceholder);
    } else {
      setHasFailedCompletely(true);
    }
    if (props.onError) {
      props.onError(e);
    }
  };

  if (hasFailedCompletely) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F2EA] to-[#E5A93C]/20 dark:from-[#2A2A2A] dark:to-[#1A1A1A] text-[#5A524C] dark:text-gray-400 p-4 text-center max-w-full ${className}`}
        style={{ maxWidth: '100%', ...style }}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-8 h-8 text-[#C85A32] dark:text-[#E5A93C] mb-2 opacity-80 shrink-0" />
        <span className="text-xs font-semibold text-[#1A1A1A] dark:text-gray-200 line-clamp-2">
          {fallbackLabel || alt || 'Image unavailable'}
        </span>
        <span className="text-[10px] text-[#5A524C] dark:text-gray-400 mt-0.5">
          Placeholder View
        </span>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={`max-w-full block ${className}`}
      style={{ maxWidth: '100%', ...style }}
    />
  );
}

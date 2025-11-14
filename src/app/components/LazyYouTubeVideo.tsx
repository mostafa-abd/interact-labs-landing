'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LazyYouTubeVideoProps {
  videoId: string;
  thumbnailUrl?: string;
  title?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function LazyYouTubeVideo({
  videoId,
  thumbnailUrl,
  title = 'Product Video',
  width = '100%',
  height = '450',
  className = '',
}: LazyYouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Extract video ID from embed URL if needed
  const extractVideoId = (urlOrId: string): string => {
    if (urlOrId.includes('youtube.com/embed/')) {
      return urlOrId.split('youtube.com/embed/')[1].split('?')[0];
    }
    if (urlOrId.includes('youtu.be/')) {
      return urlOrId.split('youtu.be/')[1].split('?')[0];
    }
    if (urlOrId.includes('v=')) {
      return urlOrId.split('v=')[1].split('&')[0];
    }
    return urlOrId;
  };

  const finalVideoId = extractVideoId(videoId);
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${finalVideoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${finalVideoId}?rel=0&modestbranding=1&autoplay=1`;

  const handleClick = () => {
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div
        style={{
          width,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          borderRadius: 12,
          color: '#fff',
        }}
      >
        <p>Video unavailable</p>
      </div>
    );
  }

  if (!isLoaded) {
    // Convert height string to pixels for proper sizing
    const heightPx = height.includes('px') ? height : `${height}px`;
    
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width,
          height: heightPx,
          minHeight: heightPx,
          cursor: 'pointer',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Play ${title}`}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 640px"
          quality={75}
        />
        <div
          className="youtube-play-button"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 0, 0, 0.9)',
            borderRadius: '50%',
            width: 68,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            willChange: 'transform',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            style={{ marginLeft: '4px' }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            padding: '16px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      </div>
    );
  }

  // Convert height string to pixels for proper sizing
  const heightPx = height.includes('px') ? height : `${height}px`;
  
  return (
    <div className={className} style={{ width, height: heightPx, minHeight: heightPx, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: 12, width: '100%', height: '100%', border: 'none' }}
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}


import { useEffect, useState } from 'react';

// Custom hook for lazy loading images with intersection observer
export function useLazyImage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const loadImage = (src: string) => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  };

  return { isLoaded, imageSrc, loadImage };
}

// Custom hook for performance monitoring
export function usePerformance() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/akk_logo_font.png',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=250&fit=crop&crop=center&q=75',
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      criticalImages.forEach(src => {
        const link = document.querySelector(`link[href="${src}"]`);
        if (link) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);
}

// Custom hook for viewport optimization
export function useViewportOptimization() {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    return () => observer.disconnect();
  }, []);

  return { isInViewport };
}

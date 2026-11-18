import { useState, useEffect, useRef } from 'react';

export default function AdvertisementPopup() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function checkAndShow() {
      const img = imageRef.current;
      if (!img) return;

      // Helper function to handle image loading logic
      const waitForImageLoad = (): Promise<void> => {
        if (img.complete && img.naturalWidth > 0) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => {
            console.warn('Advertisement image failed to load, showing popup anyway.');
            resolve(); // Resolve anyway to show the fallback/alt text layout
          }, { once: true });
        });
      };

      try {
        await waitForImageLoad();
        // Brief delay before animating in
        if (isMounted) {
          setTimeout(() => setIsVisible(true), 120);
        }
      } catch (e) {
        if (isMounted) setIsVisible(true);
      }
    }

    checkAndShow();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for the fade-out transition (250ms) to finish before removing from DOM
    setTimeout(() => {
      setIsRendered(false);
    }, 250);
  };

  if (!isRendered) return null;

  // Inline styles object with proper CSSProperties typing
  const styles: Record<string, React.CSSProperties> = {
    section: {
      position: 'fixed',
      height: 'max-content',
      zIndex: 100000000000000,
      top: '50%',
      left: '50%',
      width: '900px',
      maxWidth: 'calc(100vw - 2rem)',
      willChange: 'opacity, transform',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.92)',
      pointerEvents: isVisible ? 'auto' : 'none',
      transition: isVisible 
        ? 'opacity 0.45s ease, transform 0.45s ease' 
        : 'opacity 0.25s ease, transform 0.25s ease',
    }
  };

  return (
    <section className="advertisement-popup" style={styles.section}>
      <div style={{ position: 'relative' }}>
        
        {/* Close Button */}
        <div 
          onClick={handleClose}
          className="avtm-action" 
          style={{
            position: 'absolute',
            width: '1.8rem',
            height: '1.8rem',
            borderRadius: '50rem',
            background: 'var(--sg-color-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: '-0.5rem',
            top: '-1rem',
            cursor: 'pointer',
          }}
        >
          <svg style={{ transform: 'rotate(45deg)' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M6 12h12M12 18V6" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>

        {/* Ad Content */}
        <a href="/guide" target="_blank" rel="noopener noreferrer" style={{ display: 'block', borderRadius: '24px', overflow: 'hidden' }}>
          <img 
            ref={imageRef}
            src="/advertisement.png" 
            alt="Premium portfolio ad" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
            loading="lazy"
          />
        </a>
      </div>
      <style>{`
        .avtm-action { 
          transition: transform 0.2s ease, background 0.2s ease !important;
        } 
        .avtm-action:hover { 
          transform: scale(1.06) rotate(45deg) !important; 
          background: var(--sg-color-brand) !important;
        }
      `}</style>
    </section>
  );
}


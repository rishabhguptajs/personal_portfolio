import React, { useEffect, useRef } from 'react';
import './comp.css';

interface QuoteProps {
  quote: string;
  author: string;
}

const QuoteComponent: React.FC<QuoteProps> = ({ quote, author }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;

    const applyOverlayMask = (e: MouseEvent) => {
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardEl.style.setProperty('--x', `${x}px`);
        cardEl.style.setProperty('--y', `${y}px`);
        cardEl.style.setProperty('--opacity', '1');
      }
    };

    if (cardEl) {
      cardEl.addEventListener('pointermove', applyOverlayMask);
      cardEl.addEventListener('pointerleave', () => {
        if (cardEl) {
          cardEl.style.setProperty('--opacity', '0');
        }
      });
    }

    return () => {
      if (cardEl) {
        cardEl.removeEventListener('pointermove', applyOverlayMask);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="quote-card rounded-lg border-2 flex flex-col items-center justify-center w-full h-full">
      <div className="quote-content bg-white/10 p-4 rounded-lg backdrop-blur-sm text-white text-center">
        <h1 className="text-lg">{quote}</h1>
        {author && <h2 className="text-sm mt-2 font-bold italic">- {author}</h2>}
      </div>
    </div>
  );
};

export default QuoteComponent;

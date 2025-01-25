// components/cookie-consent.tsx

"use client"

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    // Puoi aggiungere qui il codice per attivare i cookie di analisi o marketing
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    // Puoi aggiungere qui il codice per disattivare i cookie di analisi o marketing
  };

  if (!showConsent) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg animate-in slide-in-from-bottom duration-500"
      role="dialog" 
      aria-labelledby="cookie-consent-title" 
      aria-modal="true"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p id="cookie-consent-title" className="text-sm text-gray-300 mb-2 sm:mb-0">
          Utilizziamo <Link href="/docs/cookie-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">cookie</Link> per migliorare la tua esperienza. Per maggiori informazioni, leggi la nostra <Link href="/docs/cookie-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Cookie Policy</Link>.
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={acceptCookies} size="sm">
            Accetta
          </Button>
          <Button onClick={declineCookies} variant="ghost" size="sm">
            Rifiuta
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowConsent(false)} aria-label="Chiudi">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

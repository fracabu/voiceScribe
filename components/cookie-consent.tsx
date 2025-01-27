"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(true); // Cambiato il valore iniziale a true
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('CookieConsent - Initial mount');
    setMounted(true);
    try {
      console.log('CookieConsent - Checking localStorage');
      const consent = localStorage.getItem('cookieConsent');
      console.log('CookieConsent - Current consent value:', consent);
      
      if (consent) {
        // Solo se troviamo un consenso esistente, nascondiamo il banner
        console.log('CookieConsent - Existing consent found, hiding banner');
        setShowConsent(false);
      }
    } catch (error) {
      console.error('CookieConsent - Error accessing localStorage:', error);
    }
  }, []);

  // Aspettiamo il montaggio del componente
  if (!mounted) {
    return null;
  }

  // Se non dobbiamo mostrare il consenso, ritorniamo null
  if (!showConsent) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-background border-t z-[9999]"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-modal="true"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p id="cookie-consent-title" className="text-sm text-muted-foreground">
            Utilizziamo i cookie per migliorare la tua esperienza. Leggi la nostra{' '}
            <Link href="/privacy-policy" className="text-primary hover:text-primary/80 underline">
              Privacy Policy
            </Link>{' '}
            e la{' '}
            <Link href="/cookie-policy" className="text-primary hover:text-primary/80 underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => {
                console.log('CookieConsent - Accepting cookies');
                localStorage.setItem('cookieConsent', 'accepted');
                setShowConsent(false);
              }} 
              size="sm"
            >
              Accetta
            </Button>
            <Button 
              onClick={() => {
                console.log('CookieConsent - Declining cookies');
                localStorage.setItem('cookieConsent', 'declined');
                setShowConsent(false);
              }} 
              variant="outline" 
              size="sm"
            >
              Rifiuta
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                console.log('CookieConsent - Closing banner');
                setShowConsent(false);
              }} 
              aria-label="Chiudi"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
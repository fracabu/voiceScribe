// app/cookie-policy/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function CookiePolicy() {
  return (
    <div className={`min-h-screen p-8 ${inter.className}`}>
      <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-4">
        La presente Cookie Policy descrive come raccogliamo, utilizziamo, e proteggiamo le informazioni personali degli utenti che visitano il nostro sito web.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Cosa Sono i Cookie</h2>
      <p className="mb-4">
        I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web o per migliorarne l efficienza, nonché per fornire informazioni ai proprietari del sito.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Come Utilizziamo i Cookie</h2>
      <p className="mb-4">
        Utilizziamo i cookie per diversi scopi, tra cui:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Autenticazione:</strong> Per verificare la tua identità quando accedi al tuo account.</li>
        <li><strong>Preferenze dell utente:</strong> Per ricordare le tue impostazioni e preferenze.</li>
        <li><strong>Analisi:</strong> Per raccogliere dati anonimi sull uso del sito e migliorare l esperienza dell utente.</li>
        <li><strong>Marketing:</strong> Per mostrarti contenuti pertinenti e annunci personalizzati.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Tipi di Cookie che Utilizziamo</h2>
      <p className="mb-4">
        Utilizziamo diversi tipi di cookie:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Cookie Necessari:</strong> Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati nei nostri sistemi.</li>
        <li><strong>Cookie di Prestazione:</strong> Raccogliamo informazioni su come i visitatori utilizzano il nostro sito per migliorare le prestazioni.</li>
        <li><strong>Cookie di Funzionalità:</strong> Questi cookie permettono al sito di ricordare le scelte che fai (come il tuo nome utente, la lingua o la regione in cui ti trovi).</li>
        <li><strong>Cookie di Marketing:</strong> Utilizziamo questi cookie per tracciare i visitatori attraverso i siti web e mostrare annunci personalizzati.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Gestione dei Cookie</h2>
      <p className="mb-4">
        Puoi gestire e/o eliminare i cookie come desideri. Puoi eliminare tutti i cookie che hai già sul tuo computer e puoi impostare il tuo browser per impedirne linstallazione. Tuttavia, se non accetti i cookie, potresti non essere in grado di utilizzare alcune parti del nostro sito web.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Consegna dei Dati e Sicurezza</h2>
      <p className="mb-4">
        I dati raccolti tramite i cookie vengono trattati in conformità con le normative vigenti sulla protezione dei dati. Adottiamo misure di sicurezza adeguate per proteggere le tue informazioni personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Diritti degli Utenti</h2>
      <p className="mb-4">
        Hai il diritto di accedere, correggere, o richiedere la cancellazione delle tue informazioni personali. Per esercitare questi diritti, puoi contattarci tramite il nostro <Link href="/contact" className="text-blue-600 underline">modulo di contatto</Link>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Aggiornamenti della Cookie Policy</h2>
      <p className="mb-4">
        Potremmo aggiornare questa Cookie Policy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Cookie Policy su questa pagina.
      </p>

      <p className="mb-4">
        Se hai domande sulla nostra Cookie Policy, puoi contattarci tramite il nostro <Link href="/contact" className="text-blue-600 underline">modulo di contatto</Link>.
      </p>

      <div className="mt-8">
        <Link href="/docs/cookie-policy.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Scarica la Cookie Policy (PDF)
        </Link>
      </div>
    </div>
  );
}

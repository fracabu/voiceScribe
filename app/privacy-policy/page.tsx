"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
 return (
   <Card className="container mx-auto px-4 py-16">
     <CardContent>
       <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
       
       <p className="mb-4">
         La presente Privacy Policy descrive come raccogliamo, utilizziamo, e proteggiamo le informazioni personali degli utenti che visitano il nostro sito web.
       </p>

       <section className="space-y-8">
         <div>
           <h2 className="text-2xl font-semibold mb-2">Informazioni Raccolte</h2>
           <p className="text-muted-foreground">
             Raccogliamo informazioni personali che ci fornisci volontariamente quando utilizzi il nostro sito, come nome, indirizzo email, e messaggi inviati tramite il nostro modulo di contatto.
           </p>
         </div>

         <div>
           <h2 className="text-2xl font-semibold mb-2">Uso delle Informazioni</h2>
           <p className="text-muted-foreground">
             Utilizziamo le tue informazioni per fornire e migliorare i nostri servizi, rispondere alle tue richieste, e inviarti comunicazioni pertinenti.
           </p>
         </div>

         <div>
           <h2 className="text-2xl font-semibold mb-2">Protezione dei Dati</h2>
           <p className="text-muted-foreground">
             Adottiamo misure di sicurezza adeguate per proteggere le tue informazioni personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
           </p>
         </div>

         <div>
           <h2 className="text-2xl font-semibold mb-2">Condivisione delle Informazioni</h2>
           <p className="text-muted-foreground">
             Non vendiamo, scambiamo, o trasferiamo le tue informazioni personali a terzi senza il tuo consenso, salvo quando richiesto dalla legge.
           </p>
         </div>

         <div>
           <h2 className="text-2xl font-semibold mb-2">Diritti degli Utenti</h2>
           <p className="text-muted-foreground">
             Hai il diritto di accedere, correggere, o richiedere la cancellazione delle tue informazioni personali. 
             Per esercitare questi diritti, puoi contattarci tramite il nostro{" "}
             <Link 
               href="/contact" 
               className="text-primary underline hover:text-primary/80 transition-colors"
             >
               modulo di contatto
             </Link>.
           </p>
         </div>

         <div>
           <h2 className="text-2xl font-semibold mb-2">Aggiornamenti della Privacy Policy</h2>
           <p className="text-muted-foreground">
             Potremmo aggiornare questa Privacy Policy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Privacy Policy su questa pagina.
           </p>
         </div>
       </section>

       <div className="mt-12 space-y-4">
         <p className="text-muted-foreground">
           Se hai domande sulla nostra Privacy Policy, puoi contattarci tramite il nostro{" "}
           <Link 
             href="/contact" 
             className="text-primary underline hover:text-primary/80 transition-colors"
           >
             modulo di contatto
           </Link>.
         </p>

         <Link 
           href="/docs/privacy-policy.pdf" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="inline-block text-primary underline hover:text-primary/80 transition-colors"
         >
           Scarica la Privacy Policy (PDF)
         </Link>
       </div>
     </CardContent>
   </Card>
 );
}
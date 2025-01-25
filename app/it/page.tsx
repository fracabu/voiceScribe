"use client"

import { useState, useRef } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, FileAudio, Brain, UserCheck, Languages, Users, Briefcase, Mic2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from 'next/image';

const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const fadeInScale = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut"
        }
    }
};

export default function Home() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(false);
        setIsSubmitting(true);

        try {
            if (!db) {
                throw new Error('Servizio temporaneamente non disponibile');
            }

            await addDoc(collection(db, 'contacts'), {
                ...formData,
                createdAt: new Date(),
            });

            setFormSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            console.error('Errore nell\'invio del modulo:', error);
            setFormError('Si è verificato un errore durante l\'invio del modulo. Per favore, riprova.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95 transition-colors duration-300">

            {/* Sezione Hero */}
            <motion.section
                className="min-h-screen flex items-center justify-center relative overflow-hidden"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
                    />
                </div>
                <motion.div
                    className="container mx-auto px-4 text-center relative z-10"
                    variants={fadeInUp}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                        variants={slideIn}
                    >
                        Trasforma la Tua Voce
                        <br />
                        <span className="text-primary">in Testo Perfetto</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                        variants={fadeInUp}
                    >
                        Servizio professionale di trascrizione alimentato da tecnologia AI all&apos;avanguardia.
                        Veloce, accurato e sicuro.
                    </motion.p>
                    <motion.div
                        variants={fadeInScale}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button size="lg" className="text-lg px-8">Inizia Ora</Button>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Sezione Caratteristiche Avanzate */}
            <motion.section
                className="min-h-screen flex items-center justify-center bg-muted/30"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 py-16">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12"
                        variants={fadeInUp}
                    >
                        Caratteristiche Avanzate
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <Languages className="h-8 w-8 mb-2 text-primary" />,
                                title: "Lingue Multiple",
                                description: "Supporto per oltre 30 lingue con rilevamento automatico della lingua. Perfetto per contenuti internazionali."
                            },
                            {
                                icon: <Brain className="h-8 w-8 mb-2 text-primary" />,
                                title: "Accuratezza AI-Powered",
                                description: "Reti neurali avanzate garantiscono un'accuratezza superiore al 99%. Punteggiatura e formattazione automatiche."
                            },
                            {
                                icon: <UserCheck className="h-8 w-8 mb-2 text-primary" />,
                                title: "Output Personalizzato",
                                description: "Formati di esportazione multipli tra cui TXT, sottotitoli SRT e trascrizioni con timestamp."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInScale}
                                whileHover={{ scale: 1.05 }}
                                className="transform transition-all duration-300"
                            >
                                <Card>
                                    <CardHeader>
                                        {feature.icon}
                                        <CardTitle>{feature.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Sezione Perfetto per */}
            <motion.section
                className="min-h-screen flex items-center justify-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 py-16">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12"
                        variants={fadeInUp}
                    >
                        Perfetto per
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <Users className="h-10 w-10 text-primary" />,
                                title: "Studenti Universitari",
                                description: "Registra e trascrivi facilmente le tue lezioni, in modo da poterti concentrare sullo studio e su altre attività."
                            },
                            {
                                icon: <Briefcase className="h-10 w-10 text-primary" />,
                                title: "Studi Legali",
                                description: "Trascrivi accuratamente le tue riunioni e udienze, risparmiando tempo e risorse preziose."
                            },
                            {
                                icon: <Mic2 className="h-10 w-10 text-primary" />,
                                title: "Conferenze Scientifiche",
                                description: "Trascrivi presentazioni e discussioni in modo accurato, facilitando la condivisione e l'analisi delle informazioni."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInScale}
                                whileHover={{ scale: 1.05 }}
                                className="transform transition-all duration-300"
                            >
                                <Card className="bg-card/50 hover:bg-card/70 transition-colors">
                                    <CardHeader className="space-y-4">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-2 text-center">
                                            <CardTitle className="text-xl">{item.title}</CardTitle>
                                            <p className="text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Come Funziona */}
            <motion.section
                className="min-h-screen flex items-center justify-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 py-16">
                    <motion.h2
                        className="text-3xl font-bold text-center mb-12"
                        variants={fadeInUp}
                    >
                        Come Funziona
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <FileAudio className="h-10 w-10 text-primary" />,
                                title: "1. Scegli il Nostro Servizio",
                                description: "Visita la nostra pagina Fiverr e seleziona il servizio di trascrizione che meglio si adatta alle tue esigenze."
                            },
                            {
                                icon: <Brain className="h-10 w-10 text-primary" />,
                                title: "2. Condividi il Tuo Audio",
                                description: "Condividi il link di Google Drive contenente il file audio che desideri trascrivere."
                            },
                            {
                                icon: <UserCheck className="h-10 w-10 text-primary" />,
                                title: "3. Ricevi la Tua Trascrizione",
                                description: "Ottieni rapidamente e in modo sicuro il link della tua trascrizione accurata."
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInScale}
                                whileHover={{ scale: 1.05 }}
                                className="transform transition-all duration-300"
                            >
                                <Card className="bg-card/50 hover:bg-card/70 transition-colors">
                                    <CardHeader className="space-y-4">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                                            {step.icon}
                                        </div>
                                        <div className="space-y-2 text-center">
                                            <CardTitle className="text-xl">{step.title}</CardTitle>
                                            <p className="text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Pacchetti Fiverr */}
            <motion.section
                className="min-h-screen flex items-center justify-center bg-muted/30"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        className="text-center mb-12"
                        variants={fadeInUp}
                    >
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.svg"
                            alt="Logo Fiverr"
                            width={100}
                            height={100}
                            className="h-12 mx-auto mb-6"
                        />
                        <h2 className="text-3xl font-bold">Scegli il Tuo Servizio</h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: "Base",
                                price: "10,05 €",
                                description: "CONVERSIONE DA AUDIO A TESTO (BASE)",
                                features: [
                                    "Audio fino a 10 minuti in testo",
                                    "Multilingua",
                                    "ID degli speaker",
                                    "Timestamp",
                                    "Correzione di bozze",
                                    "Revisioni illimitate"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Standard",
                                price: "25,12 €",
                                description: "CONVERSIONE DA AUDIO A TESTO (STANDARD)",
                                features: [
                                    "Audio fino a 30 minuti in testo",
                                    "Multilingua",
                                    "ID degli speaker",
                                    "Timestamp",
                                    "Correzione di bozze",
                                    "Revisioni illimitate"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Premium",
                                price: "45,21 €",
                                description: "CONVERSIONE DA AUDIO A TESTO (PREMIUM)",
                                features: [
                                    "Audio fino a 60 minuti in testo",
                                    "Multilingua",
                                    "ID degli speaker",
                                    "Timestamp",
                                    "Correzione di bozze",
                                    "Revisioni illimitate"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            }
                        ].map((pkg, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInScale}
                                whileHover={{ scale: 1.05 }}
                                className="transform transition-all duration-300"
                            >
                                <Card className="bg-card h-full flex flex-col">
                                    <CardHeader className="text-center flex-1">
                                        <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                                        <div className="text-3xl font-bold text-primary mb-4">{pkg.price}</div>
                                        <p className="font-medium text-sm mb-6">{pkg.description}</p>
                                        <ul className="text-sm space-y-2 mb-6">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="text-muted-foreground">{feature}</li>
                                            ))}
                                        </ul>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button className="w-full bg-[#1dbf73] hover:bg-[#19a463] text-white" asChild>
                                                <a href={pkg.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                                    <span>Ordina Ora su</span>
                                                    <Image
                                                        src="https://upload.wikimedia.org/wikipedia/commons/1/18/Fiverr_Logo_09.2020.svg"
                                                        alt="Fiverr"
                                                        width={50}
                                                        height={50}
                                                        className="h-5 invert"
                                                    />
                                                </a>
                                            </Button>
                                        </motion.div>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Modulo di Contatto */}
            <motion.section
                ref={formRef}
                className="min-h-screen flex items-center justify-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4 py-16">
                    <motion.div
                        className="max-w-md mx-auto bg-card rounded-xl shadow-lg p-6"
                        variants={fadeInScale}
                    >
                        <h2 className="text-2xl font-semibold mb-6 text-center">Contattaci</h2>
                        <p className="text-muted-foreground text-center mb-8">
                            Mettiti in contatto per informazioni o un preventivo personalizzato per le tue esigenze di trascrizione.
                        </p>
                        {formError && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{formError}</AlertDescription>
                            </Alert>
                        )}
                        {formSuccess && (
                            <Alert className="mb-6">
                                <AlertDescription>Grazie per il tuo messaggio! Ti risponderemo al più presto.</AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nome</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Cognome</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Messaggio</Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Raccontaci delle tue esigenze di trascrizione..."
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Invio in corso...' : 'Invia Messaggio'}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </motion.section>

        </div>
    );
}

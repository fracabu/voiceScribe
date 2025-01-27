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
    const fiverrSectionRef = useRef<HTMLDivElement>(null);

    const scrollToFiverr = () => {
        fiverrSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(false);
        setIsSubmitting(true);

        try {
            if (!db) {
                throw new Error('Service temporarily unavailable');
            }

            await addDoc(collection(db, 'contacts'), {
                ...formData,
                createdAt: new Date(),
            });

            setFormSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormError('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95 transition-colors duration-300">

            {/* Hero Section */}
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
                        Transform Your Voice
                        <br />
                        <span className="text-primary">Into Perfect Text</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                        variants={fadeInUp}
                    >
                        Professional transcription service powered by cutting-edge AI technology.
                        Fast, accurate, and secure.
                    </motion.p>
                    <motion.div
                        variants={fadeInScale}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button size="lg" className="text-lg px-8" onClick={scrollToFiverr}>Get Started</Button>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Advanced Features Section */}
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
                        Advanced Features
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <Languages className="h-8 w-8 mb-2 text-primary" />,
                                title: "Multiple Languages",
                                description: "Support for 30+ languages with automatic language detection. Perfect for international content."
                            },
                            {
                                icon: <Brain className="h-8 w-8 mb-2 text-primary" />,
                                title: "AI-Powered Accuracy",
                                description: "Advanced neural networks ensure 99%+ accuracy. Automatic punctuation and formatting."
                            },
                            {
                                icon: <UserCheck className="h-8 w-8 mb-2 text-primary" />,
                                title: "Custom Output",
                                description: "Multiple export formats including TXT, SRT subtitles, and timestamped transcripts."
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

            {/* Perfect For Section */}
            <motion.section
                className="min-h-screen flex items-center justify-center bg-background/95"
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
                        Perfect For
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                icon: <Users className="h-10 w-10 text-primary" />,
                                title: "University Students",
                                description: "Easily record and transcribe your lectures, so you can focus on studying and other activities."
                            },
                            {
                                icon: <Briefcase className="h-10 w-10 text-primary" />,
                                title: "Law Firms",
                                description: "Accurately transcribe your meetings and hearings, saving valuable time and resources."
                            },
                            {
                                icon: <Mic2 className="h-10 w-10 text-primary" />,
                                title: "Scientific Conferences",
                                description: "Transcribe presentations and discussions accurately, facilitating easy sharing and analysis of information."
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

            {/* How It Works Section */}
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
                        How It Works
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: "Basic",
                                price: "10.05 €",
                                features: [
                                    "Audio up to 10 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Standard",
                                price: "25.12 €",
                                features: [
                                    "Audio up to 30 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Premium",
                                price: "45.21 €",
                                features: [
                                    "Audio up to 60 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
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
                                                    <span>Order Now on</span>
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

            {/* Fiverr Packages Section */}
            <motion.section
                ref={fiverrSectionRef}
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
                            alt="Fiverr Logo"
                            width={300}
                            height={300}
                            className="h-12 mx-auto mb-6"
                        />
                        <h2 className="text-3xl font-bold">Choose Your Service</h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: "Basic",
                                price: "10,05 €",
                                description: "AUDIO TO TEXT CONVERSION",
                                features: [
                                    "Audio up to 10 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Standard",
                                price: "25,12 €",
                                description: "AUDIO TO TEXT CONVERSION",
                                features: [
                                    "Audio up to 30 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            },
                            {
                                title: "Premium",
                                price: "45,21 €",
                                description: "AUDIO TO TEXT CONVERSION",
                                features: [
                                    "Audio up to 60 minutes to text",
                                    "Multilingual",
                                    "Speaker ID",
                                    "Timestamp",
                                    "Proofreading",
                                    "Unlimited revisions"
                                ],
                                link: "https://it.fiverr.com/s/R7xGLl8"
                            }
                        ].map((pkg, index) => (
                            <motion.div
                                key={index} variants={fadeInScale}
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
                                                    <span>Order Now on</span>
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

            {/* Contact Form */}
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
                        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
                        <p className="text-muted-foreground text-center mb-8">
                            Get in touch for information or a custom quote for your transcription needs.
                        </p>
                        {formError && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{formError}</AlertDescription>
                            </Alert>
                        )}
                        {formSuccess && (
                            <Alert className="mb-6">
                                <AlertDescription>Thank you for your message! We will get back to you soon.</AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
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
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your transcription needs..."
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </motion.section>

        </div>
    );
}
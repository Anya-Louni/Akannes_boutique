import ContactForm from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="animate-fadeIn container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary text-shadow-magic">Get In Touch</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">We'd love to hear from you! Send us a message or find us online.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-white/30 backdrop-blur-sm border border-primary/10 p-8 rounded-2xl shadow-lg">
                    <h2 className="font-headline text-3xl text-primary mb-6">Send a Message</h2>
                    <ContactForm />
                </div>

                <div className="space-y-8">
                    <div className="bg-white/30 backdrop-blur-sm border border-primary/10 p-8 rounded-2xl shadow-lg">
                        <h3 className="font-headline text-2xl text-primary mb-4">Contact Information</h3>
                        <div className="space-y-4 text-foreground/80">
                            <div className="flex items-center gap-4">
                                <Mail className="h-6 w-6 text-accent"/>
                                <a href="mailto:hello@akkanesboutique.dz" className="hover:text-primary">hello@akkanesboutique.dz</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-6 w-6 text-accent"/>
                                <span>+213 (0) 5 12 34 56 78</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="h-6 w-6 text-accent"/>
                                <span>Based in Algiers, Algeria (Online Only)</span>
                            </div>
                        </div>
                    </div>

                     <div className="bg-white/30 backdrop-blur-sm border border-primary/10 p-8 rounded-2xl shadow-lg">
                        <h3 className="font-headline text-2xl text-primary mb-4">Follow Us</h3>
                        <div className="flex items-center gap-4">
                            <Instagram className="h-6 w-6 text-accent"/>
                            <a href="https://instagram.com/akkanesboutique" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary">
                                @akkanesboutique
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

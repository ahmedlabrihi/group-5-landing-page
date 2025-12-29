import { Laptop, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="relative border-t border-purple-500/20 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Laptop className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">EMS</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Electronics Maintenance Service - Your trusted partner for laptop repair and maintenance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Services</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Hardware Repair</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Software Support</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Diagnostics</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Maintenance</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:support@ems.com" className="hover:text-purple-400 transition-colors">
                                    support@ems.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href="tel:+1234567890" className="hover:text-purple-400 transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>123 Tech Street, City</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="pt-8 border-t border-purple-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2024 EMS - Electronics Maintenance Service. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

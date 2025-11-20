'use client';

import { useState, FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// --- Status Feedback Component ---
// Helper component for displaying success/error messages
const StatusAlert = ({ status, message }: { status: 'success' | 'error' | null, message: string }) => {
    if (!status) return null;

    const baseStyle = "p-3 rounded-lg font-semibold mb-4";
    const successStyle = "bg-green-100 text-green-700 border border-green-300";
    const errorStyle = "bg-red-100 text-red-700 border border-red-300";

    return (
        <div className={`${baseStyle} ${status === 'success' ? successStyle : errorStyle}`}>
            {message}
        </div>
    );
};
// ---------------------------------

export function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear status feedback upon new input
        if (status) {
            setStatus(null);
            setStatusMessage('');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setStatusMessage('Thank you! Your message has been sent successfully. We will respond shortly.');
                setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
            } else {
                setStatus('error');
                setStatusMessage(result.message || 'An error occurred while sending the message. Please try again.');
            }
        } catch (error) {
            console.error('Form Submission Error:', error);
            setStatus('error');
            setStatusMessage('Network error. Please check your connection or try calling us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-muted/30 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            
            <StatusAlert status={status} message={statusMessage} />

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">Name *</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone *</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+91 XXXXXXXXXX"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Your message..."
                        disabled={loading}
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn-primary w-full flex items-center justify-center disabled:opacity-70"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>
        </div>
    );
}
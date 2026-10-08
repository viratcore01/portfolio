import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle2, Copy } from 'lucide-react';
import { SITE } from '../config/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (name.trim().length < 2) return setFormError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return setFormError('Please enter a valid email address.');
    if (message.trim().length < 10)
      return setFormError('Tell me a little more (10+ characters).');

    setStatus('sending');
    try {
      // 1) Try FormSubmit AJAX (works with zero backend once you activate it).
      //    First submission triggers an activation email — after that it's instant.
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      // 2) Graceful fallback: open the visitor's mail client with everything prefilled.
      const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
      const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-4"
            >
              Let's build something <span className="text-gradient">incredible</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Currently available for freelance projects and full-time roles. Replies within 24h.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-panel p-8 space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>

                <button
                  onClick={copyEmail}
                  className="w-full flex items-center gap-4 text-muted-foreground hover:text-white transition-colors text-left"
                  title="Click to copy email"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm">Email {copied ? '· copied!' : '· click to copy'}</p>
                    <p className="font-medium text-white truncate">{SITE.email}</p>
                  </div>
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 ml-auto shrink-0 opacity-50" />
                  )}
                </button>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="font-medium text-white">{SITE.location} · Remote worldwide</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm">Phone</p>
                    <p className="font-medium text-white">{SITE.phone}</p>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <a
                    href={SITE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={SITE.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 space-y-5"
              onSubmit={handleSubmit}
            >
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Message sent!</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Thanks for reaching out — I'll reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm hover:bg-white/10 transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Tell me about your project, timeline and budget…"
                    />
                  </div>

                  {formError && <p className="text-sm text-red-300">{formError}</p>}

                  <button
                    disabled={status === 'sending'}
                    className="w-full bg-white text-black font-semibold rounded-xl px-4 py-4 flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors group disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-white/30 text-center">
                    No backend needed — sends via FormSubmit, falls back to your mail app.
                  </p>
                </>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

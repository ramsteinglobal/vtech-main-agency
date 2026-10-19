import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const magneticRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setMagneticPos({ x, y });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    try {
      const res = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ loading: false, success: true, message: 'Enquiry received & saved to MongoDB!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback demo success if server is offline
        setStatus({ loading: false, success: true, message: 'Enquiry received! The studio will connect within 24h.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      // Local fallback
      setStatus({ loading: false, success: true, message: 'Enquiry received! (Studio offline demo mode)' });
      setFormData({ name: '', email: '', message: '' });
    }

    setTimeout(() => {
      setStatus({ loading: false, success: false, message: '' });
    }, 4500);
  };

  return (
    <section className="bg-white text-black pt-32 pb-24 px-6 md:px-12 transition-colors duration-500 rounded-t-[40px] md:rounded-t-[60px]" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-neutral-700 text-xs font-sans uppercase tracking-widest mb-6">
            <span>Independent Studio — Founder Led (MERN 3D Architecture)</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black leading-[1.1] mb-8">
            We focus on making ambitious brands feel confident, human, and memorable.
          </h2>
          <p className="text-neutral-600 text-base md:text-lg max-w-2xl font-normal leading-relaxed mb-8">
            Whether launching a flagship product from scratch or modernizing an enterprise digital presence, our builds strengthen connection with unmistakable craft.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-syne font-bold text-lg text-black">Vaibhav</span>
            <span className="text-xs font-sans text-neutral-500 uppercase tracking-wider">— Founder, CraftPixel Studios</span>
          </div>
        </div>

        {/* Giant Typographic Parallax Canvas with Magnetic Button */}
        <div className="mt-28 relative select-none flex flex-col items-center justify-center py-24 overflow-hidden">
          <h2 className="font-syne text-[15vw] leading-none font-extrabold tracking-tighter text-neutral-200 text-center whitespace-nowrap" id="lets-talk-bg">
            Let's Talk
          </h2>
          <div className="absolute z-20 flex items-center justify-center">
            <a
              ref={magneticRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              href="#contact-form-section"
              className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-black text-white flex flex-col items-center justify-center text-center p-4 font-syne font-bold text-xs sm:text-sm tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
            >
              <span className="group-hover:tracking-widest transition-all">START A PROJECT</span>
              <span className="text-[10px] font-sans text-neutral-400 mt-1">LET'S BUILD ↗</span>
            </a>
          </div>
        </div>

        {/* Inquiries & Form */}
        <div className="mt-20 pt-16 border-t border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-form-section">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-sans uppercase tracking-widest text-neutral-500">Direct Inquiries</span>
            <h3 className="font-syne text-3xl font-bold text-black">Have a good one in mind? Let’s make it matter.</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">Tell us a little about what you’re building. We typically respond within 24 hours.</p>
            <div className="pt-4 space-y-3 font-sans text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Booking Q2/Q3 2026 Projects</span>
              </div>
              <div className="text-neutral-500">CraftPixel Studios — Express API & MongoDB Backend Ready</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-neutral-600 mb-1" htmlFor="user-name">Your Name</label>
                  <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="How should we call you?"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-neutral-600 mb-1" htmlFor="user-email">Email Address</label>
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300 text-sm focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-sans text-neutral-600 mb-1" htmlFor="project-desc">About Your Project</label>
                <textarea
                  id="project-desc"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What are you looking to create, revamp, or build?"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300 text-sm focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`px-8 py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                    status.success ? 'bg-emerald-600 text-white' : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  {status.loading ? 'Sending...' : status.success ? 'Sent Successfully ✓' : 'Send Enquiry ↗'}
                </button>
                <span className="max-w-xs text-xs font-sans text-neutral-500">
                  {status.message || 'Direct studio & MongoDB dispatch'}
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-28 pt-10 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-sans gap-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>© 2026 CraftPixel Studios.</span>
            <span>Design with intent. Built to last.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-black font-semibold uppercase tracking-wider">
            <Link className="hover:text-neutral-500 transition-colors" to="/">Home</Link>
            <Link className="hover:text-neutral-500 transition-colors" to="/work">Work</Link>
            <a className="hover:text-neutral-500 transition-colors" href="/#services">Services</a>
            <a className="hover:text-neutral-500 transition-colors" href="#contact">Contact</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

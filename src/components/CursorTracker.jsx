import React, { useEffect, useRef } from 'react';

export default function CursorTracker({ activeProject }) {
  const previewRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, prevX = 0;
    let currX = 0, currY = 0, currTilt = 0, targetTilt = 0;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const vx = mouseX - prevX;
      targetTilt = Math.max(Math.min(vx * 0.25, 12), -12);
      prevX = mouseX;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const loop = () => {
      currX += (mouseX - currX) * 0.16;
      currY += (mouseY - currY) * 0.16;
      currTilt += (targetTilt - currTilt) * 0.12;
      targetTilt *= 0.94;

      if (previewRef.current) {
        previewRef.current.style.left = `${currX}px`;
        previewRef.current.style.top = `${currY}px`;
        previewRef.current.style.transform = `translate3d(-50%, -50%, 0) rotate(${currTilt.toFixed(2)}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={previewRef}
      id="cursor-preview"
      className={`${activeProject ? 'active' : ''}`}
      aria-hidden="true"
    >
      <div className="relative w-full h-full bg-[#121214] flex flex-col justify-between p-5">
        <div className="absolute inset-0 z-0">
          {/* Velora */}
          <div className={`cursor-preview-img bg-gradient-to-br from-[#271b14] via-[#1c140f] to-[#0c0a09] flex items-center justify-center p-5 ${activeProject === 'velora' ? 'visible' : ''}`}>
            <div className="w-full h-full rounded-xl border border-amber-500/30 bg-black/50 backdrop-blur p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest text-amber-400 uppercase">Hospitality / Stay</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="text-[10px] font-sans text-neutral-400">Portugal Coastline</div>
                <div className="text-sm font-syne font-bold text-amber-100">The Grand Velora</div>
                <div className="text-[10px] text-neutral-300">Seven quiet suites above the sea</div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-amber-500/20">
                <span className="text-[10px] font-sans text-neutral-400">Direct Bookings</span>
                <span className="text-[10px] font-sans text-amber-300 font-bold">+3.8x Lift</span>
              </div>
            </div>
          </div>

          {/* Arogya */}
          <div className={`cursor-preview-img bg-gradient-to-br from-[#062420] via-[#09322c] to-[#09090b] flex items-center justify-center p-5 ${activeProject === 'arogya' ? 'visible' : ''}`}>
            <div className="w-full h-full rounded-xl border border-emerald-500/30 bg-black/50 backdrop-blur p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest text-emerald-400 uppercase">Healthtech Platform</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-3 my-auto">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-sm font-sans font-bold text-emerald-300">+</div>
                <div>
                  <div className="text-xs font-syne font-semibold text-white">Arogya Care Portal</div>
                  <div className="text-[10px] text-neutral-400 font-sans">Calm Telehealth Journey</div>
                </div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-emerald-500/20">
                <span className="text-[10px] font-sans text-neutral-400">Patient Trust</span>
                <span className="text-[10px] font-sans text-emerald-300 font-bold">99.4% CSAT</span>
              </div>
            </div>
          </div>

          {/* Forma */}
          <div className={`cursor-preview-img bg-gradient-to-br from-[#2a1d17] via-[#1a1412] to-[#0d0b0a] flex items-center justify-center p-5 ${activeProject === 'forma' ? 'visible' : ''}`}>
            <div className="w-full h-full rounded-xl border border-orange-400/30 bg-black/50 backdrop-blur p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest text-orange-300 uppercase">Objects For Living</span>
                <span className="text-[10px] font-sans text-neutral-400">Edit 01</span>
              </div>
              <div className="space-y-1.5 my-auto">
                <div className="text-sm font-syne font-bold text-white">Forma Living</div>
                <div className="flex gap-1.5 items-center">
                  <span className="w-3 h-3 rounded-full bg-[#8c6239]" />
                  <span className="w-3 h-3 rounded-full bg-[#4a5d4e]" />
                  <span className="w-3 h-3 rounded-full bg-[#d5c3aa]" />
                  <span className="text-[10px] font-sans text-neutral-400 ml-1">Walnut & Velvet</span>
                </div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-orange-500/20">
                <span className="text-[10px] font-sans text-neutral-400">E-Commerce Flow</span>
                <span className="text-[10px] font-sans text-orange-300 font-bold">+54% Cart Size</span>
              </div>
            </div>
          </div>

          {/* Rasayana */}
          <div className={`cursor-preview-img bg-gradient-to-br from-[#3b120c] via-[#240b07] to-[#09090b] flex items-center justify-center p-5 ${activeProject === 'rasayana' ? 'visible' : ''}`}>
            <div className="w-full h-full rounded-xl border border-rose-500/30 bg-black/50 backdrop-blur p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans tracking-widest text-rose-400 uppercase">Fine Dining & Tasting</span>
                <span className="text-xs text-rose-400">✳</span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="text-xs font-syne font-bold text-white">Rasayana Seasonal</div>
                <div className="text-[10px] text-neutral-300">A sensory digital culinary home</div>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-rose-500/20">
                <span className="text-[10px] font-sans text-neutral-400">Weekend Bookings</span>
                <span className="text-[10px] font-sans text-rose-300 font-bold">100% Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

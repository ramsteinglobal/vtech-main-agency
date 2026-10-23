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
          <div className={`cursor-preview-img bg-neutral-950 ${activeProject === 'arogya' ? 'visible' : ''}`}>
            {activeProject === 'arogya' && (
              <>
                <iframe
                  src="https://vtech-arogya-hospital-4sgp.vercel.app/"
                  title="Arogya Healthcare live hover preview"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute left-0 top-0 border-0 bg-white"
                  style={{ width: '250%', height: '250%', transform: 'scale(0.4)', transformOrigin: 'top left' }}
                />
              </>
            )}
          </div>

          {/* Forma */}
          <div className={`cursor-preview-img bg-neutral-950 ${activeProject === 'forma' ? 'visible' : ''}`}>
            {activeProject === 'forma' && (
              <>
                <iframe
                  src="https://vtech-formaliving-furniture-q832.vercel.app/"
                  title="Forma Living live hover preview"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute left-0 top-0 border-0 bg-white"
                  style={{ width: '250%', height: '250%', transform: 'scale(0.4)', transformOrigin: 'top left' }}
                />
              </>
            )}
          </div>

          {/* Rasayana */}
          <div className={`cursor-preview-img bg-neutral-950 ${activeProject === 'rasayana' ? 'visible' : ''}`}>
            {activeProject === 'rasayana' && (
              <iframe
                src="https://vtech-rasayana-restaurant.vercel.app/"
                title="Rasayana live hover preview"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute left-0 top-0 border-0 bg-white"
                style={{ width: '250%', height: '250%', transform: 'scale(0.4)', transformOrigin: 'top left' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

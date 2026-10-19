import { useEffect, useRef } from 'react';

const MAGNETIC_TARGETS = 'a, button, [role="button"], [data-magnetic], .work-list-item, .studio-card';

export default function MagneticCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return undefined;

    const cursor = cursorRef.current;
    if (!cursor) return undefined;
    const label = cursor.querySelector('.magnetic-cursor__label');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let isAnimating = false;
    let hasMoved = false;
    document.body.classList.add('has-magnetic-cursor');

    const render = () => {
      const easing = 0.2;
      currentX += (mouseX - currentX) * easing;
      currentY += (mouseY - currentY) * easing;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      if (Math.abs(mouseX - currentX) > 0.35 || Math.abs(mouseY - currentY) > 0.35) {
        frame = requestAnimationFrame(render);
      } else {
        currentX = mouseX;
        currentY = mouseY;
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
        isAnimating = false;
      }
    };

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!hasMoved) {
        currentX = mouseX;
        currentY = mouseY;
        hasMoved = true;
        cursor.classList.add('is-visible');
      }

      const target = event.target instanceof Element ? event.target.closest(MAGNETIC_TARGETS) : null;
      cursor.classList.toggle('is-hovering', Boolean(target));

      if (target) {
        const rect = target.getBoundingClientRect();
        const maxPull = 13;
        const pullX = Math.max(-maxPull, Math.min(maxPull, (rect.left + rect.width / 2 - mouseX) * 0.18));
        const pullY = Math.max(-maxPull, Math.min(maxPull, (rect.top + rect.height / 2 - mouseY) * 0.18));
        cursor.style.setProperty('--cursor-pull-x', `${pullX}px`);
        cursor.style.setProperty('--cursor-pull-y', `${pullY}px`);
        label.textContent = target.matches('button, [role="button"]') ? 'CLICK' : 'VIEW';
      } else {
        cursor.style.setProperty('--cursor-pull-x', '0px');
        cursor.style.setProperty('--cursor-pull-y', '0px');
        label.textContent = '';
      }

      if (!isAnimating) {
        isAnimating = true;
        frame = requestAnimationFrame(render);
      }
    };

    const leave = () => {
      cursor.classList.remove('is-visible', 'is-hovering', 'is-pressed');
      label.textContent = '';
    };
    const press = () => cursor.classList.add('is-pressed');
    const release = () => cursor.classList.remove('is-pressed');

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup', release);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove('has-magnetic-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', press);
      window.removeEventListener('mouseup', release);
    };
  }, []);

  return (
    <div ref={cursorRef} className="magnetic-cursor" aria-hidden="true">
      <span className="magnetic-cursor__ring" />
      <span className="magnetic-cursor__dot" />
      <span className="magnetic-cursor__label" />
    </div>
  );
}

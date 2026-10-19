import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      const heroContent = gsap.utils.toArray(
        '.home-page #home .relative.z-10 > *, .work-page > section:first-child h1, .work-page > section:first-child p, .content-page .page-hero h1, .content-page .page-hero p'
      );

      if (heroContent.length) {
        gsap.fromTo(
          heroContent,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.12 }
        );
      }

      const revealOnScroll = (selector, options = {}) => {
        gsap.utils.toArray(selector).forEach((element, index) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: options.y ?? 28, scale: options.scale ?? 1 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: options.duration ?? 0.8,
              delay: (index % 3) * 0.07,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 84%',
                once: true,
              },
            }
          );
        });
      };

      revealOnScroll('.home-page > section:not(#home) h2, .home-page #work .work-showcase__header, .home-page #work article, .home-page #services .grid > div, .home-page #studio .studio-principle, .home-page #process .process-step, .home-page #metrics .grid > div, #contact h2, #contact form, #contact footer');
      revealOnScroll('.work-page .work-featured-card, .work-page .work-featured-card__visual, .work-page .work-filter-bar, .content-page #services .grid > div, .content-page #studio .studio-principle, .content-page #process .process-step', { y: 24, duration: 0.68 });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => context.revert();
  }, [pathname]);

  return null;
}
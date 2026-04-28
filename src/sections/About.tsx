import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const manifestoText =
  "We do not capture moments. We sculpt light, shadow, and emotion into visual artifacts that outlive memory. Every frame is a deliberate act of creation — a collaboration between the subject, the artist, and the invisible architecture of light. This is not photography. This is alchemy.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const signatureRef = useRef<HTMLDivElement>(null);

  const words = manifestoText.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label fade in
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Word reveal with scroll scrub
      const validWords = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
      validWords.forEach((word) => {
        gsap.to(word, {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: word,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        });
      });

      // Signature
      gsap.to(signatureRef.current, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: signatureRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-[140px] bg-[#0a0a0a]"
    >
      <div className="container-luxe">
        <div
          ref={labelRef}
          className="text-center mb-[60px] opacity-0 translate-y-5"
        >
          <span className="label-style text-[#bc9364]">THE MANIFESTO</span>
        </div>

        <div className="max-w-[1100px] mx-auto text-center">
          <p className="font-display text-[36px] md:text-[64px] leading-[1.1] text-[#f5f2eb]">
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordsRef.current[i] = el; }}
                className="inline-block mr-[0.3em]"
                style={{
                  filter: 'blur(8px)',
                  opacity: 0.2,
                  transform: 'translateY(20px)',
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <div
          ref={signatureRef}
          className="mt-[60px] text-right max-w-[1100px] mx-auto opacity-0"
        >
          <span className="text-[16px] font-medium text-[#bc9364]">
            — Henri Lumière, Founder
          </span>
        </div>
      </div>
    </section>
  );
}

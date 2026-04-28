import React from 'react';

const row1 = [
  'Vogue Italia',
  "Harper's Bazaar",
  'The New York Times',
  'GQ',
  'Vanity Fair',
  "L'Officiel",
  'Wallpaper*',
  'Architectural Digest',
];

const row2 = [
  'IPA International Photography Awards',
  'Hasselblad Masters',
  'World Press Photo',
  'PDN Photo Annual',
  'Communication Arts',
];

const MarqueeRow = React.memo(function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4 group">
      <div
        className={`flex gap-8 whitespace-nowrap ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span className="text-[16px] text-[#8a8a8a] uppercase tracking-[0.15em] font-medium flex-shrink-0">
              {item}
            </span>
            <span className="text-[#bc9364] text-[12px] flex-shrink-0">&#10022;</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default function Awards() {
  return (
    <section className="py-[80px] bg-[#0a0a0a] border-y border-[#2a2a2a]">
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </section>
  );
}

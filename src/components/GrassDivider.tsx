type Tone = 'cream' | 'surface' | 'forest' | 'dark' | 'orange' | 'primary';

const TONE_BG: Record<Tone, string> = {
  cream: 'bg-cream',
  surface: 'bg-surface',
  forest: 'bg-deep-forest',
  dark: 'bg-midnight-moss',
  orange: 'bg-safety-orange',
  primary: 'bg-primary',
};

/**
 * Full-width lush grass divider. Two tiled grass layers are stacked — a taller,
 * darker back layer offset by half a tile behind a front layer — so the blades
 * interleave and read thick, not sparse. Decorative only (aria-hidden). The band
 * background matches the section it sits on top of.
 */
export default function GrassDivider({
  tone = 'cream',
  className = '',
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative h-14 w-full overflow-hidden sm:h-20 ${TONE_BG[tone]} ${className}`}
    >
      {/* back layer: taller + darker, offset half a tile to fill the gaps */}
      <div
        className="absolute inset-0 origin-bottom bg-[url(/images/decor/grass-strip.svg)] bg-[length:auto_100%] bg-bottom bg-repeat-x [filter:brightness(0.8)_saturate(1.05)] [transform:scaleY(1.2)]"
        style={{ backgroundPositionX: '48px' }}
      />
      {/* front layer */}
      <div className="absolute inset-0 bg-[url(/images/decor/grass-strip.svg)] bg-[length:auto_100%] bg-bottom bg-repeat-x" />
    </div>
  );
}

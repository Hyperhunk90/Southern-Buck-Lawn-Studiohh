import Image from 'next/image';

type Corner = 'twig' | 'leaf' | 'none';

type FramedPhotoProps = {
  src: string;
  alt: string;
  /** Tailwind aspect utility, e.g. 'aspect-[4/3]'. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  corner?: Corner;
  /** Which corner the ornament sits in. */
  cornerPos?: 'tl' | 'tr' | 'bl' | 'br';
  tape?: boolean;
  /** Extra classes on the outer matte (rotation, width, margins). */
  className?: string;
};

const CORNER_SRC: Record<Exclude<Corner, 'none'>, string> = {
  twig: '/images/decor/twig-corner.svg',
  leaf: '/images/decor/leaf-spray.svg',
};

const CORNER_POS: Record<NonNullable<FramedPhotoProps['cornerPos']>, string> = {
  tl: 'left-0 top-0',
  tr: 'right-0 top-0 -scale-x-100',
  bl: 'left-0 bottom-0 -scale-y-100',
  br: 'right-0 bottom-0 -scale-100',
};

/**
 * A real photo dressed as a taped field-guide print: kraft matte, grass-blade
 * bottom border, and a hand-drawn twig/leaf corner. Decorative art is
 * aria-hidden; the photo keeps its real alt text and next/image optimization.
 */
export default function FramedPhoto({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  sizes = '(max-width: 767px) 90vw, 40vw',
  priority = false,
  corner = 'twig',
  cornerPos = 'tl',
  tape = false,
  className = '',
}: FramedPhotoProps) {
  return (
    <div className={`photo-matte relative ${className}`}>
      {tape && (
        <span
          aria-hidden
          className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 rounded-[2px]"
        />
      )}
      <div className={`relative overflow-hidden rounded-[3px] ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={60}
          priority={priority}
          className="object-cover"
        />
      </div>
      {corner !== 'none' && (
        <div
          aria-hidden
          className={`pointer-events-none absolute h-16 w-16 bg-contain bg-no-repeat sm:h-20 sm:w-20 ${CORNER_POS[cornerPos]}`}
          style={{ backgroundImage: `url(${CORNER_SRC[corner]})` }}
        />
      )}
    </div>
  );
}

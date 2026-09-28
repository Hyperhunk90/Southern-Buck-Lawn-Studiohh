/**
 * Large decorative Southern Buck mascot behind a section's content.
 * The parent section must be `relative overflow-hidden`, and its content
 * wrapper `relative` so it stacks above this layer.
 */
export default function BuckWatermark({ side = 'right' }: { side?: 'left' | 'right' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-4 w-3/4 bg-[url(/images/southern-buck-lawn-mascot-watermark.webp)] bg-contain bg-no-repeat opacity-50 sm:w-1/2 lg:w-2/5 ${
        side === 'right' ? 'right-0 bg-right' : 'left-0 bg-left'
      }`}
    />
  );
}

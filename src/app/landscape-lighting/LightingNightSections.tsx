'use client';

import LightingNightMid from './LightingNightMid';
import LightingNightClose from './LightingNightClose';

export default function LightingNightSections({
  duskProgress,
  openFaq,
  setOpenFaq,
  scrollToForm,
  reduce,
}: {
  duskProgress: number;
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
  scrollToForm: () => void;
  reduce: boolean | null;
}) {
  return (
    <>
      <LightingNightMid duskProgress={duskProgress} reduce={reduce} />
      <LightingNightClose openFaq={openFaq} setOpenFaq={setOpenFaq} scrollToForm={scrollToForm} />
    </>
  );
}

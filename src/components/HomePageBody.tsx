import dynamic from 'next/dynamic';
import HomeHero from '@/components/HomeHero';
import HomeHeroWhy from '@/components/HomeHeroWhy';
import HomeServices from '@/components/HomeServices';

/** Below-fold home sections — code-split so they are not in the first home chunk. */
const HomeMid = dynamic(() => import('@/components/HomeMid'));
const HomeMidRest = dynamic(() => import('@/components/HomeMidRest'));
const HomeTail = dynamic(() => import('@/components/HomeTail'));

export default function HomePageBody() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomeHeroWhy />
      <HomeMid />
      <HomeMidRest />
      <HomeTail />
    </>
  );
}

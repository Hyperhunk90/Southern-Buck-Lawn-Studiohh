import HomeHero from '@/components/HomeHero';
import HomeHeroWhy from '@/components/HomeHeroWhy';
import HomeServices from '@/components/HomeServices';
import HomeMid from '@/components/HomeMid';
import HomeMidRest from '@/components/HomeMidRest';
import HomeTail from '@/components/HomeTail';
import GrassDivider from '@/components/GrassDivider';

export default function HomePageBody() {
  return (
    <>
      <HomeHero />
      <GrassDivider tone="surface" />
      <HomeServices />
      <GrassDivider tone="forest" />
      <HomeHeroWhy />
      <GrassDivider tone="surface" />
      <HomeMid />
      <GrassDivider tone="cream" />
      <HomeMidRest />
      <GrassDivider tone="dark" />
      <HomeTail />
    </>
  );
}

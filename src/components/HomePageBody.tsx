import HomeHero from '@/components/HomeHero';
import HomeHeroWhy from '@/components/HomeHeroWhy';
import HomeServices from '@/components/HomeServices';
import HomeMid from '@/components/HomeMid';
import HomeMidRest from '@/components/HomeMidRest';
import HomeTail from '@/components/HomeTail';

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

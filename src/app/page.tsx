import { Hero } from '@/components/sections/hero';
import { CategoriesSection } from '@/components/sections/categories-section';
import { BestSellersSection } from '@/components/sections/bestsellers-section';
import { DropsSection } from '@/components/sections/drops-section';
import { BuildSetupSection } from '@/components/sections/build-setup-section';
import { StatsSection } from '@/components/sections/stats-section';
import { SetupsSection } from '@/components/sections/setups-section';
import { CreatorsSection } from '@/components/sections/creators-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <BestSellersSection />
      <DropsSection />
      <BuildSetupSection />
      <StatsSection />
      <SetupsSection />
      <CreatorsSection />
    </>
  );
}

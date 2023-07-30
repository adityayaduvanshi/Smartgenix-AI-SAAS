import LandingFeatures from '@/components/landing-features';
import { LandingHero } from '@/components/landing-hero';
import LandingNavbar from '@/components/landing-navbar';

export default function LandingPage() {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
    </div>
  );
}

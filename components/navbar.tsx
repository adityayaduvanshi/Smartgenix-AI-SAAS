import { UserButton } from '@clerk/nextjs';

import MobileMenu from '@/components/mobile-menu';
import { getApiLimitCount } from '@/lib/api-limit';
import { ModeToggle } from './mode-toggle';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4 ">
      <MobileMenu isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className=" flex gap-3 w-full justify-end">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

// @module:platform-core @layer:ui @owner:studio
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { MainNav } from './main-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';

// >>> BEGIN gen:core.header (layer:ui)
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              M'Student
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <MainNav />
          </nav>
        </div>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Future items like user dropdown can go here */}
        </div>
      </div>
    </header>
  );
}
// <<< END gen:core.header

// @module:platform-core @layer:ui @owner:studio
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { MainNav } from './main-nav';

// >>> BEGIN gen:platform-core.header (layer:ui)
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            M'Student
          </span>
        </Link>
        <MainNav />
      </div>
    </header>
  );
}
// <<< END gen:platform-core.header

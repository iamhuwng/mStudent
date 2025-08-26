// @module:platform-core @layer:ui @owner:studio
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { modules } from '@/modules/registry';

// >>> BEGIN gen:core.nav (layer:ui)
export function MainNav() {
  const pathname = usePathname();
  const enabledModules = modules.filter((m) => m.enabled);

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {enabledModules.map((mod) => (
        <Link
          key={mod.id}
          href={mod.path}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname?.startsWith(mod.path)
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
        >
          {mod.title}
        </Link>
      ))}
    </nav>
  );
}
// <<< END gen:core.nav

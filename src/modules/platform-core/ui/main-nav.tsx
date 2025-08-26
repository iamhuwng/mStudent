// @module:platform-core @layer:ui @owner:studio
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { modules } from '@/modules/registry';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Book, GraduationCap, Grid, Home, Settings, Users, PenSquare } from 'lucide-react';
import React from 'react';

const moduleIcons: { [key: string]: React.ReactElement } = {
  home: <Home />,
  'dashboard-teacher': <Grid />,
  users: <Users />,
  classes: <Users />,
  materials: <Book />,
  flashcards: <PenSquare />,
  settings: <Settings />,
};

// >>> BEGIN gen:core.nav (layer:ui)
function DesktopNav() {
    const pathname = usePathname();
    const enabledModules = modules.filter((m) => m.enabled && m.inNav);

    return (
        <>
            {enabledModules.map((mod) => (
                <Link
                    key={mod.id}
                    href={mod.path}
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith(mod.path) ? 'text-foreground' : 'text-foreground/60'
                    )}>{mod.title}</Link>
            ))}
        </>
    )
}

function MobileNav() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const enabledModules = modules.filter((m) => m.enabled && m.inNav);

  if (!open) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block font-headline">
              M'Student
            </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {enabledModules.map((mod) => (
            <SidebarMenuItem key={mod.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname?.startsWith(mod.path)}
                icon={moduleIcons[mod.id]}
              >
                <Link href={mod.path}>{mod.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}


export function MainNav() {
  return (
    <>
        <div className='hidden md:flex items-center space-x-4 lg:space-x-6'>
            <DesktopNav />
        </div>
        <div className='md:hidden'>
            <MobileNav />
        </div>
    </>
  );
}
// <<< END gen:core.nav

'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  Bot,
  GalleryVerticalEnd,
  Home,
  Tickets,
  User,
  FileCheck2,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavSecondary } from './nav-secondary';
import { IconHelp, IconSettings } from '@tabler/icons-react';

import { useSession } from '@/context/session-context';
import { BoxSpinner } from './loading-style/box-spinner';
import RoundSpinner from './loading-style/round-spinner';
import { useLoading } from '@/context/LoadingContext';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session, isLoading: sessionLoading } = useSession();
  const { setLoading } = useLoading();

  const pathname = usePathname();

  // if (sessionLoading || !session?.userInfo) {
  //   setLoading(true);
  //   // return (
  //   //   <>
  //   //     <div className="p-2 w-64 border-r"></div>
  //   //     {/* <BoxSpinner /> */}
  //   //     {/* <RoundSpinner /> */}
  //   //   </>
  //   // );
  // } else {
  //   setLoading(false);
  // }

  React.useEffect(() => {
    if (sessionLoading || !session?.userInfo) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [sessionLoading, session, setLoading]);

  if (sessionLoading || !session?.userInfo) {
    return (
      <>
        {/* to manage left sidebar width during loading */}
        <div className="p-2 w-64 border-r"></div>;
      </>
    );
  }

  const isAdmin = session?.currentOrg?.role === 'ADMIN';

  const data = {
    user: {
      name: session.userInfo.fullName,
      email: session?.userInfo?.email,
      avatar: '/avatars/shadcn.jpg',
    },
    nav: [
      {
        title: 'Home',
        url: '/home',
        icon: Home,
      },
    ],
    navMain: [
      {
        title: 'Customer Support',
        url: '/customer-support/dashboard',
        icon: Tickets,
        isActive: true,
        items: [
          {
            title: 'Dashboard',
            url: '/customer-support/dashboard',
          },
          {
            title: 'Open tickets',
            url: '/customer-support/open-tickets',
          },
          {
            title: 'Closed tickets',
            url: '/customer-support/closed-tickets',
          },
        ],
      },
      {
        title: 'Models',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Genesis',
            url: '#',
          },
          {
            title: 'Explorer',
            url: '#',
          },
          {
            title: 'Quantum',
            url: '#',
          },
        ],
      },
    ],
    navSecondary: [
      ...(isAdmin
        ? [
            {
              title: 'User Management',
              url: '/user-management',
              icon: User,
            },
            {
              title: 'Audit Log',
              url: '/audit-log',
              icon: FileCheck2,
            },
          ]
        : []),
      {
        title: 'Settings',
        url: '#',
        icon: IconSettings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-start items-end">
                <div className="bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col  items-center">
                  <span className="font-medium text-lg ">
                    CollabX
                    <span className="ms-2 text-[12px] border-2 px-2 rounded-sm ">
                      {session?.currentOrg?.role}
                    </span>
                  </span>
                  <span className="text-xs flex items-center ">
                    {/* A complete app */}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between overflow-hidden">
        <div>
          <NavSecondary items={data.nav} currentPath={pathname} />
          <NavMain items={data.navMain} currentPath={pathname} />
        </div>
        <div>
          <NavSecondary
            items={data.navSecondary}
            className="mt-auto"
            currentPath={pathname}
          />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

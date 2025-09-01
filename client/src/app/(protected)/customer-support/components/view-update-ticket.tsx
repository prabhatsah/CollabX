import { useIsMobile } from '@/hooks/use-mobile';
import z from 'zod';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { IconCircleDotFilled, IconTrendingUp } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ticket } from '@/types';
import { Lock } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';

export function ViewUpdateTicket({ item }: { item: Ticket }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild className="w-sm align-top">
        <Button variant="link" className="text-foreground px-0 justify-start">
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-w-6xl ">
        <div className="flex p-5">
          <div className="h-[90vh] border-r-2 flex flex-col flex-2 me-5 gap-3 pe-5">
            <div className="flex justify-between ">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Title</span>
                <label className="text-md">{item.title}</label>
              </div>
              <div className="">
                <div className="border p-2 rounded-md inline-flex items-center bg-red-400/10 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20 cursor-pointer">
                  <Lock size={16} />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Description</span>
              <label className="text-md border p-3 rounded-md mt-2">
                {item.description} Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quod, alias! Eveniet, iusto eum dolore,
                veritatis magnam ipsam praesentium molestias ipsa sapiente quod
                autem velit consequuntur doloribus vero nulla exercitationem ab.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod,
                alias! Eveniet, iusto eum dolore, veritatis magnam ipsam
                praesentium molestias ipsa sapiente quod autem velit
                consequuntur doloribus vero nulla exercitationem ab.
              </label>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <div>
                <label className="font-medium">Details</label>
                <Separator className="my-3" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-10 py-1 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20">
                      High
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-10 py-1 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20">
                      Open
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created On:</span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created By:</span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {item.createdByUserId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Updated On:
                    </span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Updated By:
                    </span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      Alisha Barik
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-10'>
                <label className="font-medium">Assignee Details</label>
                <Separator className="my-3" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-10 py-1 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20">
                      High
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="inline-flex items-center rounded-md bg-red-400/10 px-10 py-1 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20">
                      Open
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created On:</span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created By:</span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {item.createdByUserId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Updated On:
                    </span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Last Updated By:
                    </span>
                    <span className="inline-flex items-center py-1 text-sm font-medium">
                      Alisha Barik
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

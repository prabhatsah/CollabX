import { useIsMobile } from '@/hooks/use-mobile';
import z from 'zod';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ticket } from '@/types';
import { formatDate } from '@/lib/formatDate';
import TicketActivityDemo from './ticket-activity';
import { CommentSection } from './comment-section';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

export function ViewUpdateTicket({ item }: { item: Ticket }) {
  const isMobile = useIsMobile();
  const [priority, setPriority] = useState('');

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild className="w-sm align-top">
        <Button variant="link" className="text-foreground px-0 justify-start">
          {item.ticketNo}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-w-[70vw]">
        <div className="flex flex-row p-5 h-[90vh]">
          <div className="border-r-2 flex flex-col me-5 space-y-5 pe-5 basis-5/12">
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
            <div className="flex justify-between ">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Created By
                </span>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col mb-1">
                      <h3 className="font-medium text-white text-sm">
                        Alisha Barik
                      </h3>
                      <h3 className="font-medium text-white text-sm">
                        alisha.barik@gmail.com
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    Details
                  </label>
                  <Separator className="" />
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between ">
                      <span className="text-muted-foreground">Status:</span>
                      <div className="">
                        <Select
                          value={priority}
                          onValueChange={(value) => setPriority(value)}
                        >
                          <SelectTrigger id="Priority" className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In progress">
                              In progress
                            </SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority:</span>
                      <div className="">
                        <Select
                          value={priority}
                          onValueChange={(value) => setPriority(value)}
                        >
                          <SelectTrigger id="Priority" className="w-full">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HIGH">HIGH</SelectItem>
                            <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                            <SelectItem value="LOW">LOW</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* <span className="inline-flex items-center rounded-md bg-red-400/10 px-10 py-1 text-sm font-medium text-red-400 inset-ring inset-ring-red-400/20">
                        Open
                      </span> */}
                    </div>
                    <div className="flex justify-between ">
                      <span className="text-muted-foreground">Asignee:</span>
                      <div className="">
                        <Select
                          value={priority}
                          onValueChange={(value) => setPriority(value)}
                        >
                          <SelectTrigger id="Priority" className="w-full">
                            <SelectValue placeholder="Select Assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alisha Barik">
                              Alisha Barik
                            </SelectItem>
                            <SelectItem value="Prabhat Kumar">
                              Prabhat Kumar
                            </SelectItem>
                            <SelectItem value="Tikki Barik">
                              Tikki Barik
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created On:</span>
                      <span className="inline-flex items-center py-1 text-sm font-medium">
                        {formatDate(item.createdAt)}
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
            <div className="flex flex-col">
              <label className="text-md text-muted-foreground">
                Description
              </label>
              <Separator className="my-1" />
              <p className="text-md rounded-md  overflow-auto text-justify">
                {item.description} Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Quod, alias! Eveniet, iusto eum dolore,
                veritatis magnam ipsam praesentium molestias ipsa sapiente quod
                autem velit consequuntur doloribus vero nulla exercitationem ab.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="border-r-2 me-5 pe-5 basis-3/12">
            <div>
              <label className="font-medium">Activity</label>
              <Separator className="my-3" />
              <div className="flex flex-col gap-2">
                <TicketActivityDemo />
              </div>
            </div>
          </div>
          <div className="basis-5/12">
            <div>
              <label className="font-medium">Comments</label>
              <Separator className="my-3" />
              <div className="flex flex-col gap-2">
                <CommentSection />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

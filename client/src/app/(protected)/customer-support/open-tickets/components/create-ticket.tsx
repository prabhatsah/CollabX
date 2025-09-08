import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { Ticket } from '@/types';

export function CreateTicketForm({ onSuccess }: { onSuccess?: () => void }) {
  const isMobile = useIsMobile();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setTitle('');
    setPriority('');
    setDescription('');
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !priority || !type || !description) {
      toast.error('Missing fields', {
        description: 'Please enter all the fields',
      });
      return;
    }

    try {
      const res: Ticket = await apiFetch('/ticket/create', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ title, priority, type, description }),
      });
      toast.success('Ticket created', {
        description: `Ticket created: ${res.ticketNo}`,
      });

      // Close drawer
      setOpen(false);

      // call refresh, send from the parent
      onSuccess?.();

      resetForm();
    } catch (error) {
      console.log(error);

      toast.error('Ticket creation failed', {
        description: error?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Create Ticket
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-w-2xl ">
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create Ticket</DrawerTitle>
          <DrawerDescription>
            Fill all the required information
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-5">
          <Separator />
          <form
            className="flex flex-col justify-between h-screen "
            onSubmit={submitHandler}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="Priority">Priority</Label>
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
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="Type">Type</Label>
                  <Select
                    value={type}
                    onValueChange={(value) => setType(value)}
                  >
                    <SelectTrigger id="Type" className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INCIDENT">INCIDENT</SelectItem>
                      <SelectItem value="BUG">BUG</SelectItem>
                      <SelectItem value="FEATURE">FEATURE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <footer className="flex flex-col gap-2">
              <Button type="submit">Create</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => resetForm()}
              >
                Clear
              </Button>
              <DrawerClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DrawerClose>
            </footer>
          </form>
        </div>
        {/* <DrawerFooter>
          <Button type="submit">Create</Button>
          <Button variant="outline">Clear</Button>
          <DrawerClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}

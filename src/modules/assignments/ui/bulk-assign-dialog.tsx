// @module:assignments @layer:ui @owner:studio
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Send, CalendarIcon, Users, Building, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { getClasses } from '@/modules/classes/service/classes.service';
import { getUsers } from '@/modules/users/service/users.service';
import { Assignee } from '../service/assignments.types';
import { createBulkAssignments } from '../service/assignments.service';

type BulkAssignDialogProps = {
  materialId: string;
};

// >>> BEGIN gen:assignments.bulk-assign.ui (layer:ui)
export function BulkAssignDialog({ materialId }: BulkAssignDialogProps) {
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>([]);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableAssignees, setAvailableAssignees] = useState<Assignee[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const fetchAssignees = async () => {
        setIsLoading(true);
        try {
          const [usersPage, classesPage] = await Promise.all([getUsers(), getClasses()]);
          const users: Assignee[] = usersPage.items
            .filter(u => u.role !== 'admin') // Exclude admin from assignment
            .map(u => ({ id: u.id, name: u.name, type: 'user', details: u.email }));
          const classes: Assignee[] = classesPage.items
            .map(c => ({ id: c.id, name: c.name, type: 'class', details: c.description }));
          setAvailableAssignees([...users, ...classes]);
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Failed to fetch users and classes',
            description: error instanceof Error ? error.message : String(error),
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchAssignees();
    }
  }, [open, toast]);

  const onSelect = (assignee: Assignee) => {
    setSelectedAssignees(prev =>
      prev.some(a => a.id === assignee.id)
        ? prev.filter(a => a.id !== assignee.id)
        : [...prev, assignee]
    );
    setPopoverOpen(false);
  };

  const filteredAssignees = useMemo(() => {
      if (!searchQuery) return availableAssignees;
      return availableAssignees.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, availableAssignees])

  const handleSubmit = async () => {
    if (selectedAssignees.length === 0) {
      toast({ variant: 'destructive', title: 'No assignees selected' });
      return;
    }
    setIsSubmitting(true);
    try {
        await createBulkAssignments({
            materialId,
            assignees: selectedAssignees.map(a => ({ id: a.id, type: a.type })),
            deadline,
        });
        toast({ title: 'Successfully assigned material' });
        setOpen(false);
        setSelectedAssignees([]);
        setDeadline(undefined);
    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Failed to assign material',
            description: error instanceof Error ? error.message : String(error),
          });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Material</DialogTitle>
          <DialogDescription>
            Select students or classes to assign this material to.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className="w-full justify-between"
                  >
                    {selectedAssignees.length > 0 ? `${selectedAssignees.length} selected` : "Select students or classes..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[375px] p-0">
                  <Command>
                      <CommandInput placeholder="Search..." onValueChange={setSearchQuery} />
                      <CommandList>
                          <CommandEmpty>{isLoading ? "Loading..." : "No results found."}</CommandEmpty>
                          <CommandGroup>
                              {filteredAssignees.map((assignee) => (
                                  <CommandItem
                                      key={assignee.id}
                                      value={assignee.name}
                                      onSelect={() => onSelect(assignee)}
                                  >
                                      <Check
                                          className={cn(
                                              "mr-2 h-4 w-4",
                                              selectedAssignees.some(s => s.id === assignee.id) ? "opacity-100" : "opacity-0"
                                          )}
                                      />
                                      <div className="flex items-center">
                                        {assignee.type === 'user' ? <Users className="mr-2 h-4 w-4" /> : <Building className="mr-2 h-4 w-4" />}
                                        <div>
                                            {assignee.name}
                                            <div className="text-xs text-muted-foreground">{assignee.details}</div>
                                        </div>
                                      </div>
                                  </CommandItem>
                              ))}
                          </CommandGroup>
                      </CommandList>
                  </Command>
              </PopoverContent>
            </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !deadline && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, 'PPP') : <span>Pick a deadline (optional)</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign to {selectedAssignees.length}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// <<< END gen:assignments.bulk-assign.ui

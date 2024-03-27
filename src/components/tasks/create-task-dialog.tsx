'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useTransition } from 'react';
import { DialogProps } from '@radix-ui/react-alert-dialog';
import { editColumn } from '@/actions/columns.actions';
import { revalidatePath } from 'next/cache';
import { Column } from '@prisma/client';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string().optional(),
  column: z.string(),
});

interface CreateTaskDialogProps extends DialogProps {
  columnId: number | null;
  columns: Column[];
}

export default function CreateTaskDialog({
  columnId,
  columns,
  ...props
}: CreateTaskDialogProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      column: columnId?.toString() || columns[0].id.toString(),
      title: '',
      description: '',
    },
  });

  function onSubmit({ column, ...values }: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(() => {
      editColumn(parseInt(column), { tasks: { create: { ...values } } }).then(
        () => {
          props.onOpenChange && props.onOpenChange(false);
        }
      );
    });
  }
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>This action will create a task</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Type title for this task' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Describe the task here' {...field} />
                  </FormControl>
                  <FormDescription>
                    Task description is optional but suggested to fill.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='column'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Create in</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a column' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {columns.map((col) => (
                        <SelectItem key={col.id} value={col.id.toString()}>
                          {col.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Task will be created in column above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit'>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

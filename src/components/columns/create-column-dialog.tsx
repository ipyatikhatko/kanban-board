'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
} from '../ui/dialog';
import { useTransition } from 'react';
import { editBoard } from '@/actions/boards.actions';
import { DialogProps } from '@radix-ui/react-alert-dialog';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Column name must be at least 3 characters.',
  }),
  description: z.string().optional(),
});

interface CreateColumnDialogProps extends DialogProps {
  boardId: number;
}

export default function CreateColumnDialog({
  boardId,
  ...props
}: CreateColumnDialogProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    startTransition(() => {
      editBoard(
        boardId,
        { columns: { create: { ...values } } },
        { revalidatePath: `/boards/${boardId}` }
      ).then(() => {
        props.onOpenChange && props.onOpenChange(false);
      });
    });
  }
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create column</DialogTitle>
          <DialogDescription>
            This action will create a column for current board
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Type column name' {...field} />
                  </FormControl>
                  <FormDescription>Column display name.</FormDescription>
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
                    <Textarea placeholder='Optional description' {...field} />
                  </FormControl>
                  <FormDescription>
                    Column description (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit'>
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { RiDeleteBinFill, RiLoader5Fill } from 'react-icons/ri';
import { Button } from '../ui/button';
import { removeBoard } from '@/actions/boards.actions';
import { useTransition } from 'react';

interface Props {
  action: typeof removeBoard;
  boardId: number;
}

function DeleteBoardButton(props: Props) {
  const { action, boardId } = props;
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure?')) {
      startTransition(() => {
        action({ id: boardId });
      });
    }
  };

  return (
    <Button
      aria-disabled={isPending}
      disabled={isPending}
      onClick={handleDelete}
      size='icon'
      variant='destructive'
    >
      {isPending ? (
        <RiLoader5Fill className='animate-spin' />
      ) : (
        <RiDeleteBinFill />
      )}
    </Button>
  );
}

export default DeleteBoardButton;

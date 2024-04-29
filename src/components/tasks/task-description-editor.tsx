'use client';
import { ReactNode, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Button } from '../ui/button';
import { RiLoader5Fill, RiMarkdownLine, RiPencilFill } from 'react-icons/ri';
import Link from 'next/link';
import clsx from 'clsx';
import { josefin_sans, quicksand } from '@/lib/fonts';

interface Props {
  mdStr: string;
  editMode: boolean;
  loading?: boolean;
  renderSubmit?: (mdStr: string) => ReactNode;
  onEditModeChange: (value: boolean) => void;
  onUpdateDescription?: (mdStr: string) => void;
}

const TaskDescriptionEditor = (props: Props) => {
  const {
    mdStr,
    editMode = false,
    loading,
    renderSubmit,
    onEditModeChange,
    onUpdateDescription,
  } = props;
  const [markdown, setMarkdown] = useState(mdStr);

  const handleSave = () => {
    if (onUpdateDescription) {
      onUpdateDescription(markdown);
    } else {
      console.warn(
        'TaskDescriptionEditor: onUpdateDescription callback is not provided'
      );
    }
  };

  const handleCancelEdit = () => {
    setMarkdown(mdStr);
    onEditModeChange(false);
  };

  return (
    <div>
      <div
        onClick={() => onEditModeChange(true)}
        className={clsx('rounded-md border border-transparent', {
          'cursor-pointer hover:border-slate-200 dark:hover:border-slate-500':
            !editMode,
        })}
      >
        {editMode ? (
          <MarkdownEditor
            readOnly={loading}
            placeholder='Type description here'
            previewWidth='50%'
            value={markdown}
            minHeight='200px'
            onChange={(value, viewUpdate) => setMarkdown(value)}
          />
        ) : (
          <MarkdownPreview
            className={clsx(
              'min-h-[200px] rounded bg-white p-6 !text-slate-600 dark:bg-slate-600/50 dark:!text-slate-300',
              quicksand.className
            )}
            source={markdown || '*No description*'}
          />
        )}
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <Link
          href='https://www.markdownguide.org/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='ghost'>
            <RiMarkdownLine className='mr-2' size={20} />
            New to markdown?
          </Button>
        </Link>
        <div className='flex justify-end gap-2'>
          {!!renderSubmit ? (
            renderSubmit(mdStr)
          ) : !editMode ? (
            <Button onClick={() => onEditModeChange(true)}>
              <RiPencilFill />
              Edit
            </Button>
          ) : (
            <>
              <Button variant='secondary' onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
                {loading && (
                  <RiLoader5Fill size={20} className='animate-spin' />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskDescriptionEditor;

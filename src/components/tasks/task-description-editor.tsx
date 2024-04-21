'use client';
import { ReactNode, useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Button } from '../ui/button';
import { RiPencilFill } from 'react-icons/ri';

interface Props {
  mdStr: string;
  preview?: boolean;
  renderSubmit?: (mdStr: string) => ReactNode;
  onUpdateDescription?: (mdStr: string) => void;
}

const TaskDescriptionEditor = (props: Props) => {
  const { mdStr, preview = true, renderSubmit, onUpdateDescription } = props;
  const [editMode, setEditMode] = useState(!preview);
  const [markdown, setMarkdown] = useState(mdStr);

  const handleSave = () => {
    if (onUpdateDescription) {
      onUpdateDescription(mdStr);
    } else {
      console.warn(
        'TaskDescriptionEditor: onUpdateDescription callback is not provided'
      );
    }
  };

  return (
    <div>
      {editMode ? (
        <MarkdownEditor
          placeholder='Type description here'
          previewWidth='400px'
          value={markdown}
          minHeight='200px'
          onChange={(value, viewUpdate) => setMarkdown(value)}
        />
      ) : (
        <MarkdownPreview
          className='min-h-[200px] rounded p-6'
          source={markdown}
        />
      )}
      <div className='mt-4 flex items-center justify-end gap-2'>
        {!!renderSubmit ? (
          renderSubmit(mdStr)
        ) : !editMode ? (
          <Button onClick={() => setEditMode(true)}>
            <RiPencilFill />
            Edit
          </Button>
        ) : (
          <>
            <Button variant='secondary' onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </div>
  );
};
export default TaskDescriptionEditor;

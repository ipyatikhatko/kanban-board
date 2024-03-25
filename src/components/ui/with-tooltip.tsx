import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

const withTooltip = (
  trigger: ReactNode,
  content: ReactNode,
  options?: TooltipContentProps
) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent {...options}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default withTooltip;

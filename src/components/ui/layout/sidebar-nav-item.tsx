'use client';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import withTooltip from '../with-tooltip';
import { AnimatePresence, motion } from 'framer-motion';

const labelVariants = {
  open: {
    x: 0,
    opacity: 1,
  },
};

interface Props extends LinkProps {
  icon: IconType;
  label: string;
  active: boolean;
  collapsed?: boolean;
  mobile?: boolean;
}

function SidebarNavItem(props: Props) {
  const {
    icon: Icon,
    label,
    active,
    collapsed = false,
    mobile = false,
    ...linkProps
  } = props;

  const Item = () => (
    <Link
      className={clsx({
        'flex-1': mobile,
      })}
      {...linkProps}
    >
      <li
        className={clsx(
          'flex w-full cursor-pointer items-center justify-start gap-4 rounded-lg px-4 py-2 transition-all',
          'text-slate-300 opacity-50 hover:opacity-100 dark:text-white',
          {
            'bg-gradient-to-br from-blue-500 to-teal-500 text-white !opacity-100':
              active,
            'w-auto': collapsed,
            'flex-col !gap-2 !px-2': mobile,
          }
        )}
      >
        <Icon className='min-w-[31px]' size={mobile ? 30 : 25} />
        {!collapsed && (
          <motion.span
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -25, opacity: 0 }}
            className={clsx('font-medium capitalize transition-opacity', {
              'text-sm': mobile,
            })}
          >
            {label}
          </motion.span>
        )}
      </li>
    </Link>
  );

  if (collapsed)
    return withTooltip(<Item />, label, { align: 'end', side: 'right' });

  return (
    <AnimatePresence>
      <Item />
    </AnimatePresence>
  );
}

export default SidebarNavItem;

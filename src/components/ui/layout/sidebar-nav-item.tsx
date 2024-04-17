'use client';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';
import withTooltip from '../with-tooltip';

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
          'flex w-full cursor-pointer items-center justify-start gap-4 rounded-lg px-4 py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700',
          {
            'bg-slate-100 !text-slate-700': active,
            'justify-center !px-2': collapsed,
            'flex-col !gap-2 !px-2': mobile,
          }
        )}
      >
        <Icon className='min-w-[25px]' size={mobile ? 30 : 25} />
        <span
          className={clsx('font-medium capitalize transition-opacity', {
            hidden: !mobile && collapsed,
            'text-sm': mobile,
          })}
        >
          {label}
        </span>
      </li>
    </Link>
  );
  if (collapsed)
    return withTooltip(<Item />, label, { align: 'end', side: 'right' });
  return <Item />;
}

export default SidebarNavItem;

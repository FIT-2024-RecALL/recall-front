import React, { PropsWithChildren } from 'react';
import { Icon, IconType } from './Icon';
import clsx from 'clsx';

interface IconButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: IconType;
  loading?: boolean;
  variant?: keyof typeof variants | false;
}

const variants = {
  inline: `hover:bg-o-gray/50`,
  'bordered-trans': `text-black bg-transparent ring-2 ring-o-black hover:bg-o-gray/50`,
  'plate-green': `bg-o-green-sm text-o-black hover:bg-o-green-lg hover:shadow-md`,
  'plate-yellow': `bg-o-yellow-lg text-o-black hover:bg-o-yellow-sm hover:shadow-md`,
  'plate-blue': `bg-o-blue-sm text-o-black hover:bg-o-blue-lg hover:shadow-md`,
  'plate-red': `bg-o-red-md text-o-black hover:bg-o-red-sm hover:shadow-md`,
};
export const Button: React.FC<IconButtonProps> = ({
  variant,
  loading,
  icon,
  className,
  children,
  ...rest
}) => (
  <button
    type={'button'}
    className={clsx(
      variants[variant || 'inline'],
      'center rounded-md',
      'min-w-[16px] min-h-[16px] md:min-w-[32px] md:min-h-[32px]',
      'space-x-2 p-1 md:p-2 transition-all duration-200',
      className
    )}
    disabled={loading}
    {...rest}
  >
    {icon && !loading && (
      <Icon icon={icon} className={children ? 'mr-2' : ''} />
    )}
    {loading && (
      <Icon
        icon={'loader'}
        className={`${children ? 'mr-2' : ''} animate-spin`}
      />
    )}
    {children}
  </button>
);

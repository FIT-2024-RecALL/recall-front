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
  inline: `text-1-1 hover:bg-1-1/25`,
  plate: `bg-1-3 text-1-12 hover:bg-1-4 border-2 border-1-3 hover:border-1-4`,
  bordered: `bg-1-7 text-black border-2 border-1-1 hover:bg-1-5 disabled:bg-1-5/75`,
  'bordered-trans': `bg-transparent text-black border-2 border-1-1 hover:bg-1-1/25`,
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
      'space-x-2 p-1 md:p-2 transition-colors',
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

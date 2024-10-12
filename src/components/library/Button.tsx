import React, { PropsWithChildren } from 'react';
import { Icon, IconType } from './Icon';

interface IconButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: IconType;
  loading?: boolean;
  variant?: keyof typeof variants | false;
}

const variants = {
  inline: `bg-1-2 color-1-6 hover:bg-1-3`,
  plate: `bg-1-6 color-1-2 hover:bg-1-5`,
  bordered: `bg-1-1 color-1-6 border-2 br-1-6 hover:bg-1-6 hover:color-1-2`,
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
    className={
      `${
        variants[variant || 'inline']
      } center h-10 min-w-[40px] space-x-2 rounded-md p-2 transition-colors` +
      ' ' +
      className
    }
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

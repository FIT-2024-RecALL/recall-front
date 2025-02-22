import React, { PropsWithChildren } from 'react';
import { Icon, IconType } from './Icon';
import clsx from 'clsx';

interface IconButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: IconType;
  loading?: boolean;
  withShadow?: boolean;
  shadowBoxClassName?: string;
  variant?: Variants;
}

export type Variants =
  | 'inline'
  | 'bordered'
  | 'plate-green'
  | 'plate-yellow'
  | 'plate-blue'
  | 'plate-red';
const variants: Record<Variants, string> = {
  inline: `hover:bg-o-gray/50 hover:shadow-inner`,
  bordered: `text-black bg-o-white border-2 border-o-black hover:bg-o-gray/50 hover:shadow-inner`,
  'plate-green': `bg-o-green-sm text-o-black hover:bg-o-green-lg hover:shadow-inner hover:text-o-white`,
  'plate-yellow': `bg-o-yellow-lg text-o-black hover:bg-o-yellow-sm hover:shadow-inner`,
  'plate-blue': `bg-o-blue-sm text-o-black hover:bg-o-blue-lg hover:shadow-inner hover:text-o-white`,
  'plate-red': `bg-o-red-sm text-o-black hover:bg-o-red-md hover:shadow-inner hover:text-o-white`,
};
export const Button: React.FC<IconButtonProps> = ({
  variant,
  loading,
  icon,
  className,
  children,
  withShadow,
  shadowBoxClassName,
  ...rest
}) => {
  const button = (
    <button
      type={'button'}
      className={clsx(
        variants[variant || 'inline'],
        withShadow && 'relative',
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

  return withShadow ? (
    <div
      className={clsx(
        'relative transition-all duration-200',
        'before:absolute before:full before:bg-black/50 before:rounded',
        'before:transition-all before:duration-200',
        'hover:-translate-x-1 hover:-translate-y-1',
        'hover:before:translate-x-1 hover:before:translate-y-1',
        shadowBoxClassName
      )}
    >
      {button}
    </div>
  ) : (
    button
  );
};

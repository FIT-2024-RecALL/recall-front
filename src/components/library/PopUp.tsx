import { ComponentPropsWithRef } from "@react-spring/web";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface PopUpProps 
extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  toggle: () => void;
}

export const PopUp: React.FC<PopUpProps> = (
  { isShown, toggle, className, children },
  ...props
) => {
  return (
    <div
      className={clsx(isShown ? 'block fixed full bg-1-1' : 'hidden', className)}
      onClick={toggle}
      {...props}
    >
      {children}
    </div>
  );
};
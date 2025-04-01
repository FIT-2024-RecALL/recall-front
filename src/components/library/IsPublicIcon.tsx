import React from 'react';

import { Icon, IconProps } from './Icon';

export interface IsPublicIconProps extends Omit<IconProps, 'icon'> {
  isPublic?: boolean;
}

export const IsPublicIcon: React.FC<IsPublicIconProps> = ({
  isPublic,
  ...props
}) => <Icon icon={isPublic ? 'open' : 'lock'} {...props} />;

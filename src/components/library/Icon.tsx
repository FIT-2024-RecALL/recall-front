import {
  TbAlertTriangleFilled,
  TbArrowRight,
  TbAssembly,
  TbCalculator,
  TbCircuitCell,
  TbClock,
  TbCpu,
  TbDashboard,
  TbEdit,
  TbEyeFilled,
  TbFlame,
  TbLayoutDashboard,
  TbList,
  TbLoader,
  TbMoon,
  TbPlus,
  TbQuestionCircle,
  TbSend,
  TbSun,
  TbTrash,
  TbTriangleFilled,
  TbX,
  TbDownload,
  TbUpload,
} from 'react-icons/tb';
import {
  AiFillFileAdd,
  AiFillFilePdf,
  AiFillSave,
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import {
  BsListOl,
  BsListUl,
  BsBlockquoteLeft,
  BsCodeSlash,
  BsTypeBold,
  BsTypeItalic,
  BsLink,
} from 'react-icons/bs';
import { LuSigma } from 'react-icons/lu';
import React from 'react';
import { match } from 'ts-pattern';
import { IconBaseProps } from 'react-icons/lib/cjs/iconBase';

export const icons = [
  'arrowRight',
  'assembly',
  'trash',
  'warn',
  'circuit',
  'loader',
  'question',
  'eye',
  'editor',
  'projects',
  'dashboard',
  'fire',
  'mcu',
  'light',
  'send',
  'dark',
  'electricalComponent',
  'tasks',
  'close',
  'plus',
  'state',
  'play',
  'download',
  'upload',
  'add-file',
  'pdf',
  'save',
  'loading-1/4',
  'loading-3/4',
  'list-ol',
  'list-ul',
  'blockquote',
  'codeblock',
  'type-bold',
  'type-italic',
  'link',
  'sigma',
] as const;
export type IconType = (typeof icons)[number];

interface IconProps extends IconBaseProps {
  icon: IconType;
  color?: string;
  className?: string;
}
export const Icon: React.FC<IconProps> = ({
  icon,
  className = '',
  color,
  ...rest
}) => {
  const Component = match(icon)
    .with('arrowRight', () => TbArrowRight)
    .with('electricalComponent', () => TbCalculator)
    .with('tasks', () => TbClock)
    .with('assembly', () => TbAssembly)
    .with('projects', () => TbLayoutDashboard)
    .with('send', () => TbSend)
    .with('dashboard', () => TbDashboard)
    .with('editor', () => TbEdit)
    .with('warn', () => TbAlertTriangleFilled)
    .with('mcu', () => TbCpu)
    .with('circuit', () => TbCircuitCell)
    .with('state', () => TbList)
    .with('light', () => TbSun)
    .with('close', () => TbX)
    .with('play', () => TbTriangleFilled)
    .with('dark', () => TbMoon)
    .with('fire', () => TbFlame)
    .with('question', () => TbQuestionCircle)
    .with('eye', () => TbEyeFilled)
    .with('trash', () => TbTrash)
    .with('loader', () => TbLoader)
    .with('plus', () => TbPlus)
    .with('download', () => TbDownload)
    .with('upload', () => TbUpload)
    .with('add-file', () => AiFillFileAdd)
    .with('pdf', () => AiFillFilePdf)
    .with('save', () => AiFillSave)
    .with('loading-1/4', () => AiOutlineLoading)
    .with('loading-3/4', () => AiOutlineLoading3Quarters)
    .with('list-ol', () => BsListOl)
    .with('list-ul', () => BsListUl)
    .with('blockquote', () => BsBlockquoteLeft)
    .with('codeblock', () => BsCodeSlash)
    .with('type-bold', () => BsTypeBold)
    .with('type-italic', () => BsTypeItalic)
    .with('link', () => BsLink)
    .with('sigma', () => LuSigma)
    .exhaustive();

  const modifiers = match(icon)
    .with('play', () => 'rotate-90')
    .with('send', () => 'rotate-45')
    .otherwise(() => '');
  return (
    <Component
      className={className + ` ${modifiers}`}
      color={color}
      {...rest}
    />
  );
};

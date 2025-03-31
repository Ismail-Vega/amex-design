import { ComponentProps, ReactElement, ReactNode } from 'react';

export interface ModalProps extends Omit<ComponentProps<'div'>, 'content'> {
  open?: boolean;
  title?: string;
  trailingIcon?: ReactElement;
  content: ReactNode;
  actions?: ReactElement;
  onClose?: () => void;
}

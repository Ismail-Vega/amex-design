import { ReactNode } from 'react';

export interface ModalProps {
  open?: boolean;
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

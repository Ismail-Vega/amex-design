import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { ModalProps } from './ModalProps';

const Modal = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { open, title, children, onClose } = props;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return;
    }

    event.stopPropagation();

    if (onClose) {
      onClose();
    }
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!open) return;

    if (modalRef?.current) {
      modalRef.current.focus();
    }
  }, [open, modalRef]);

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      role="presentation"
      data-testid="mockId"
      className="fixed backdrop zIndex-modal flex align-center justify-center"
    >
      <div
        role="dialog"
        tabIndex={-1}
        ref={modalRef}
        className="fixed modal"
        onKeyDown={handleKeyDown}
        onClick={handleModalClick}
      >
        <div className="modal-header-wrapper">
          <h2 id="modal-title" className="modal-header">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex trailing-icon"
            aria-label="close"
          >
            {'×'}
          </button>
        </div>

        <div className="flex flex-col">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export { Modal };

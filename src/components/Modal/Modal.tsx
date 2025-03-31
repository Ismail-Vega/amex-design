import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { ModalProps } from './ModalProps';

const Modal = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { open, title, trailingIcon, content, actions, onClose, ...rest } =
    props;

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
        ref={modalRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        className="fixed modal"
        onKeyDown={handleKeyDown}
        onClick={handleModalClick}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...rest}
      >
        <div className="flex align-center justify-between">
          <h2 id="modal-title" className="modal-header">
            {title}
          </h2>
          {trailingIcon ?? (
            <button
              onClick={onClose}
              className="flex trailing-icon"
              aria-label="close"
            >
              {'×'}
            </button>
          )}
        </div>

        <div className="divider" />

        <div className="flex flex-col justify-between">
          <p id="modal-description">{content}</p>

          <div className="flex justify-end">{actions}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export { Modal };

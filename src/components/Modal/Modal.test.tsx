import '@testing-library/jest-dom';
import { describe, vi, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    mockClose.mockReset();
  });

  const renderWithUser = (cmp: React.ReactElement) => {
    return {
      user: userEvent.setup(),
      ...render(cmp),
    };
  };

  const TestModalComp = () => (
    <Modal
      open={true}
      onClose={mockClose}
      actions={
        <button type="button" onClick={mockClose}>
          I accept
        </button>
      }
      title="This is a heading title"
      content="This is a test description"
    />
  );

  test('renders modal with expected controls', () => {
    render(<TestModalComp />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  describe('when passed onClose handler', () => {
    test('calls onClose action when pressing the ESC key', () => {
      render(<TestModalComp />);
      fireEvent.keyDown(screen.getByRole('dialog'), {
        key: 'Escape',
        code: 'Escape',
      });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('renders dismissible button that calls onClose action when clicked', async () => {
      const { user } = renderWithUser(<TestModalComp />);
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose action when clicking outside of the modal', async () => {
      const { user } = renderWithUser(<TestModalComp />);
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});

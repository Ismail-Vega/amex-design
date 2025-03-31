<h1 align="center">Amex Design</h1>

This is a React component library starter project using:

- ⚡️ Vite + React + TypeScript
- ✅ Vitest + React Testing Library for unit tests
- 🔥 ESLint + Prettier for code quality

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Project Setup

### Tools & Libraries

- **Vite + TypeScript Template:** Chosen for its fast build times and built-in TypeScript support.
- **Prettier:** Added for consistent code formatting, ensuring all contributors follow the same coding style.

### Git Hooks & Automation

- **Husky:** Configured pre-commit hooks to automatically run scripts before a commit.
- **Lint-Staged:** Used alongside Husky to lint and format staged files before committing, preventing formatting and linting errors from being accidentally pushed to the repository.

## Future Improvements

### Modal Component Enhancements

To improve the Modal component, I would implement the following:

- More flexible API:

  ```typescript
  /**
     * The content of the modal.
     * This provides more control over what will be rendered inside the modal.
     * This depends on use cases. I would prefer to reduce what users can do if we have a defined design system that tells how a Modal should look like.
     * For a public component library this would be acceptable.
     * @example
     * <Modal><div>Custom Content</div></Modal>
     */
  children: React.ReactElement;

  /**
     * Whether focus trapping inside the modal should be disabled.
     * When `true`, focus can leave the modal while it is open.
     * @default false
     * @example
     * <Modal disableFocusTrap />
     */
  disableFocusTrap: boolean;

  /**
     * Callback fired when clicking outside the modal (on the backdrop).
     * Allows users to handle outside clicks.
     * @example
     * <Modal onClickOutside={() => console.log('Clicked outside')} />
     */
  onClickOutside?: () => void;

  /**
     * A ref to the modal element.
     * This allows direct access to the modal DOM node.
     * Available in React 19 and above.
     * @example
     * const modalRef = useRef<HTMLDivElement>(null);
     * <Modal ref={modalRef} />
     */
  ref?: React.RefObject<HTMLDivElement>;

  /**
     * When `true`, the modal will take up the full screen.
     * Can be used for mobile-friendly fullscreen modals.
     * @default false
     * @example
     * <Modal isFullModal />
     */
  isFullModal: boolean;
  ```

- Accessibility Improvements:

  1.  Ensure aria-labelledby and aria-describedby are customizable.
  2.  Implement focus trap using sibling elements:

  ```typescript
     const modalRef = useRef<HTMLDivElement>(null);
     const startFocusElRef = useRef<HTMLDivElement>(null);
     const endFocusElRef = useRef<HTMLDivElement>(null);

     const handleTrapFocus = (event: React.FocusEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if (modalRef?.current) {
           modalRef.current.focus();
        }
     };

     return ReactDOM.createPortal(
        <div role="presentation" className="fixed backdrop zIndex-modal flex align-center justify-center">
           <div ref={startFocusElRef} tabIndex={open ? 0 : -1} onFocus={handleTrapFocus} aria-hidden="true" />
           {/* Modal Element */}
           <div ref={endFocusElRef} tabIndex={open ? 0 : -1} onFocus={handleTrapFocus} aria-hidden="true" />
        </div>,
     document.body
     );
  ```

- Component Reusability:

  1.  Implement BaseButton and Button components for use inside the Modal.
  2.  Use classnames library for managing dynamic class names.
  3.  Add transition/animation support for modal open/close effects.

### Repository Enhancements

For a production-ready repository, I would implement:

1. Storybook Integration:

   - Document each component with interactive examples.

2. Dockerized Testing:

   - Ensure tests run in a consistent environment before pushing code.

3. Git Aliases:

   - Simplify commit messages and commands for faster workflow.

4. Formatting Guidelines:

   - Standardize code formatting to prevent unnecessary diffs.

5. Test Coverage Reports:

   - Use `@vitest/coverage-v8` to track test coverage and enforce minimum thresholds.

6. Component Research:

   - Investigate how existing component libraries implement Modals before designing ours.
   - Create a documented process to guide component creation.

7. Integration Testing:

   - Use Cypress or Puppeteer to test user flows and UI behavior.

8. Continuous Integration & Code Quality:

   - Automate testing and linting with CircleCI.
   - Use SonarQube for static code analysis to detect bugs and vulnerabilities.

9. Styling Strategy:
   - Evaluate between Tailwind CSS and CSS-in-JS (styled-components) based on project needs.

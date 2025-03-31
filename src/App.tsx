import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Modal } from './components';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModalClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const modalContent = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat
      elit in est interdum fermentum. Cras vehicula a urna sit amet auctor.
      Mauris tempor magna a imperdiet posuere. Quisque quis malesuada felis,
      sit amet commodo mi. Vestibulum finibus suscipit porta. Donec a enim
      ac eros pellentesque efficitur. In ut ex enim. Cras lacinia quam id
      urna dapibus, a consequat mauris posuere. Etiam sed erat quis lacus
      condimentum viverra scelerisque sit amet elit. Mauris eget nunc
      sagittis, dapibus risus pharetra, placerat neque. Maecenas tristique
      risus lorem.
    `;
  const modalActions = (
    <button onClick={handleClose} aria-label="accept">
      I Accept
    </button>
  );
  const modal = (
    <Modal
      open={showModal}
      onClose={handleClose}
      actions={modalActions}
      content={modalContent}
      title="This is a heading title"
    />
  );

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleOpenModalClick}>Open Modal</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {modal}
    </>
  );
}

export default App;

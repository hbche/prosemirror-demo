import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import prosemirrorLogo from './assets/prosemirror.svg';
import './App.css';
import EditorExample from './components/EditorExample';

function App() {
  return (
    <>
      <div className='header'>
        <div>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
          <a href='https://prosemirror.net/' target='_blank'>
            <img
              src={prosemirrorLogo}
              className='logo'
              alt='ProseMirror logo'
            />
          </a>
        </div>
      </div>
      <h1>Vite + React + ProseMirror</h1>
      <EditorExample />
    </>
  );
}

export default App;

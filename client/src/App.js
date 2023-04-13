import { useRoutes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import { routes } from './routes';

function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;

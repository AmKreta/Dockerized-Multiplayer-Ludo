//import Auth from './pages/auth.component';
import { useEffect } from 'react';
import Game from './pages/game.component';
import { fetchGameMapDetails } from './store/game.reducer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGameMapDetails());
  }, []);

  return (
    //<Auth />
    <Game />
  );
}

export default App;

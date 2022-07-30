import { useEffect, useState } from 'react';
import { fetchGameMapDetails } from './store/game.reducer';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Router from './router/router.component';
import { server } from './services/services';
import SocketContext from './socket/socket.context';

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(fetchGameMapDetails());
    setSocket(new io(server));
  }, []);

  useEffect(function () {
    if (socket) {
      socket.on('connected', (data) => console.log(data))
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      <Router />
    </SocketContext.Provider>
  );
}

export default App;

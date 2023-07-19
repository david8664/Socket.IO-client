import "./App.css";
import { socket } from './socket';


function App() {
  socket.on("connection",(socket)=> {
    console.log('Connection');
    socket.on("disconnect",()=> {
      console.log('disconnect');
    })
  })
  return <>
  
  <p>State: { '' + isConnected }</p>
  </>;
}

export default App;

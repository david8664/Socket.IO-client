import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [username, setUsername] = useState("username");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const onConnect = () => setIsConnected(true);
  const onDisconnect = () => setIsConnected(false);
  const onFooEvents = (value) =>
    setFooEvents((prevFooEvents) => [...prevFooEvents, value]);

  isConnected && socket.on("connect");
  // socket.on("disconnect", onDisconnect);
  // socket.on("fooEvents", onFooEvents);

  // socket.on("connection", (socket) => {
  //   console.log("Connection");
  //   socket.on("disconnect", () => {
  //     console.log("disconnect");
  //   });
  // });

  return (
    <>
      <input
        type="text"
        value={username}
        placeholder="your username"
        // onInput={(e) => setUsername(e.target.value)}
      />
      <button onClick={onConnect}>Enter</button>
      {/* <p>State: { '' + isConnected }</p> */}
    </>
  );
}

export default App;

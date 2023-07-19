import { useEffect, useState } from "react";
import mySocket from './socket'
import LoginForm from "./LoginForm";
function App() {
  const [username, setUsername] = useState("username");
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState("");
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  

  // const onEvents = (value) =>
  //   setEvents((prevEvents) => [...prevEvents, value]);
  const handleSubmit= (event)=> {
    event.preventDefault()
    mySocket.socket.emit ('uploadMessage',events)
  }

  mySocket.socket.on ('downloadMessage', (msg)=> {
setMessage(msg)

})
useEffect(() => {
  
  setMessages((prev)=> [...prev,message])
    
  
  }, [message])
  
  
  return (<>
 
    <h1>Chat Project</h1>

    <ul className="messages">
      {messages.map((msg,index)=> {
        return <li key={index}>{msg}</li>
      })}
    </ul>
    
      <input onChange={(e)=> setEvents(e.target.value)}  placeholder= "Enter Message" type="text" />
      <button onClick={handleSubmit}>Send</button>
  


     {!isConnected && <LoginForm setUsername = {setUsername} username = {username} setIsConnected = {setIsConnected} isConnected = {isConnected}/>}

    </>
  );
}

export default App;


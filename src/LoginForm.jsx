import React from 'react'
import mySocket from './socket'

function LoginForm({username,isConnected, setIsConnected,setUsername}) {

    const handleChange = (e)=> {
        
    setUsername(e.target.value)
      }
  return (
    <div><input
    name="username"
      type="text"
      value={username}
      placeholder="Username"
    onChange={handleChange}
    />
 
    <button onClick={()=> {mySocket.connect();
    mySocket.socket.on("start",(msg)=> {
      
      if (msg =="User Connected") setIsConnected(true)
      
      mySocket.socket.emit ('username',username)
     
    })
  }}>Connect :{isConnected? 'YAY CONNECTED' : 'OH NO NOT CONNECTED'}</button>
</div>
  )
}

export default LoginForm
import styles from "./style.module.css";
import socketManager from "../../Functions/socketManager";

function LoginForm({ username, setUsername, isConnected, setIsConnected }) {
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleConnect = () => {
    if (isConnected) {
      socketManager.disconnect();
      setIsConnected(false);
    } else {
      socketManager.connect();
      setIsConnected(true);
      socketManager.socket.emit("username", username);
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={handleChange}
      />
      <button onClick={handleConnect}>
        {!isConnected ? "Connect" : "Disconnect"}
      </button>
    </form>
  );
}

export default LoginForm;

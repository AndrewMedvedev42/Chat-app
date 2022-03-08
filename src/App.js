import Chat from "./Chat";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <section className="main_container">
    {!showChat ? (
      <section className="create_join_chat_form">
        <input
          type="text"
          placeholder="Your username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room name..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <input type="submit" onClick={joinRoom} value="Create / Join A Room"/>
      </section>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
  </section>
  );
}

export default App;

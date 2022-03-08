import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <section className="chat_page">
      <header className="chat_header">
        <p>Chat: {room}</p>
      </header>
      <section>
          {messageList.map((messageContent) => {
            return (
              <article
                className={username === messageContent.author ? "you" : "other"}>
                <article>
                    <p>{messageContent.message}</p>
                    <div>
                        <p className="time">{messageContent.time}</p>
                        <p className="author">{messageContent.author}</p>
                    </div>
                </article>
              </article>
            );
          })}
      </section>
      <section>
        <input
          type="text"
          value={currentMessage}
          placeholder="Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </section>
    </section>
  );
}

export default Chat;
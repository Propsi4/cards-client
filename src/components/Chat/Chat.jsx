import React, { useState, useEffect } from "react";
import { sendMessage } from "./scripts";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import styles from "./styles.min.css";
import {
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { getUsername } from "../../utils/utils";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [typingPeople, setTypingPeople] = useState([]);
  const [filteredTypingPeople, setFilteredTypingPeople] = useState([]);
  const token = localStorage.getItem("token");
  const username = useSelector((state) => state.username);
  const { roomID } = useParams();

  const typing = () => {
    // Emit the typing event to the server
      socket.emit("typing", roomID, token);
    };
  useEffect(() => {
    // Filter out the current user from the typing people list
      setFilteredTypingPeople(typingPeople.filter(item => item !== username));
    }, [typingPeople]);

  useEffect(() => {
    // Get typing people from the server
    socket.on("typing",(people) => {
      setTypingPeople([...people]);
    });
    // Get the messages from the server
    socket.on("update_messages", (messages) => setMessages([...messages]));
  }, []);


  return (
    <div className="chat_container">
      <ConversationHeader style={{ height: "8%" }}>
        <ConversationHeader.Content
          userName="CHAT"
          info={`Current Room ID:${roomID}`}/>
      </ConversationHeader>
      {/*{<TypingIndicator content="Helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo is typing"/>} */}
      <MessageList 
        style={{padding: "10px" }}
        typingIndicator={filteredTypingPeople.length ? (<TypingIndicator content={filteredTypingPeople.join(",") + " is typing..."}/>) : null} autoScrollToBottom={true}>
        {messages?.map((message, index) => (
          <div key={index}>
            <Message
              model={{
                message: message.text,
                sentTime: message.sentTime,
                position: "single",
                direction:
                message.sender === username ? "outgoing" : "incoming",
                payload: `<strong>${message.sender}</strong><br>${message.text}`,
              }}/>
            <p style={{
                textAlign: message.sender === username ? "right" : "left",
                marginBottom: "10px",
              }}>
              <small>{message.sentTime}</small>
            </p>
          </div>
        ))}
      </MessageList>
      <MessageInput
        onChange={() => {
          typing();
        }}
        attachButton={false}
        onSend={(innerHtml) => sendMessage(roomID, token, innerHtml)}
        placeholder="Type message here"
      />
    </div>
  )
};

export default Chat;

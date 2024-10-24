// components/ChatBox.js
import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'User' }]);
      setInput('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Hello! How can I assist you?', sender: 'Bot' },
        ]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && !showGreeting) {
      setShowGreeting(true);
    }
  };

  return (
    <div className="chat-box">
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? '−' : 'Chat to an expert'}
      </button>
      {isOpen && (
        <div className="chat-content">
          {showGreeting && (
            <div className="greeting-dialog">
              <p>You're talking to James, an expert librarian who is happy to assist.</p>
            </div>
          )}
          {showGreeting && (
            <button className="close-greeting" onClick={() => setShowGreeting(false)}>
              Close
            </button>
          )}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <img src="IMG_7629.jpg" alt="User Avatar" className="avatar" /> {/* Update the path to your image */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

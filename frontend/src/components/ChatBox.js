import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { FaVideo, FaPhoneSlash, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [gifType, setGifType] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "Hi pal, my name is Harry. I'm good thank you! Can I help you at all? haha lol xx",
    "Why did the librarian get kicked off the plane? Because it was overbooked! xx",
    "I love books more than people, but don't take it personally. xx",
    "You must be a book because you've got fine print. xx",
    "I'm here to help, but I can't guarantee I'll be nice about it! xx",
    // Add more responses as needed...
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'User' }]);
      setInput('');

      setIsTyping(true);
      setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: randomResponse, sender: 'Bot' },
        ]);
        setIsTyping(false);
      }, 4000);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && !showGreeting) {
      setShowGreeting(true);
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponses[0], sender: 'Bot' },
        ]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const startVideoCall = () => {
    setShowPopup(true);
    setGifType('first');

    setTimeout(() => {
      setGifType('second');
    }, 5000); // Duration for the first GIF

    setMessages((prev) => [
      ...prev,
      { text: 'Call connecting...', sender: 'Bot' },
    ]);
  };

  const hangUpCall = () => {
    setShowPopup(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-box">
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? 'Close chat' : 'Chat to an expert'}
      </button>
      {isOpen && (
        <div className="chat-content">
          {showGreeting && (
            <div className="greeting-dialog">
              <img src="IMG_3358.jpeg" alt="User Avatar" className="greeting-avatar" />
              <p>You're talking to Harry, an expert librarian. He is happy to assist.</p>
            </div>
          )}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <img src="meme-typing.gif" alt="Typing..." className="typing-gif" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
            <button type="button" className="video-call-button" onClick={startVideoCall}>
              <FaVideo />
            </button>
          </form>
          {/* Popup for GIFs */}
          {showPopup && (
            <div className="popup">
              {gifType === 'first' ? (
                <>
                  <p>Call connecting...</p> {/* Message above the first GIF */}
                  <img src="spinner.gif" alt="Loading..." className="popup-gif" />
                </>
              ) : (
                <>
                  <img src="clipfly-ai-20241025152827.gif" alt="Connecting..." className="popup-gif" />
                  <img src="make him talk (1).gif" alt="Overlay" className="overlay-image" />
                  <div className="call-controls">
                    <button onClick={hangUpCall}>
                      <FaPhoneSlash /> End Call
                    </button>
                    <button onClick={toggleMute}>
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />} {isMuted ? 'Mute' : 'Unmute'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;

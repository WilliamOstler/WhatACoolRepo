import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null); // Ref for scrolling
  const botResponses = [
    "Hi pal, my name is Harry. I'm good thank you! Can I help you at all? haha lol xx",
    "Why did the librarian get kicked off the plane? Because it was overbooked! xx",
    "I love books more than people, but don't take it personally. xx",
    "You must be a book because you've got fine print. xx",
    "I'm here to help, but I can't guarantee I'll be nice about it! xx",
    "If you were a library book, I'd never return you. xx",
    "Can I borrow a kiss? I promise I’ll give it back. xx",
    "I'm not saying I'm the best, but have you seen my book collection? xx",
    "Are you a reference book? Because I can’t stop consulting you. xx",
    "I’d tell you a joke about an elevator, but it’s an uplifting experience. xx",
    "You know, if I were a book, I'd be your favorite one. xx",
    "I love helping people, especially when they bring me coffee. xx",
    "Why don't scientists trust atoms? Because they make up everything! xx",
    "If I had a dollar for every time I fell in love with a book, I’d be rich. xx",
    "You’re so booksmart, it’s almost intimidating! xx",
    "I might be a librarian, but I’m no good at keeping secrets. Especially when it comes to love. xx",
    "You can’t judge a book by its cover, but you can definitely judge me by my bad jokes. xx",
    "Love is like a library card; it’s free, but you have to keep it up to date. xx",
    "I’d rather be reading, but talking to you is a close second. xx",
    // Flirty responses...
    "Do you believe in love at first sight, or should I walk by again? xx",
    "Are you a magician? Because whenever I look at you, everyone else disappears. xx",
    "If you were a vegetable, you’d be a cute-cumber! xx",
    "Is your name Google? Because you have everything I’m searching for. xx",
    "I must be a snowflake because I've fallen for you. xx",
    "Do you have a map? I keep getting lost in your eyes. xx",
    "If kisses were snowflakes, I’d send you a blizzard. xx",
    "I was blinded by your beauty... I’m going to need your name and number for insurance purposes. xx",
    "If you were a fruit, you’d be a fine-apple. xx",
    "Is it hot in here, or is it just you? xx",
    "I must be a library book, because you just checked me out. xx",
    "You’re like a fine wine; the more I drink, the better I feel. xx",
    "Excuse me, but I think you dropped something: my jaw! xx",
    "Your hand looks heavy—can I hold it for you? xx",
    "Are you a campfire? Because you’re hot and I want s’more. xx",
    "If beauty were a crime, you’d be serving a life sentence. xx",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you. xx",
    "Is your name Wi-Fi? Because I'm feeling a connection. xx",
    "Can I follow you home? Cause my parents always told me to follow my dreams. xx",
    "You must be tired, because you've been running through my mind all day. xx",
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
    if (!isOpen) {
      if (!showGreeting) {
        setShowGreeting(true);
        setIsTyping(true); // Start typing animation
        
        // Simulate typing delay before sending the greeting
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponses[0], sender: 'Bot' }, // Add the greeting message
          ]);
          setIsTyping(false); // Stop typing animation
        }, 2000); // Adjust delay as needed
      }
    }
  };

  // Scroll to the bottom whenever messages change
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
            {/* Reference point for scrolling */}
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
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
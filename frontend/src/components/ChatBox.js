// components/ChatBox.js
import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const botResponses = [
    // Existing responses...
    "Hi, my name is Harry. Can I help? haha",
    "Why did the librarian get kicked off the plane? Because it was overbooked!",
    "I love books more than people, but don't take it personally.",
    "You must be a book because you've got fine print.",
    "I'm here to help, but I can't guarantee I'll be nice about it!",
    "If you were a library book, I'd never return you.",
    "Can I borrow a kiss? I promise I’ll give it back.",
    "I'm not saying I'm the best, but have you seen my book collection?",
    "Are you a reference book? Because I can’t stop consulting you.",
    "I’d tell you a joke about an elevator, but it’s an uplifting experience.",
    "You know, if I were a book, I'd be your favorite one.",
    "I love helping people, especially when they bring me coffee.",
    "Why don't scientists trust atoms? Because they make up everything!",
    "If I had a dollar for every time I fell in love with a book, I’d be rich.",
    "You’re so booksmart, it’s almost intimidating!",
    "I might be a librarian, but I’m no good at keeping secrets. Especially when it comes to love.",
    "You can’t judge a book by its cover, but you can definitely judge me by my bad jokes.",
    "Love is like a library card; it’s free, but you have to keep it up to date.",
    "I’d rather be reading, but talking to you is a close second.",
    "Books are my passion, but you’re starting to become my obsession!",
    
    // Flirty responses...
    "Do you believe in love at first sight, or should I walk by again?",
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "If you were a vegetable, you’d be a cute-cumber!",
    "Is your name Google? Because you have everything I’m searching for.",
    "I must be a snowflake because I've fallen for you.",
    "Do you have a map? I keep getting lost in your eyes.",
    "If kisses were snowflakes, I’d send you a blizzard.",
    "I was blinded by your beauty... I’m going to need your name and number for insurance purposes.",
    "If you were a fruit, you’d be a fine-apple.",
    "Is it hot in here, or is it just you?",
    "I must be a library book, because you just checked me out.",
    "You’re like a fine wine; the more I drink, the better I feel.",
    "Excuse me, but I think you dropped something: my jaw!",
    "Your hand looks heavy—can I hold it for you?",
    "Are you a campfire? Because you’re hot and I want s’more.",
    "If beauty were a crime, you’d be serving a life sentence.",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    "Is your name Wi-Fi? Because I'm feeling a connection.",
    "Can I follow you home? Cause my parents always told me to follow my dreams.",
    "You must be tired, because you've been running through my mind all day.",

    // Inspirational quotes...
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "The best way to predict the future is to create it. – Peter Drucker",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Dream big and dare to fail. – Norman Vaughan",
    "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
    "Act as if what you do makes a difference. It does. – William James",
    "If you want to lift yourself up, lift up someone else. – Booker T. Washington",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
    "Perseverance is not a long race; it is many short races one after the other. – Walter Elliot",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "Everything you’ve ever wanted is on the other side of fear. – George Addair"
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'User' }]);
      setInput('');
      setTimeout(() => {
        // Randomly select a bot response
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: randomResponse, sender: 'Bot' },
        ]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      if (!showGreeting) {
        setShowGreeting(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponses[0], sender: 'Bot' }, // Greeting message
        ]);
      }
    }
  };

  return (
    <div className="chat-box">
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? 'Close chat' : 'Chat to an expert'}
      </button>
      {isOpen && (
        <div className="chat-content">
          {showGreeting && (
            <div className="greeting-dialog">
              <img src="IMG_3358.jpeg" alt="User Avatar" className="greeting-avatar" /> {/* Ensure this path is correct */}
              <p>You're talking to Harry, an expert librarian. He is happy to assist.</p>
            </div>
          )}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                {msg.text}
              </div>
            ))}
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

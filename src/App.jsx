import React, { useState } from 'react';
import SonicImage from './Sonic_135.webp'; 
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'Sonic', message: 'Hello, I am Sonic the Hedgehog. Ask me anything', className: 'chat-text-s' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const addMessageToChat = (sender, message, className) => {
    setMessages(prevMessages => [...prevMessages, { sender, message, className }]);
  };

  const displayThinkingMessage = () => {
    addMessageToChat('Sonic', 'Sonic is thinking...', 'chat-text-s');
  };

  const replaceThinkingMessage = (newMessage) => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      const thinkingIndex = updatedMessages.findIndex(msg => msg.message === 'Sonic is thinking...');
      if (thinkingIndex !== -1) {
        updatedMessages[thinkingIndex] = { sender: 'Sonic', message: newMessage, className: 'chat-text-s' };
      }
      return updatedMessages;
    });
  };

  const answer = async (question) => {
    displayThinkingMessage();

    const response = await fetch('http://localhost:3000/getChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();
    replaceThinkingMessage(data.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    addMessageToChat('You', inputMessage, 'chat-text-u');
    setInputMessage('');
    await answer(inputMessage);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-4">
            <div className="picture">
              <img src={SonicImage} alt="Sonic" />
            </div>
          </div>
          <div className="col-8">
            <div className="chat-box" id="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={msg.className}>
                  <strong>{msg.sender}: </strong> {msg.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4"></div>
          <div className="col-8">
            <p></p>
            <form id="chat-form" className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="chat-message"
                className="form-control"
                placeholder="Type your message here ..."
                autoComplete="off"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

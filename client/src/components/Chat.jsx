import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = ({ token, onLogout }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/generate',
        { prompt: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botReply = { role: 'bot', text: res.data.response || 'No response received.' };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
      alert('Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <header>
        <div class="navbar">
            <div className="nav-logo">
            <a href="https://www.dooper.in/"><img class="logo" src="Logo.png" alt="" /></a>
            </div>
            <div className="heading"><h2>Dooper Chatbot</h2></div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
            <div className="chat-container">

      <div className="chat-box">
        {messages.length === 0 && <p className="placeholder">Start chatting with your AI assistant 🤖</p>}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            <strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong> {msg.text}
          </div>
        ))}
        {loading && <p className="loading">Generating response...</p>}
      </div>

      <form className="chat-form" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="chat-input"
          disabled={loading}
        />
        <button type="submit" className="send-btn" disabled={loading}>
          Send
        </button>
      </form>
    </div>
      </main>
    </div>
  );
};

export default Chat;

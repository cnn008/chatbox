import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/chat.css';

const MessageList = ({ messages }) => {
  const listRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const wasNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;

    if ((messages.length > prevMessagesLength.current && wasNearBottom) || autoScroll) {
      listRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }

    prevMessagesLength.current = messages.length;
  }, [messages, autoScroll]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setAutoScroll(scrollHeight - (scrollTop + clientHeight) < 50);
  };

  return (
    <div 
      ref={listRef}
      className="message-list-container"
      onScroll={handleScroll}
    >
      {messages.map((msg) => (
        <div 
          key={msg.id}
          className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
        >
          <div className="message-header">
            <span className="sender-name">{msg.sender}</span>
            <span className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="message-content">{msg.text}</div>
        </div>
      ))}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageList;
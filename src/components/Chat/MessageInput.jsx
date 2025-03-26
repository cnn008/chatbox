import { useState } from 'react'
import PropTypes from 'prop-types'
import '../../styles/chat.css'

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        aria-label="Message input"
        className="message-input-field"
      />
      <button 
        type="submit" 
        className="send-button"
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <span className="send-icon">✉️</span>
      </button>
    </form>
  )
}

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired
}

export default MessageInput
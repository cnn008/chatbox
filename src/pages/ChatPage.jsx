import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { loadConversations, saveConversations } from '../services/chatStorage'
import BotList from '../components/Chat/BotList'
import MessageList from '../components/Chat/MessageList'
import MessageInput from '../components/Chat/MessageInput'
import LoginButton from '../components/Auth/LoginButton'
import ProfileButton from '../components/Auth/ProfileButton'
import '../styles/chat.css'

export default function ChatPage() {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [conversations, setConversations] = useState(null)
  const [activeBot, setActiveBot] = useState('Tom')

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      const loaded = loadConversations(user.sub)
      setConversations(loaded || {
        Tom: [],
        Jerry: [],
        Spike: []
      })
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    if (isAuthenticated && user?.sub && conversations) {
      saveConversations(user.sub, conversations)
    }
  }, [conversations, isAuthenticated, user])

  const handleSendMessage = (text) => {
    if (!text.trim()) return

    const newMessage = {
      text,
      sender: 'You',
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    }

    setConversations(prev => ({
      ...prev,
      [activeBot]: [...prev[activeBot], newMessage]
    }))

    setTimeout(() => {
      const botResponse = {
        text: `Hello from ${activeBot}!`,
        sender: activeBot,
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID()
      }

      setConversations(prev => ({
        ...prev,
        [activeBot]: [...prev[activeBot], botResponse]
      }))
    }, 800)
  }

  if (isLoading) return <div className="loading">Loading...</div>

  return (
    <div className="chat-container">
      <header>
        <h1>ChatBot App</h1>
        {isAuthenticated ? <ProfileButton user={user} /> : <LoginButton />}
      </header>

      <div className="chat-layout">
        <BotList 
          bots={['Tom', 'Jerry', 'Spike']}
          activeBot={activeBot}
          onSelect={setActiveBot}
        />
        
        <div className="chat-area">
          {conversations && (
            <>
              <MessageList messages={conversations[activeBot]} />
              <MessageInput onSend={handleSendMessage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
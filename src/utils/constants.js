// Bot Configuration
export const BOTS = {
    Tom: {
      displayName: "Tom",
      emoji: "🐱",
      defaultMessages: ["Hi", "Hello"],
      typingSpeed: 1000 
    },
    Jerry: {
      displayName: "Jerry",
      emoji: "🐭",
      defaultMessages: ["Hi", "Hello"],
      typingSpeed: 1000
    },
    Spike: {
      displayName: "Spike",
      emoji: "🐶",
      defaultMessages: ["Hi", "Hello"],
      typingSpeed: 1000
    }
  };
  
  // LocalStorage Keys
  export const STORAGE_KEYS = {
    CHATS: 'chatbot_conversations_v3',
    AUTH: 'auth0_user'
  };
  
  // Default Bot Responses
  export const getBotResponse = (botName, userMessage) => {
    const bot = BOTS[botName];
    const responses = [
      `Interesting you said: "${userMessage}"`,
      `${bot.emoji} ${bot.defaultMessages[Math.floor(Math.random() * bot.defaultMessages.length)]}`,
      "Could you tell me more?",
      "I'm still learning!",
      `This is ${bot.displayName} responding...`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  export const validateMessage = (text) => {
    return text.trim().length > 0 && text.length < 500;
  };
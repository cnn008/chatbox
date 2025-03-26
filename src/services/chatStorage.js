const CHAT_STORAGE_KEY = 'chatbot_conversations_v3';

export const saveConversations = (userId, conversations) => {
  try {
    const existing = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || {};
    const updated = {
      ...existing,
      [userId]: conversations
    };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to save conversations:', error);
    return false;
  }
};

export const loadConversations = (userId) => {
  try {
    const data = localStorage.getItem(CHAT_STORAGE_KEY);
    const allConversations = data ? JSON.parse(data) : {};
    return allConversations[userId] || {
      Tom: [],
      Jerry: [],
      Spike: []
    };
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return {
      Tom: [],
      Jerry: [],
      Spike: []
    };
  }
};

export const cleanupOldChats = (maxAgeDays = 30) => {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - maxAgeDays);

    const allData = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || {};
    
    Object.keys(allData).forEach(userId => {
      Object.keys(allData[userId]).forEach(botName => {
        allData[userId][botName] = allData[userId][botName].filter(msg => {
          return new Date(msg.timestamp) > cutoff;
        });
      });
    });
    
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    console.error('Chat cleanup failed:', error);
  }
};

export const migrateChatStorage = () => {
  const legacyKey = 'chatbot_conversations';
  const legacyData = localStorage.getItem(legacyKey);
  
  if (legacyData) {
    localStorage.setItem(CHAT_STORAGE_KEY, legacyData);
    localStorage.removeItem(legacyKey);
  }
};

export const initChatStorage = () => {
  migrateChatStorage();
  cleanupOldChats();
  
  setInterval(cleanupOldChats, 24 * 60 * 60 * 1000);
};
import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import WelcomeMessage from './WelcomeMessage';
import './ChatInterface.css';

const ChatInterface = ({ userType }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulation d'une réponse IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(message, userType),
        timestamp: new Date(),
        references: [
          "Article 1382 du Code civil ivoirien",
          "Loi n° 2016-555 sur le bail d'habitation"
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message, userType) => {
    if (message.toLowerCase().includes('clôture') || message.toLowerCase().includes('voisin')) {
      return `En tant que ${userType}, voici ma réponse : Selon l'Article 1382 du Code civil ivoirien, "Tout fait quelconque de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer". Vous êtes donc responsable des dommages causés à la clôture de votre voisin, sauf si vous pouvez prouver une cause extérieure. Je vous recommande de proposer un arrangement amiable ou d'envoyer une lettre recommandée.`;
    }
    return `Merci pour votre question. En tant qu'assistant juridique spécialisé en droit ivoirien, je vais analyser votre situation et vous fournir une réponse détaillée avec les références légales appropriées.`;
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Assistant Juridique KUE</h2>
        <span className="user-badge">{userType}</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <WelcomeMessage 
            userType={userType} 
            onSuggestionClick={handleSendMessage}
          />
        ) : (
          <MessageList 
            messages={messages} 
            isLoading={isLoading}
          />
        )}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};
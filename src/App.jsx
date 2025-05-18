// App.jsx - Version modernisée pour KUE
import React, { useState, useRef, useEffect } from 'react';
import './components/kue.css';
import logoKue from './assets/LOGO-kueSBGS.png';

// Composants d'icônes SVG intégrés optimisés
const UserIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="#E3F2FD"/>
    <path d="M40 40C45.5228 40 50 35.5228 50 30C50 24.4772 45.5228 20 40 20C34.4772 20 30 24.4772 30 30C30 35.5228 34.4772 40 40 40Z" fill="#4361EE"/>
    <path d="M60 60C60 49.05 51.05 40 40 40C28.95 40 20 49.05 20 60" stroke="#4361EE" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const KueIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="#E0E8FF"/>
    <rect x="22" y="22" width="36" height="36" rx="8" fill="#4361EE"/>
    <path d="M28 32H52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 40H48" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 48H44" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour, je suis KUE, votre assistant juridique intelligent. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('particulier'); // 'particulier' ou 'professionnel'
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const switchButtonRef = useRef(null);
  
  // Exemples de questions pour chaque type d'utilisateur
  const exampleQuestions = {
    particulier: [
      "J'ai endommagé la clôture de mon voisin, dois-je payer ?",
      "Mon employeur refuse de payer mes congés, que faire ?",
      "Quels sont mes droits comme locataire si ma douche est en panne ?"
    ],
    professionnel: [
      "Analyse d'un cas de litige locatif pour fuite non réparée",
      "Recherche de jurisprudence sur le droit des contrats OHADA",
      "Synthèse des textes sur la responsabilité civile"
    ]
  };

  // Simuler une réponse de l'IA
  const simulateResponse = (userMessage) => {
    setLoading(true);
    
    // Exemples de réponses selon le type d'utilisateur
    const responses = {
      particulier: {
        default: "D'après l'analyse de votre situation, vous êtes dans le cadre d'une responsabilité civile. Selon l'Article 1382 du Code civil ivoirien : \"Tout fait quelconque de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer.\"\n\nEn termes simples, vous êtes responsable des dommages que vous causez et devez les réparer. Je vous conseille de proposer un arrangement amiable dans un premier temps. Souhaitez-vous que je vous aide à rédiger une lettre d'arrangement ?",
        
        conges: "Votre employeur est dans l'illégalité. Selon l'Article 31 du Code du travail ivoirien : \"Tout salarié a droit à un congé payé à la charge de l'employeur.\"\n\nVous pouvez :\n1. Adresser une lettre de mise en demeure à votre employeur\n2. Saisir l'inspection du travail\n3. Porter l'affaire devant le tribunal du travail\n\nJe peux vous aider à rédiger une lettre de mise en demeure si vous le souhaitez.",
        
        locataire: "En tant que locataire, vous êtes protégé par la Loi n° 2016-555 sur le bail d'habitation. L'Article 6 stipule clairement que \"Le bailleur est tenu d'assurer les réparations nécessaires au maintien en état du logement\".\n\nUne douche en panne relève des réparations obligatoires à la charge du propriétaire. Vous devriez :\n1. Notifier par écrit le problème à votre propriétaire\n2. Lui accorder un délai raisonnable (15 jours)\n3. En cas d'inaction, vous pouvez saisir le tribunal"
      },
      professionnel: {
        default: "ANALYSE JURIDIQUE - LITIGE LOCATIF\n\nType de droit : Droit immobilier - Bail d'habitation\n\nTextes applicables :\n• Article 6, Loi n° 2016-555 : \"Le bailleur est tenu d'assurer les réparations nécessaires au maintien en état du logement\"\n• Article 12, Loi n° 2016-555 : \"Le locataire peut, après mise en demeure restée infructueuse, exécuter ou faire exécuter les réparations urgentes\"\n\nJurisprudence pertinente :\n• Arrêt n°123/2020, Cour d'appel d'Abidjan : \"Le propriétaire qui néglige délibérément de réparer une fuite d'eau peut être contraint de verser des dommages-intérêts représentant 20% du loyer pour trouble de jouissance\"\n\nDémarche conseillée :\n1. Mise en demeure formelle\n2. Procédure d'injonction de faire\n3. Action en réparation avec demande de dommages-intérêts\n\nSouhaitez-vous une synthèse complète au format PDF ?",
        
        ohada: "RECHERCHE JURISPRUDENTIELLE - DROIT DES CONTRATS OHADA\n\nTextes fondamentaux :\n• Articles 1.1 à 1.6 de l'Acte uniforme OHADA relatif au droit des contrats commerciaux\n\nJurisprudence récente :\n• CCJA, 3e ch., arrêt n°043/2021 du 25/02/2021 : Précise les conditions de validité des clauses limitatives de responsabilité\n• CCJA, plén., arrêt n°103/2022 du 28/04/2022 : Établit le principe d'interprétation stricte des clauses résolutoires\n\nTendances jurisprudentielles :\n1. Renforcement de l'obligation de bonne foi dans l'exécution (Art. 1.7)\n2. Interprétation extensive de la notion d'imprévision (Art. 6.23)\n\nSouhaitez-vous approfondir un aspect particulier de cette recherche ?",
        
        responsabilite: "SYNTHÈSE - RESPONSABILITÉ CIVILE EN DROIT IVOIRIEN\n\nFondements légaux :\n• Art. 1382 Code civil : Principe général de responsabilité pour faute\n• Art. 1383 Code civil : Responsabilité pour négligence ou imprudence\n• Art. 1384 Code civil : Responsabilité du fait des choses\n\nConditions classiques :\n1. Faute (comportement illicite)\n2. Préjudice (matériel, moral ou corporel)\n3. Lien de causalité (prouvé par le demandeur)\n\nÉvolutions jurisprudentielles notables :\n• Arrêt CS, Ch. Civ., 15/05/2023 : Élargissement de la notion de préjudice moral\n• Arrêt CA Abidjan, 28/09/2022 : Présomption de causalité renforcée\n\nPour générer une synthèse complète avec tableaux comparatifs, veuillez préciser les aspects que vous souhaitez approfondir."
      }
    };
    
    let responseText = "";
    
    // Sélection de la réponse en fonction du message de l'utilisateur
    if (userType === 'particulier') {
      if (userMessage.toLowerCase().includes("congé")) {
        responseText = responses.particulier.conges;
      } else if (userMessage.toLowerCase().includes("locataire") || userMessage.toLowerCase().includes("douche")) {
        responseText = responses.particulier.locataire;
      } else {
        responseText = responses.particulier.default;
      }
    } else {
      if (userMessage.toLowerCase().includes("litige locatif") || userMessage.toLowerCase().includes("fuite")) {
        responseText = responses.professionnel.default;
      } else if (userMessage.toLowerCase().includes("ohada") || userMessage.toLowerCase().includes("contrats")) {
        responseText = responses.professionnel.ohada;
      } else {
        responseText = responses.professionnel.responsabilite;
      }
    }
    
    // Simuler un délai de réponse réaliste
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: responseText
      }]);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, {
      role: "user",
      content: inputMessage
    }]);
    
    // Simuler la réponse
    simulateResponse(inputMessage);
    
    // Réinitialiser le champ de saisie
    setInputMessage('');
  };

  const handleExampleClick = (question) => {
    setInputMessage(question);
    // Focus sur le textarea après avoir cliqué sur un exemple
    textareaRef.current.focus();
  };

  // Changer le type d'utilisateur
  const toggleUserType = (type) => {
    if (type !== userType) {
      setUserType(type);
      
      // Mise à jour visuelle du bouton actif
      const switchContainer = switchButtonRef.current;
      if (switchContainer) {
        const switchIndicator = document.createElement('div');
        switchIndicator.className = 'switch-indicator';
        switchContainer.appendChild(switchIndicator);
        
        // Ajouter une animation selon le type sélectionné
        if (type === 'professionnel') {
          switchIndicator.style.animation = 'slideRight 0.3s forwards';
        } else {
          switchIndicator.style.animation = 'slideLeft 0.3s forwards';
        }
        
        // Nettoyer l'élément après l'animation
        setTimeout(() => {
          switchContainer.removeChild(switchIndicator);
        }, 300);
      }
    }
  };

  // Ajuster automatiquement la hauteur du textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
    }
  };

  // Scroll automatique vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ajuster la hauteur du textarea quand le contenu change
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <img src={logoKue} alt="logo-kue" />
        </div>
        <div className="user-type-switch" ref={switchButtonRef}>
          <button 
            className={userType === 'particulier' ? 'active' : ''} 
            onClick={() => toggleUserType('particulier')}
          >
            Particulier
          </button>
          <button 
            className={userType === 'professionnel' ? 'active' : ''} 
            onClick={() => toggleUserType('professionnel')}
          >
            Professionnel
          </button>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="message-avatar">
                {message.role === 'user' ? <UserIcon /> : <KueIcon />}
              </div>
              <div className="message-content">
                <div className="message-header">
                  {message.role === 'user' ? 'Vous' : 'KUE'}
                </div>
                <div className="message-text">
                  {message.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant-message">
              <div className="message-avatar">
                <KueIcon />
              </div>
              <div className="message-content">
                <div className="message-header">
                  KUE
                </div>
                <div className="loading-indicator">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="examples-container">
          <h3>Questions suggérées</h3>
          <div className="examples-list">
            {exampleQuestions[userType].map((question, index) => (
              <button 
                key={index} 
                className="example-button"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="input-form" onSubmit={handleSubmit}>
          <div className="textarea-container">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Posez votre question juridique..."
              rows="1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button 
              type="submit" 
              className="send-button" 
              disabled={loading || inputMessage.trim() === ''}
              aria-label="Envoyer"
            >
              <SendIcon />
            </button>
          </div>
          <div className="input-info">
            Appuyez sur Entrée pour envoyer, Maj+Entrée pour un saut de ligne
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
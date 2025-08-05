/**
 * Advanced Live Chat Widget with Chatbot Integration
 * Features: Live chat, chatbot responses, business hours, lead qualification
 */

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.isOnline = this.checkBusinessHours();
        this.messages = [];
        this.leadData = {};
        this.chatbotActive = !this.isOnline;
        this.typingTimeout = null;
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.bindEvents();
        this.loadChatHistory();
        
        // Add initial bot message if offline
        if (this.chatbotActive) {
            setTimeout(() => {
                this.addBotMessage("Hi! I'm the Queen City assistant. Our team is currently offline, but I can help answer questions about our services. What can I help you with?");
            }, 1000);
        }
    }
    
    createWidget() {
        const widgetHTML = `
            <div id="chat-widget" class="chat-widget">
                <div id="chat-toggle" class="chat-toggle">
                    <div class="chat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="chat-close" style="display: none;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="online-indicator ${this.isOnline ? 'online' : 'offline'}"></div>
                    <div class="notification-badge" style="display: none;">1</div>
                </div>
                
                <div id="chat-window" class="chat-window">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <h4>Queen City Surface Coatings</h4>
                            <p class="chat-status">${this.isOnline ? 'We\'re online!' : 'Leave a message'}</p>
                        </div>
                        <div class="chat-header-actions">
                            <button id="minimize-chat" class="chat-action-btn" title="Minimize">−</button>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>
                    
                    <div class="chat-typing" id="chat-typing" style="display: none;">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span class="typing-text">Agent is typing...</span>
                    </div>
                    
                    <div class="chat-input-container">
                        <div class="quick-replies" id="quick-replies">
                            <!-- Quick reply buttons will be inserted here -->
                        </div>
                        <div class="chat-input-wrapper">
                            <input type="text" id="chat-input" placeholder="Type your message..." autocomplete="off">
                            <button id="send-button" class="send-button">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-footer">
                        <small>Powered by Queen City Surface Coatings</small>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        this.addStyles();
    }
    
    addStyles() {
        const styles = `
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            .chat-toggle {
                position: relative;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                box-shadow: 0 4px 20px rgba(44, 85, 48, 0.3);
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }
            
            .chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(44, 85, 48, 0.4);
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 4px 20px rgba(44, 85, 48, 0.3), 0 0 0 0 rgba(44, 85, 48, 0.7);
                }
                70% {
                    box-shadow: 0 4px 20px rgba(44, 85, 48, 0.3), 0 0 0 10px rgba(44, 85, 48, 0);
                }
                100% {
                    box-shadow: 0 4px 20px rgba(44, 85, 48, 0.3), 0 0 0 0 rgba(44, 85, 48, 0);
                }
            }
            
            .online-indicator {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
            }
            
            .online-indicator.online {
                background: #28a745;
            }
            
            .online-indicator.offline {
                background: #dc3545;
            }
            
            .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #dc3545;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: slideUp 0.3s ease-out;
            }
            
            .chat-window.open {
                display: flex;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .chat-header {
                background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
                color: white;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .chat-header h4 {
                margin: 0 0 0.25rem 0;
                font-size: 1rem;
                font-weight: 600;
            }
            
            .chat-status {
                margin: 0;
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .chat-action-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .chat-action-btn:hover {
                opacity: 1;
            }
            
            .chat-messages {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .chat-message {
                margin-bottom: 1rem;
                max-width: 80%;
                animation: messageSlide 0.3s ease-out;
            }
            
            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .chat-message.user {
                margin-left: auto;
            }
            
            .chat-message.bot,
            .chat-message.agent {
                margin-right: auto;
            }
            
            .message-content {
                padding: 0.75rem 1rem;
                border-radius: 18px;
                font-size: 0.9rem;
                line-height: 1.4;
                word-wrap: break-word;
            }
            
            .chat-message.user .message-content {
                background: #2c5530;
                color: white;
            }
            
            .chat-message.bot .message-content,
            .chat-message.agent .message-content {
                background: white;
                color: #333;
                border: 1px solid #e9ecef;
            }
            
            .message-time {
                font-size: 0.7rem;
                color: #6c757d;
                margin-top: 0.25rem;
                text-align: right;
            }
            
            .chat-message.bot .message-time,
            .chat-message.agent .message-time {
                text-align: left;
            }
            
            .chat-typing {
                padding: 1rem;
                background: #f8f9fa;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .typing-indicator {
                display: flex;
                gap: 0.2rem;
            }
            
            .typing-indicator span {
                width: 6px;
                height: 6px;
                background: #6c757d;
                border-radius: 50%;
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }
            
            .typing-text {
                font-size: 0.8rem;
                color: #6c757d;
            }
            
            .quick-replies {
                padding: 0.5rem 1rem 0;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .quick-reply-btn {
                background: #e9ecef;
                border: 1px solid #dee2e6;
                border-radius: 15px;
                padding: 0.4rem 0.8rem;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .quick-reply-btn:hover {
                background: #2c5530;
                color: white;
            }
            
            .chat-input-container {
                border-top: 1px solid #e9ecef;
                background: white;
            }
            
            .chat-input-wrapper {
                display: flex;
                align-items: center;
                padding: 1rem;
                gap: 0.5rem;
            }
            
            .chat-input-wrapper input {
                flex: 1;
                border: 1px solid #dee2e6;
                border-radius: 20px;
                padding: 0.5rem 1rem;
                outline: none;
                font-size: 0.9rem;
            }
            
            .chat-input-wrapper input:focus {
                border-color: #2c5530;
            }
            
            .send-button {
                background: #2c5530;
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }
            
            .send-button:hover {
                background: #1a3d1f;
            }
            
            .send-button:disabled {
                background: #6c757d;
                cursor: not-allowed;
            }
            
            .chat-footer {
                padding: 0.5rem 1rem;
                text-align: center;
                background: #f8f9fa;
                border-top: 1px solid #e9ecef;
            }
            
            .chat-footer small {
                color: #6c757d;
                font-size: 0.7rem;
            }
            
            @media (max-width: 480px) {
                .chat-window {
                    width: 100vw;
                    height: 100vh;
                    bottom: 0;
                    right: 0;
                    border-radius: 0;
                }
                
                .chat-widget {
                    bottom: 10px;
                    right: 10px;
                }
                
                .chat-toggle {
                    width: 50px;
                    height: 50px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    bindEvents() {
        const toggle = document.getElementById('chat-toggle');
        const minimizeBtn = document.getElementById('minimize-chat');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        
        toggle.addEventListener('click', () => this.toggleChat());
        minimizeBtn.addEventListener('click', () => this.closeChat());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        chatInput.addEventListener('input', () => {
            if (this.isOnline) {
                this.showTypingIndicator();
            }
        });
        
        sendButton.addEventListener('click', () => this.sendMessage());
        
        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-btn')) {
                this.sendMessage(e.target.textContent);
                this.clearQuickReplies();
            }
        });
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatIcon = document.querySelector('.chat-icon');
        const chatClose = document.querySelector('.chat-close');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
        
        this.isOpen = !this.isOpen;
        
        chatIcon.style.display = this.isOpen ? 'none' : 'block';
        chatClose.style.display = this.isOpen ? 'block' : 'none';
        chatWindow.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            notificationBadge.style.display = 'none';
            document.getElementById('chat-input').focus();
        }
    }
    
    openChat() {
        // Track chat opening
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chat_opened', {
                'event_category': 'engagement',
                'event_label': this.isOnline ? 'live_chat' : 'chatbot'
            });
        }
        
        this.showQuickReplies([
            'Get a quote',
            'Service areas',
            'Pricing info',
            'Schedule consultation'
        ]);
    }
    
    closeChat() {
        this.isOpen = false;
        document.getElementById('chat-window').classList.remove('open');
        document.querySelector('.chat-icon').style.display = 'block';
        document.querySelector('.chat-close').style.display = 'none';
    }
    
    sendMessage(text = null) {
        const input = document.getElementById('chat-input');
        const message = text || input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        // Handle response
        if (this.isOnline) {
            this.handleLiveChat(message);
        } else {
            this.handleChatbotResponse(message);
        }
        
        // Track message sent
        if (typeof gtag !== 'undefined') {
            gtag('event', 'message_sent', {
                'event_category': 'chat',
                'event_label': this.isOnline ? 'live_agent' : 'chatbot'
            });
        }
    }
    
    addUserMessage(message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.addMessage(message, 'user', timestamp);
    }
    
    addBotMessage(message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.addMessage(message, 'bot', timestamp);
    }
    
    addAgentMessage(message, agentName = 'Support Agent') {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.addMessage(`${agentName}: ${message}`, 'agent', timestamp);
    }
    
    addMessage(content, type, timestamp) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        
        messageElement.innerHTML = `
            <div class="message-content">${this.formatMessage(content)}</div>
            <div class="message-time">${timestamp}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ content, type, timestamp });
    }
    
    formatMessage(content) {
        // Handle basic formatting and links
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/https?:\/\/[^\s]+/g, '<a href="$&" target="_blank">$&</a>');
    }
    
    handleChatbotResponse(message) {
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const response = this.getChatbotResponse(message.toLowerCase());
            this.addBotMessage(response.message);
            
            if (response.quickReplies) {
                this.showQuickReplies(response.quickReplies);
            }
            
            if (response.collectLead) {
                this.startLeadCapture();
            }
        }, 1500 + Math.random() * 1000);
    }
    
    getChatbotResponse(message) {
        // Intent recognition and responses
        const responses = {
            greeting: {
                triggers: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
                message: "Hello! Welcome to Queen City Surface Coatings. I'm here to help you with information about our epoxy flooring services. How can I assist you today?",
                quickReplies: ['Get a quote', 'Service areas', 'View our work', 'Pricing info']
            },
            
            quote: {
                triggers: ['quote', 'estimate', 'price', 'cost', 'how much'],
                message: "I'd be happy to help you get a quote! Our pricing varies based on project size, surface condition, and finish type. Would you like to use our quick calculator or have one of our experts provide a detailed estimate?",
                quickReplies: ['Quick calculator', 'Detailed estimate', 'Call me back'],
                collectLead: true
            },
            
            services: {
                triggers: ['services', 'what do you do', 'epoxy', 'flooring', 'garage'],
                message: "We specialize in professional epoxy floor coatings for:\n\n• Garage floors\n• Basements\n• Commercial spaces\n• Warehouses\n• Patios and more\n\nWe offer various finishes including decorative flakes, metallic, and high-gloss options. Which type of project interests you?",
                quickReplies: ['Garage floor', 'Commercial space', 'See examples', 'All services']
            },
            
            areas: {
                triggers: ['service area', 'location', 'where', 'cincinnati', 'ohio'],
                message: "We serve the greater Cincinnati area including:\n\n• Hamilton County\n• Butler County\n• Warren County\n• Clermont County\n• Northern Kentucky\n\nWe also travel for larger commercial projects. What's your project location?",
                quickReplies: ['Cincinnati', 'Northern KY', 'Other location', 'Get quote']
            },
            
            timeline: {
                triggers: ['how long', 'timeline', 'schedule', 'when'],
                message: "Most residential projects take 1-2 days:\n• Day 1: Surface prep and base coat\n• Day 2: Topcoat and finishing\n\nCommercial projects vary by size. We can usually start within 1-2 weeks. When would you like to schedule your free consultation?",
                quickReplies: ['This week', 'Next week', 'Flexible', 'Call me']
            },
            
            process: {
                triggers: ['process', 'how it works', 'steps', 'procedure'],
                message: "Our proven process ensures lasting results:\n\n1. **Free consultation** and detailed estimate\n2. **Surface preparation** - the key to durability\n3. **Primer application** for strong adhesion\n4. **Base coat** with your chosen color\n5. **Decorative elements** (if selected)\n6. **Protective topcoat** for durability\n\nWould you like to schedule your free consultation?",
                quickReplies: ['Schedule consultation', 'See examples', 'Get quote', 'More info']
            }
        };
        
        // Find matching intent
        for (const [intent, data] of Object.entries(responses)) {
            if (data.triggers.some(trigger => message.includes(trigger))) {
                return data;
            }
        }
        
        // Default response
        return {
            message: "I'd be happy to help! For specific questions about pricing, scheduling, or our services, I can connect you with one of our flooring specialists. What would you like to know more about?",
            quickReplies: ['Talk to specialist', 'Get quote', 'See our work', 'Service areas']
        };
    }
    
    handleLiveChat(message) {
        this.showTypingIndicator();
        
        // Simulate live agent response (in real implementation, this would connect to live chat service)
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addAgentMessage("Thanks for your message! One of our flooring experts will respond shortly. In the meantime, feel free to browse our portfolio or use our quote calculator.", "Sarah");
            
            this.showQuickReplies(['View portfolio', 'Quick calculator', 'Call instead']);
        }, 2000 + Math.random() * 3000);
    }
    
    showTypingIndicator() {
        document.getElementById('chat-typing').style.display = 'flex';
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Clear any existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Auto-hide after 10 seconds
        this.typingTimeout = setTimeout(() => {
            this.hideTypingIndicator();
        }, 10000);
    }
    
    hideTypingIndicator() {
        document.getElementById('chat-typing').style.display = 'none';
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
    }
    
    showQuickReplies(replies) {
        const container = document.getElementById('quick-replies');
        container.innerHTML = replies.map(reply => 
            `<button class="quick-reply-btn">${reply}</button>`
        ).join('');
    }
    
    clearQuickReplies() {
        document.getElementById('quick-replies').innerHTML = '';
    }
    
    startLeadCapture() {
        setTimeout(() => {
            this.addBotMessage("To provide you with an accurate quote, I'll need a few details. What type of space are you looking to coat?");
            this.showQuickReplies(['Garage', 'Basement', 'Commercial', 'Other']);
        }, 1000);
    }
    
    checkBusinessHours() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        
        // Monday-Friday 8am-6pm, Saturday 9am-4pm
        const isWeekday = day >= 1 && day <= 5;
        const isSaturday = day === 6;
        
        if (isWeekday && hour >= 8 && hour < 18) {
            return true;
        } else if (isSaturday && hour >= 9 && hour < 16) {
            return true;
        }
        
        return false;
    }
    
    loadChatHistory() {
        const history = localStorage.getItem('chat-history');
        if (history) {
            this.messages = JSON.parse(history);
            this.messages.forEach(msg => {
                this.addMessage(msg.content, msg.type, msg.timestamp);
            });
        }
    }
    
    saveChatHistory() {
        localStorage.setItem('chat-history', JSON.stringify(this.messages));
    }
    
    // Public API methods
    showNotification() {
        if (!this.isOpen) {
            document.querySelector('.notification-badge').style.display = 'flex';
        }
    }
    
    addSystemMessage(message) {
        this.addBotMessage(message);
        this.showNotification();
    }
    
    updateOnlineStatus(isOnline) {
        this.isOnline = isOnline;
        const indicator = document.querySelector('.online-indicator');
        const statusText = document.querySelector('.chat-status');
        
        indicator.className = `online-indicator ${isOnline ? 'online' : 'offline'}`;
        statusText.textContent = isOnline ? "We're online!" : "Leave a message";
        
        this.chatbotActive = !isOnline;
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatWidget = new ChatWidget();
    
    // Example: Show notification after 30 seconds if chat hasn't been opened
    setTimeout(() => {
        if (!window.chatWidget.isOpen) {
            window.chatWidget.showNotification();
            window.chatWidget.addSystemMessage("👋 Hi there! Have questions about epoxy flooring? I'm here to help!");
        }
    }, 30000);
});

// Expose global functions for integration
window.ChatWidget = ChatWidget;
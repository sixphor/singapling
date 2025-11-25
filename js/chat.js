// Shared Chat System for SingaPling
class ChatManager {
    constructor() {
        this.chatHistory = this.loadChatHistory();
        this.isLoading = false;
        this.initializeChat();
    }

    // Load chat history from localStorage
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('singapling_chat_history');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading chat history:', error);
            return [];
        }
    }

    // Save chat history to localStorage
    saveChatHistory() {
        try {
            localStorage.setItem('singapling_chat_history', JSON.stringify(this.chatHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    // Save chat window state
    saveChatState() {
        try {
            const chatWindow = document.getElementById('chatWindow');
            const isOpen = chatWindow && chatWindow.style.display !== 'none';
            localStorage.setItem('singapling_chat_open', JSON.stringify(isOpen));
        } catch (error) {
            console.error('Error saving chat state:', error);
        }
    }

    // Restore chat window state
    restoreChatState() {
        try {
            const savedState = localStorage.getItem('singapling_chat_open');
            const isOpen = savedState ? JSON.parse(savedState) : false;
            const chatWindow = document.getElementById('chatWindow');
            if (chatWindow && isOpen) {
                chatWindow.style.display = 'block';
                const userInput = document.getElementById('userInput');
                if (userInput) userInput.focus();
            }
        } catch (error) {
            console.error('Error restoring chat state:', error);
        }
    }

    // Initialize chat interface
    initializeChat() {
        // Create chat container if it doesn't exist
        let chatContainer = document.getElementById('chatContainer');
        if (!chatContainer) {
            chatContainer = document.createElement('div');
            chatContainer.id = 'chatContainer';
            chatContainer.innerHTML = `
                <div id="chatToggle">
                    <img src="images/botlah.png" alt="BotLah" class="chat-icon" style="width:28px;height:28px;border-radius:50%;box-shadow:inset 0 1px 2px rgba(0,0,0,0.15), inset 0 -1px 2px rgba(255,255,255,0.1);object-fit:cover;">
                    <span class="chat-text">Chat Now</span>
                </div>
                <div id="chatWindow" style="display: none;">
                    <div id="chatHeader">
                        <span>BotLah Assistant</span>
                        <div class="header-buttons">
                            <button id="chatClear" title="Clear Chat">🗑️</button>
                            <button id="chatClose">×</button>
                        </div>
                    </div>
                    <div id="chatMessages"></div>
                    <div id="chatInput">
                        <input type="text" id="userInput" placeholder="Ask about our plans, pricing, or services...">
                        <button id="sendBtn">Send</button>
                    </div>
                </div>
            `;
            document.body.appendChild(chatContainer);
        }

        // Restore chat window state
        this.restoreChatState();

        // Load existing messages
        this.displayChatHistory();

        // Bind events
        this.bindEvents();
    }

    // Display all chat history
    displayChatHistory() {
        const messagesDiv = document.getElementById('chatMessages');
        messagesDiv.innerHTML = '';

        this.chatHistory.forEach(message => {
            this.displayMessage(message.text, message.isUser, false);
        });

        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Bind event listeners
    bindEvents() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatClear = document.getElementById('chatClear');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const chatMessages = document.getElementById('chatMessages');

        // Prevent scroll events from bubbling to the main page
        chatWindow.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: false });

        chatMessages.addEventListener('wheel', (e) => {
            e.stopPropagation();
        }, { passive: false });

        chatMessages.addEventListener('scroll', (e) => {
            e.stopPropagation();
        }, { passive: false });

        // Toggle chat window
        chatToggle.addEventListener('click', () => {
            const isVisible = chatWindow.style.display !== 'none';
            chatWindow.style.display = isVisible ? 'none' : 'block';
            this.saveChatState();
            if (!isVisible) {
                userInput.focus();
            }
        });

        // Close chat
        chatClose.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            this.saveChatState();
        });

        // Clear chat
        chatClear.addEventListener('click', () => {
            if (confirm('Clear all chat history?')) {
                this.clearChat();
            }
        });

        // Send message on button click
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isLoading) {
                this.sendMessage();
            }
        });
    }

    // Send a message
    async sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        
        if (!message || this.isLoading) return;

        // Clear input and disable
        userInput.value = '';
        this.isLoading = true;
        this.updateSendButton();

        // Display user message
        this.addMessage(message, true);

        try {
            // Show typing indicator
            this.showTypingIndicator();

            // Send to n8n webhook
            const response = await fetch('https://n8ngc.codeblazar.org/webhook/03e221f1-3171-4cf9-8dde-097a2af6a969', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: message }),
            });

            this.hideTypingIndicator();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const botResponse = await response.text();
            
            // Display bot response
            this.addMessage(botResponse, false);

        } catch (error) {
            this.hideTypingIndicator();
            console.error('Error:', error);
            this.addMessage('Sorry, there was a problem contacting BotLah. Please try again later.', false);
        } finally {
            this.isLoading = false;
            this.updateSendButton();
            userInput.focus();
        }
    }

    // Add message to history and display
    addMessage(text, isUser) {
        const message = { text, isUser, timestamp: Date.now() };
        this.chatHistory.push(message);
        this.saveChatHistory();
        this.displayMessage(text, isUser, true);
    }

    // Display a single message
    displayMessage(text, isUser, animate = false) {
        const messagesDiv = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        if (animate) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
        }

        messageDiv.innerHTML = `<div class="message-content">${text.trim().replace(/\n/g, '<br>')}</div><div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;

        messagesDiv.appendChild(messageDiv);

        if (animate) {
            // Animate in
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 10);
        }

        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Show typing indicator
    showTypingIndicator() {
        const messagesDiv = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `<div class="message-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Hide typing indicator
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Update send button state
    updateSendButton() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        if (this.isLoading) {
            sendBtn.textContent = '...';
            sendBtn.disabled = true;
            userInput.disabled = true;
        } else {
            sendBtn.textContent = 'Send';
            sendBtn.disabled = false;
            userInput.disabled = false;
        }
    }

    // Clear all chat history
    clearChat() {
        this.chatHistory = [];
        this.saveChatHistory();
        document.getElementById('chatMessages').innerHTML = '';
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
});
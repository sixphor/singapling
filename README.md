<!--
README for Singapling Website
-->
# Singapling

A modern, Gen Z-focused static website for Singapore's newest (fake) telco. Built for GitHub Pages with **n8n workflow automation** and **AI-powered chatbot**.

## Pages
- **Home**: Welcome, brand, and AI chatbot
- **FAQ**: Frequently asked questions with chatbot support
- **Pricing**: Mobile, broadband, bundles, and roaming plans

## Features
- Modern, bold, and playful design targeting Gen Z
- **AI chatbot powered by n8n workflows with OpenAI integration**
- **Persistent chat across all pages** with localStorage
- **Custom purple & green branding** with circular logo design
- **BotLah AI assistant** with context-aware responses
- Responsive and mobile-friendly design
- **Automated customer service workflows**
- **Real-time typing indicators** and smooth animations

## AI Chatbot Features
- **Cross-page persistence** - Chat history maintained across navigation
- **Real-time responses** via webhook integration
- **Typing indicators** with animated dots
- **Smart scrolling** with custom styled scrollbars
- **Knowledge base integration** with plan details and retention offers
- **Context-aware responses** using OpenAI GPT and Pinecone vector database

## n8n Integration

This project includes comprehensive n8n workflow automation:

### 🤖 Chatbot Workflows
- **Intelligent question processing** with keyword-based routing
- **Built-in knowledge base** with plan details and offers
- **Markdown response formatting** for rich chat experiences

### 🎫 Customer Service Automation
- **Automatic ticket classification** and routing
- **Retention offer generation** based on customer profile
- **Escalation workflows** for complex issues

### 📊 Data Processing
- **Automated CSV data sync** from repository
- **Plan analysis and reporting**
- **Change detection and notifications**

## Quick Start

### 1. Deploy Website
```bash
git clone https://github.com/codeblazar/singapling.git
cd singapling
# Deploy to GitHub Pages or your preferred hosting
```

### 2. Setup n8n
```bash
npm install -g n8n
n8n start
```

### 3. Import Workflows
1. Open n8n at http://localhost:5678
2. Import workflows from `n8n-workflows/` directory:
   - `singapling-chatbot.json` - Main chatbot
   - `customer-service-automation.json` - Customer service
   - `data-processing-pipeline.json` - Data sync

### 4. Configure Webhooks
Update the `N8N_WEBHOOK_URL` in HTML files:
- Development: `http://localhost:5678/webhook/chatbot`
- Production: `https://your-n8n-instance.com/webhook/chatbot`

## Configuration Files

- **`N8N_SETUP.md`** - Detailed setup instructions
- **`n8n-workflows/`** - Ready-to-import workflow templates
- **`documents/`** - CSV data files for knowledge base
- **`css/chat.css`** - Chat interface styling with custom purple theme
- **`js/chat.js`** - Shared chat manager with persistence and animations
- **`images/logo.jpg`** - Circular company logo with inset button effect
- **`images/botlah.png`** - AI assistant avatar icon

## Recent Updates (v2.0)
- ✅ **Complete chat system overhaul** with shared ChatManager class
- ✅ **Custom purple & green branding** replacing default red theme
- ✅ **Circular logo design** with subtle inset button effects
- ✅ **Enhanced chat UI** with proper spacing and no text indentation
- ✅ **Custom scrollbars** with dark theme and white thumb
- ✅ **BotLah icon integration** in chat toggle button
- ✅ **Production webhook** integration with n8n cloud instance
- ✅ **Optimized typing indicators** for compact display
- ✅ **Cross-page chat persistence** using localStorage

## How to deploy on GitHub Pages
1. Push this repo to GitHub
2. In repo settings, set GitHub Pages source to `main` branch (root or `/docs`)
3. Access your site at `https://<your-username>.github.io/<repo-name>/`
4. Setup n8n instance for chatbot functionality

## Customization
- Edit HTML files for content updates
- Update `style.css` for branding changes
- Modify n8n workflows for custom business logic
- Update CSV files in `documents/` for knowledge base changes

---
© 2025 Singapling. Not a real telco.

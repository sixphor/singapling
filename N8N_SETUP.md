# n8n Configuration for Singapling

## Setup Instructions

### 1. Install n8n
```bash
npm install -g n8n
# or
npx n8n
```

### 2. Start n8n
```bash
n8n start
```
n8n will be available at: http://localhost:5678

### 3. Import Workflow
1. Open n8n at http://localhost:5678
2. Click "Import from file" 
3. Select `n8n-workflows/singapling-chatbot.json`
4. Activate the workflow

### 4. Configure Webhook URL
Update the `N8N_WEBHOOK_URL` in your HTML files:
- **Development**: `http://localhost:5678/webhook/chatbot`
- **Production**: `https://your-n8n-instance.com/webhook/chatbot`

### 5. Environment Variables (Optional)
Create `.env` file in n8n directory:
```
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=http
WEBHOOK_URL=http://localhost:5678
```

## Workflow Features

### Chatbot Workflow (`singapling-chatbot.json`)
- **Webhook Trigger**: Receives POST requests from website
- **Question Processing**: Analyzes user questions using keywords
- **Knowledge Base**: Built-in plan details and retention offers
- **Response Generation**: Returns formatted markdown responses

### Supported Queries
- **Plans & Pricing**: "What plans do you have?", "How much does it cost?"
- **Support**: "I need help", "Contact support"
- **Offers**: "Any discounts?", "Special deals?"
- **Coverage**: "Network coverage", "Signal strength"

## Extending the Workflow

### Add New Response Types
1. Open the "Process Question" code node
2. Add new keyword conditions
3. Create response templates

### Integrate External APIs
1. Add HTTP Request nodes
2. Connect to external services (CRM, billing, etc.)
3. Process responses and format for users

### Add Data Storage
1. Add database nodes (PostgreSQL, MongoDB, etc.)
2. Store conversation history
3. Track user interactions

## Production Deployment

### Option 1: n8n Cloud
1. Sign up at https://n8n.cloud
2. Import workflow
3. Update webhook URLs in website

### Option 2: Self-hosted
1. Deploy n8n on VPS/cloud provider
2. Configure domain and SSL
3. Update webhook URLs
4. Set up monitoring and backups

## Security Considerations
- Enable authentication for n8n instance
- Use HTTPS in production
- Validate webhook inputs
- Rate limit API calls
- Monitor for abuse

## Troubleshooting
- Check n8n logs for errors
- Verify webhook URLs are accessible
- Test workflows manually in n8n interface
- Monitor response times and error rates
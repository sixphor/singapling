# Singapling n8n Configuration

## Server Configuration
- **n8n Server**: https://n8ngc.codeblazar.org
- **Workflow ID**: 5c4KFf80rrjMJ0Ep
- **Environment**: Production
- **Platform**: Google Cloud

## Webhook Endpoints

### Chatbot Webhook
- **URL**: `https://n8ngc.codeblazar.org/webhook/chatbot`
- **Method**: POST
- **Content-Type**: application/json
- **Payload**: `{"question": "user question here"}`

### Customer Service Webhook
- **URL**: `https://n8ngc.codeblazar.org/webhook/customer-service`
- **Method**: POST
- **Content-Type**: application/json
- **Payload**: 
```json
{
  "email": "customer@example.com",
  "issue": "description of issue",
  "priority": "low|medium|high",
  "customerType": "new|existing",
  "tenure": 12,
  "sentiment": "positive|neutral|negative"
}
```

### Data Processing Webhook
- **URL**: `https://n8ngc.codeblazar.org/webhook/data-sync`
- **Method**: POST
- **Content-Type**: application/json

## Current Configuration Status
✅ index.html - Updated with production URL
✅ faq.html - Updated with production URL  
✅ pricing.html - Updated with production URL

## Testing
Use the test script to verify integration:
```bash
python test_n8n_integration.py
```

## Workflow Import URLs
If you need to re-import or modify workflows:
1. Open https://n8ngc.codeblazar.org
2. Import the JSON files from `n8n-workflows/` directory
3. Configure webhook paths to match the URLs above

## Security Notes
- All webhooks use HTTPS
- Consider adding authentication if handling sensitive data
- Monitor webhook usage and implement rate limiting if needed

## Support
- n8n Documentation: https://docs.n8n.io
- Webhook Configuration: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
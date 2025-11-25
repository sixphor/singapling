# n8n Workflow Modification Instructions

## Add a Code Node Between Webhook and AI Agent

### 1. Insert a Code Node
- Drag a "Code" node between your webhook trigger and AI Agent
- Name it "Format Message"

### 2. Add this JavaScript code:

```javascript
// Extract the user question from webhook data
const userQuestion = $json.question || $json.body?.question || $json.chatInput || '';

// Format for AI Agent - it expects specific structure
return {
  chatInput: userQuestion,
  sessionId: $json.sessionId || 'web-session-' + Date.now(),
  action: 'sendMessage'
};
```

### 3. Connect the nodes:
- Webhook → Code Node → AI Agent → Response

### 4. Add Response Node
- Add a "Respond to Webhook" node at the end
- Connect it after your AI Agent
- Set response body to: `{{ $json }}`

## Alternative: Simple Mapping
If you don't want to add a code node, you can modify the AI Agent input mapping to:
- Input: `{{ $json.question }}`
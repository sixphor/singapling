// Enhanced chatbot integration for existing n8n workflow
// This version handles different response formats and adds better error handling

async function query(data) {
  const N8N_WEBHOOK_URL = 'https://n8ngc.codeblazar.org/webhook/03e221f1-3171-4cf9-8dde-097a2af6a969'; // Google Cloud n8n webhook URL
  
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: data.question,
        sessionId: 'web-session-' + Date.now(),
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Handle different response formats from your AI Agent
    let botResponse = '';
    if (result.text) {
      botResponse = result.text;
    } else if (result.output) {
      botResponse = result.output;
    } else if (result.response) {
      botResponse = result.response;
    } else if (typeof result === 'string') {
      botResponse = result;
    } else {
      botResponse = 'I received your message but had trouble formatting the response.';
    }
    
    return {
      text: botResponse,
      success: true
    };
    
  } catch (error) {
    console.error('Chatbot error:', error);
    return {
      text: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
      success: false,
      error: error.message
    };
  }
}